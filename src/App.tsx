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
    name: "Command",
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
    name: "Split coins",
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
      return `
          uint256 path${node.path
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
      // console.log('handleNode', node)
      const parsedAbi = node.data ? JSON.parse(node.data?.abi) : undefined;
      const funcTypes = parsedAbi.functions
        .filter((func: any) => func.name === node.data?.function)[0]
        ?.inputs?.map((funcType: any) => funcType?.type)
        ?.toString();
      const paramNames = parsedAbi.functions
        .filter((func: any) => func.name === node.data?.function)[0]
        ?.inputs?.map((funcType: any) => funcType?.name);
      const paramVals = paramNames.map(
        (paramName: string) => node.data?.[paramName]
      );
      return `
          ${node.data?.address}.call.gas(5000)
            .value(0)(bytes4(keccak256("${node.data?.function}(${funcTypes})")), ${paramVals});`;
    } else return "";
  };

  const handleChange = (nodes: INode[]) => {
    console.log(JSON.stringify(nodes));
    setNodes(nodes);

    const customCode = nodes.map((node) => {
      const treatedNode = handleNode(node);
      const treatedChildrenNodes =
        node.children?.map((childrenNode) => {
          const treatedChildrenNode = handleNode(childrenNode);

          const treatedGrandChildrenNodes =
            childrenNode.children?.map((grandChildrenNode) => {
              const treatedGrandChildrenNode = handleNode(grandChildrenNode);

              const treatedGrandGrandChildrenNodes =
                grandChildrenNode.children?.map((grandGrandChildrenNode) => {
                  const treatedGrandGrandChildrenNode = handleNode(
                    grandGrandChildrenNode
                  );
                  return treatedGrandGrandChildrenNode;
                }) || [];

              return [
                treatedGrandChildrenNode,
                ...treatedGrandGrandChildrenNodes,
              ];
            }) || [];

          return [treatedChildrenNode, ...treatedGrandChildrenNodes];
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
          
          address tokenAddress = 0:17cf19d61ad45554e177f72f6f047785eac03c97031e4e4028d1346ff9ea7aa5;
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
