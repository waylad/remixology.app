import { Button, Form, Input } from "antd";
import React, { useContext, useState } from "react";
import { BuilderContext, useDrawer } from "react-flow-builder";

export const NodeForm: React.FC = (props: any) => {
  const { selectedNode: node } = useContext(BuilderContext);
  const [abiCommands, setAbiCommands] = useState();

  const { closeDrawer: cancel, saveDrawer: save } = useDrawer();

  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      save?.(values);
    } catch (error) {
      const values = form.getFieldsValue();
      save?.(values, !!error);
    }
  };

  const handleAbi = (abi: string) => {
    const parsedAbi = JSON.parse(abi);
    console.log(parsedAbi);
    const buttons = parsedAbi.functions?.map((func: any) => (
      <div>
        <br />
        <h3>{func.name}</h3>
        {func.inputs.map((inpt: any) => (
          <div>
            <label htmlFor="name">{inpt.name}</label>
            <br />
            <input type="text" id={inpt.name} name={inpt.name}></input>
          </div>
        ))}
        <br />
        <button>Generate command</button>
      </div>
    ));

    setAbiCommands(buttons);

    // {
    //   "ABI version": 2,
    //   "version": "2.2",
    //   "header": ["pubkey", "time", "expire"],
    //   "functions": [
    //     {
    //       "name": "constructor",
    //       "inputs": [
    //         {"name":"codeNft","type":"cell"},
    //         {"name":"codeIndex","type":"cell"},
    //         {"name":"codeIndexBasis","type":"cell"},
    //         {"name":"ownerPubkey","type":"uint256"},
    //         {"name":"json","type":"string"},
    //         {"name":"mintingFee","type":"uint128"}
    //       ],
    //       "outputs": [
    //       ]
    //     },
    //     {
    //       "name": "mintNft",
    //       "inputs": [
    //         {"name":"json","type":"string"}
    //       ],
    //       "outputs": [
    //       ]
    //     },
    //     {
    //       "name": "withdraw",
    //       "inputs": [
    //         {"name":"dest","type":"address"},
    //         {"name":"value","type":"uint128"}
    //       ],
    //       "outputs": [
    //       ]
    //     },
    //     {
    //       "name": "onTokenBurned",
    //       "inputs": [
    //         {"name":"id","type":"uint256"},
    //         {"name":"owner","type":"address"},
    //         {"name":"manager","type":"address"}
    //       ],
    //       "outputs": [
    //       ]
    //     },
    //     {
    //       "name": "setRemainOnNft",
    //       "inputs": [
    //         {"name":"remainOnNft","type":"uint128"}
    //       ],
    //       "outputs": [
    //       ]
    //     },
    //     {
    //       "name": "setMintingFee",
    //       "inputs": [
    //         {"name":"mintingFee","type":"uint128"}
    //       ],
    //       "outputs": [
    //       ]
    //     },
    //     {
    //       "name": "mintingFee",
    //       "inputs": [
    //         {"name":"answerId","type":"uint32"}
    //       ],
    //       "outputs": [
    //         {"name":"value0","type":"uint128"}
    //       ]
    //     },
    //     {
    //       "name": "owner",
    //       "inputs": [
    //         {"name":"answerId","type":"uint32"}
    //       ],
    //       "outputs": [
    //         {"name":"pubkey","type":"uint256"}
    //       ]
    //     },
    //     {
    //       "name": "transferOwnership",
    //       "inputs": [
    //         {"name":"newOwner","type":"uint256"}
    //       ],
    //       "outputs": [
    //       ]
    //     },
    //     {
    //       "name": "indexBasisCode",
    //       "inputs": [
    //         {"name":"answerId","type":"uint32"}
    //       ],
    //       "outputs": [
    //         {"name":"code","type":"cell"}
    //       ]
    //     },
    //     {
    //       "name": "indexBasisCodeHash",
    //       "inputs": [
    //         {"name":"answerId","type":"uint32"}
    //       ],
    //       "outputs": [
    //         {"name":"hash","type":"uint256"}
    //       ]
    //     },
    //     {
    //       "name": "resolveIndexBasis",
    //       "inputs": [
    //         {"name":"answerId","type":"uint32"}
    //       ],
    //       "outputs": [
    //         {"name":"indexBasis","type":"address"}
    //       ]
    //     },
    //     {
    //       "name": "indexCode",
    //       "inputs": [
    //         {"name":"answerId","type":"uint32"}
    //       ],
    //       "outputs": [
    //         {"name":"code","type":"cell"}
    //       ]
    //     },
    //     {
    //       "name": "indexCodeHash",
    //       "inputs": [
    //         {"name":"answerId","type":"uint32"}
    //       ],
    //       "outputs": [
    //         {"name":"hash","type":"uint256"}
    //       ]
    //     },
    //     {
    //       "name": "getJson",
    //       "inputs": [
    //         {"name":"answerId","type":"uint32"}
    //       ],
    //       "outputs": [
    //         {"name":"json","type":"string"}
    //       ]
    //     },
    //     {
    //       "name": "totalSupply",
    //       "inputs": [
    //         {"name":"answerId","type":"uint32"}
    //       ],
    //       "outputs": [
    //         {"name":"count","type":"uint128"}
    //       ]
    //     },
    //     {
    //       "name": "nftCode",
    //       "inputs": [
    //         {"name":"answerId","type":"uint32"}
    //       ],
    //       "outputs": [
    //         {"name":"code","type":"cell"}
    //       ]
    //     },
    //     {
    //       "name": "nftCodeHash",
    //       "inputs": [
    //         {"name":"answerId","type":"uint32"}
    //       ],
    //       "outputs": [
    //         {"name":"codeHash","type":"uint256"}
    //       ]
    //     },
    //     {
    //       "name": "nftAddress",
    //       "inputs": [
    //         {"name":"answerId","type":"uint32"},
    //         {"name":"id","type":"uint256"}
    //       ],
    //       "outputs": [
    //         {"name":"nft","type":"address"}
    //       ]
    //     },
    //     {
    //       "name": "supportsInterface",
    //       "inputs": [
    //         {"name":"answerId","type":"uint32"},
    //         {"name":"interfaceID","type":"uint32"}
    //       ],
    //       "outputs": [
    //         {"name":"value0","type":"bool"}
    //       ]
    //     }
    //   ],
    //   "data": [
    //   ],
    //   "events": [
    //     {
    //       "name": "OwnershipTransferred",
    //       "inputs": [
    //         {"name":"oldOwner","type":"uint256"},
    //         {"name":"newOwner","type":"uint256"}
    //       ],
    //       "outputs": [
    //       ]
    //     },
    //     {
    //       "name": "NftCreated",
    //       "inputs": [
    //         {"name":"id","type":"uint256"},
    //         {"name":"nft","type":"address"},
    //         {"name":"owner","type":"address"},
    //         {"name":"manager","type":"address"},
    //         {"name":"creator","type":"address"}
    //       ],
    //       "outputs": [
    //       ]
    //     },
    //     {
    //       "name": "NftBurned",
    //       "inputs": [
    //         {"name":"id","type":"uint256"},
    //         {"name":"nft","type":"address"},
    //         {"name":"owner","type":"address"},
    //         {"name":"manager","type":"address"}
    //       ],
    //       "outputs": [
    //       ]
    //     }
    //   ],
    //   "fields": [
    //     {"name":"_pubkey","type":"uint256"},
    //     {"name":"_timestamp","type":"uint64"},
    //     {"name":"_constructorFlag","type":"bool"},
    //     {"name":"_supportedInterfaces","type":"optional(cell)"},
    //     {"name":"_codeNft","type":"cell"},
    //     {"name":"_totalSupply","type":"uint128"},
    //     {"name":"_json","type":"string"},
    //     {"name":"_codeIndex","type":"cell"},
    //     {"name":"_codeIndexBasis","type":"cell"},
    //     {"name":"_indexDeployValue","type":"uint128"},
    //     {"name":"_indexDestroyValue","type":"uint128"},
    //     {"name":"_deployIndexBasisValue","type":"uint128"},
    //     {"name":"_owner","type":"uint256"},
    //     {"name":"_remainOnNft","type":"uint128"},
    //     {"name":"_lastTokenId","type":"uint128"},
    //     {"name":"_mintingFee","type":"uint128"}
    //   ]
    // }
  };

  return (
    <div>
      <Form form={form} initialValues={node?.data || { name: node?.name }}>
        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="name" label="Command" rules={[{ required: true }]}>
          <Input disabled />
        </Form.Item>
      </Form>
      <div className="buttons-grid">
        <Button onClick={cancel}>Cancel</Button>
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>

      <h2>Generate Command</h2>
      <Input.TextArea
        rows={4}
        placeholder="ABI"
        onChange={(e: any) => handleAbi(e.target.value)}
      />
      {abiCommands}
    </div>
  );
};
