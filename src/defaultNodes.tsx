export const defaultNodes = [
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
            name: "stake",
            command: "transfer",
            path: ["1", "children", "0", "children", "0"],
            configuring: false,
            data: {
              address:
                "0:b5c6d8226ebf452d2dbb1e6f957347fedaa5c3ac93fd8250ee6899a660c0297b",
              function: "stake",
              abi: '{\n\t"functions": [\n\t\t{\n\t\t\t"name": "stake",\n\t\t\t"inputs": [\n\t\t\t\t{"name":"amount","type":"uint256"}\n\t\t\t],\n\t\t\t"outputs": [\n\t\t\t]\n\t\t},\n\t\t{\n\t\t\t"name": "claim",\n\t\t\t"inputs": [\n\t\t\t\t{"name":"amount","type":"uint256"}\n\t\t\t],\n\t\t\t"outputs": [\n\t\t\t]\n\t\t},\n\t\t{\n\t\t\t"name": "transfer",\n\t\t\t"inputs": [\n\t\t\t\t{"name":"to","type":"address"},\n\t\t\t\t{"name":"amount","type":"uint256"}\n\t\t\t],\n\t\t\t"outputs": [\n\t\t\t]\n\t\t}\n\t]\n}\n',
              amount: "path1children0",
              name: "stake",
            },
            validateStatusError: false,
          },
          {
            id: "node-2333cf7c-4482-4e58-bb58-f74f671bb025",
            type: "node",
            name: "claim",
            path: ["1", "children", "0", "children", "1"],
            configuring: false,
            data: {
              address:
                "0:b5c6d8226ebf452d2dbb1e6f957347fedaa5c3ac93fd8250ee6899a660c0297b",
              function: "claim",
              abi: '{\n\t"functions": [\n\t\t{\n\t\t\t"name": "stake",\n\t\t\t"inputs": [\n\t\t\t\t{"name":"amount","type":"uint256"}\n\t\t\t],\n\t\t\t"outputs": [\n\t\t\t]\n\t\t},\n\t\t{\n\t\t\t"name": "claim",\n\t\t\t"inputs": [\n\t\t\t\t{"name":"amount","type":"uint256"}\n\t\t\t],\n\t\t\t"outputs": [\n\t\t\t]\n\t\t},\n\t\t{\n\t\t\t"name": "transfer",\n\t\t\t"inputs": [\n\t\t\t\t{"name":"to","type":"address"},\n\t\t\t\t{"name":"amount","type":"uint256"}\n\t\t\t],\n\t\t\t"outputs": [\n\t\t\t]\n\t\t}\n\t]\n}\n',
              amount: "10",
              name: "claim",
            },
            validateStatusError: false,
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
    name: "transfer",
    command: "transfer",
    path: ["2"],
    configuring: false,
    data: {
      address:
        "0:40dacd37d04915109d84fbb4f666aa10a4fb235ea662cc35ec420c50cf1023fd",
      function: "transfer",
      abi: '{\n\t"functions": [\n\t\t{\n\t\t\t"name": "stake",\n\t\t\t"inputs": [\n\t\t\t\t{"name":"amount","type":"uint256"}\n\t\t\t],\n\t\t\t"outputs": [\n\t\t\t]\n\t\t},\n\t\t{\n\t\t\t"name": "claim",\n\t\t\t"inputs": [\n\t\t\t\t{"name":"amount","type":"uint256"}\n\t\t\t],\n\t\t\t"outputs": [\n\t\t\t]\n\t\t},\n\t\t{\n\t\t\t"name": "transfer",\n\t\t\t"inputs": [\n\t\t\t\t{"name":"to","type":"address"},\n\t\t\t\t{"name":"amount","type":"uint256"}\n\t\t\t],\n\t\t\t"outputs": [\n\t\t\t]\n\t\t}\n\t]\n}\n',
      to: "0:17cf19d61ad45554e177f72f6f047785eac03c97031e4e4028d1346ff9ea7aa5",
      amount: "balance",
      name: "transfer",
    },
    validateStatusError: false,
  },
  {
    id: "node-b106675a-5148-4a2e-aa86-8e06abd692d1",
    type: "end",
    name: "end",
    path: ["3"],
  },
];
