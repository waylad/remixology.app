import React, { useContext, useEffect, useState } from "react";
import FlowBuilder, {
  INode,
  IRegisterNode,
  NodeContext,
} from "react-flow-builder";
import Modal from "react-modal";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { NodeForm } from "./NodeForm";
import { ConditionForm } from "./ConditionForm";

import "./App.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

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
    name: "Node",
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

// split in 50/50 proportion + provide liquidity to pool + receive LP + lock LP into farming pool + claim rewards method with optional recipient address
const defaultNodes = [
  {
    id: "node-0d9d4733-e48c-41fd-a41f-d93cc4718d97",
    type: "start",
    name: "Receive Tokens",
    path: ["0"],
  },
  {
    id: "node-b2ffe834-c7c2-4f29-a370-305adc03c010",
    type: "branch",
    name: "Branch",
    children: [
      {
        id: "node-cf9c8f7e-26dd-446c-b3fa-b2406fc7821a",
        type: "condition",
        name: "40%",
        children: [
          {
            id: "node-f227cd08-a503-48b7-babf-b4047fc9dfa9",
            type: "node",
            name: "Condition 100",
            path: ["1", "children", "0", "children", "0"],
          },
        ],
        path: ["1", "children", "0"],
      },
      {
        id: "node-9d393627-24c0-469f-818a-319d9a678707",
        type: "condition",
        name: "60%",
        children: [],
        path: ["1", "children", "1"],
      },
    ],
    path: ["1"],
  },
  {
    id: "node-972401ca-c4db-4268-8780-5607876d8372",
    type: "node",
    name: "Send to wallet",
    path: ["2"],
  },
  {
    id: "node-b106675a-5148-4a2e-aa86-8e06abd692d1",
    type: "end",
    name: "end",
    path: ["3"],
  },
];

const App = () => {
  let subtitle: any;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [nodes, setNodes] = useState<INode[]>(defaultNodes);
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    handleChange(defaultNodes)
  }, [])

  const handleChange = (nodes: INode[]) => {
    console.log("nodes change", nodes);
    setNodes(nodes);

    const customCode = nodes.map((node) => {
      const customCode2 =
        node.children?.map((node2) => {
          if (node2.type === "condition") {
            return `uint256 path${node2.path
              ?.toString()
              .replace(",", "")
              .replace(",", "")
              .replace(",", "")
              .replace(",", "")
              .replace(",", "")
              .replace(",", "")
              .replace(",", "")} = balance * ${
              parseInt(node2.name.replace("%", "")) / 100
            };`;
          } else return "";
        }) || [];

      return [...customCode2];
    });

    console.log(customCode.flat(Infinity));

    setCode(`pragma ton-solidity = 0.58.1;

    contract StategyBuilder {
        constructor() public {
            tvm.accept();
        }
    
        function execute() external virtual {
          tvm.accept();
          
          address contractAddress = 0x... // Fill in manually
          uint256 balance = contractAddress.call.gas(5000)
            .value(0)(bytes4(keccak256("balanceOf(address)")), address(this));
          uint256 path1 = balance * 0.5
          uint256 path2 = balance * 0.5
    
          contractAddress.call.gas(5000).value(0)(bytes4(keccak256("someFunc(bool, uint256)")), true, 3);
          dest.transfer(amount, bounce, 0);

${customCode.flat(Infinity).map((code) => {
  console.log(`          ${code}\n`);
  return `          ${code}\n`;
}).join('')}
        }
    }`);
  };

  const editorDidMount = (editor: any, monaco: any) => {
    console.log("editorDidMount", editor);
    editor.focus();
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

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

      {/* <button onClick={openModal}>Generate Smart Contract</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal> */}
    </div>
  );
};

export default App;
