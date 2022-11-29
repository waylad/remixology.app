import React, { useContext, useEffect, useState } from "react";
import FlowBuilder, {
  INode,
  IRegisterNode,
  NodeContext,
} from "react-flow-builder";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { NodeForm } from "./NodeForm";
import { ConditionForm } from "./ConditionForm";

import "./App.css";
import { defaultNodes } from "./defaultNodes";

const StartNodeDisplay: React.FC = () => {
  const node = useContext(NodeContext);
  return <div className="start-node">Receive tokens</div>;
};

const EndNodeDisplay: React.FC = () => {
  const node = useContext(NodeContext);
  return <div className="end-node">{node.name}</div>;
};

const NodeDisplay: React.FC = () => {
  const node = useContext(NodeContext);
  return (
    <div
      className={`other-node ${node.configuring ? "node-configuring" : ""} ${
        node.validateStatusError ? "node-status-error" : ""
      }`}
    >
      {node.data ? node.data.name : node.name}
    </div>
  );
};

const ConditionNodeDisplay: React.FC = () => {
  const node = useContext(NodeContext);
  return (
    <div
      className={`condition-node ${
        node.configuring ? "node-configuring" : ""
      } ${node.validateStatusError ? "node-status-error" : ""}`}
    >
      {node.data ? node.data.name : node.name}
    </div>
  );
};

const registerNodes: IRegisterNode[] = [
  {
    type: "start",
    name: "Receive token",
    displayComponent: StartNodeDisplay,
    isStart: true,
  },
  {
    type: "end",
    name: "End",
    displayComponent: EndNodeDisplay,
    isEnd: true,
  },
  {
    type: "node",
    name: "Select Command",
    displayComponent: NodeDisplay,
    configComponent: NodeForm,
  },
  {
    type: "condition",
    name: "50%",
    displayComponent: ConditionNodeDisplay,
    configComponent: ConditionForm,
  },
  {
    type: "branch",
    name: "Branch",
    conditionNodeType: "condition",
  },
];

const App = () => {
  let subtitle: any;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [nodes, setNodes] = useState<INode[]>(defaultNodes);
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    handleChange(defaultNodes);
  }, []);

  const handleNode = (node: any) => {
    if (node.type === "condition") {
      return `uint256 path${node.path
        ?.toString()
        .replace(",", "")
        .replace(",", "")
        .replace(",", "")
        .replace(",", "")
        .replace(",", "")
        .replace(",", "")
        .replace(",", "")} = balance * ${
        parseInt(node.name.replace("%", "")) / 100
      };`;
    } else if (node.type === "node") {
      console.log('handleNode', node)
      return `${node.data?.address}.call.gas(5000)
            .value(0)(bytes4(keccak256("${node.data?.function}(bool, uint256)")), true, 3);`;
    } else return "";
  };

  const handleChange = (nodes: INode[]) => {
    console.log("handleChange", nodes);
    setNodes(nodes);

    const customCode = nodes.map((node) => {
      const treatedNode = handleNode(node);
      const treatedChildrenNodes = node.children?.map((childrenNode) => {
        const treatedChildrenNode = handleNode(childrenNode);

        const treatedGrandChildrenNodes = childrenNode.children?.map((grandChildrenNode) => {
          const treatedGrandChildrenNode = handleNode(grandChildrenNode);
          return treatedGrandChildrenNode
        }) || [];

        return [treatedChildrenNode, ...treatedGrandChildrenNodes]
      }) || [];

      return [treatedNode, ...treatedChildrenNodes];
    });

    setCode(`pragma ton-solidity = 0.58.1;

    contract StategyBuilder {
        constructor() public {
            tvm.accept();
        }
    
        function execute() external virtual {
          tvm.accept();
          
          address tokenAddress = 0:... // Fill in manually
          uint256 balance = tokenAddress.call.gas(5000)
            .value(0)(bytes4(keccak256("balanceOf(address)")), address(this));
${customCode
  .flat(Infinity)
  .map((code) => `          ${code}\n`)
  .join("")}
        }
    }`);
  };

  return (
    <div>
      <div className="app-grid">
        <SyntaxHighlighter language="javascript" style={docco}>
          {code}
        </SyntaxHighlighter>

        <FlowBuilder
          nodes={nodes}
          onChange={handleChange}
          registerNodes={registerNodes}
          historyTool
          zoomTool
        />
      </div>
    </div>
  );
};

export default App;
