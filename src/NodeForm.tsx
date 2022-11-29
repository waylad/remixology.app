import { Button, Form, Input, InputNumber, Select } from "antd";
import React, { useContext, useState } from "react";
import { BuilderContext, useDrawer } from "react-flow-builder";

export const NodeForm: React.FC = (props: any) => {
  const { selectedNode: node } = useContext(BuilderContext);
  const [abi, setAbi] = useState<any>(undefined);
  const [selectedCommand, setSelectedCommand] = useState<string>("");

  const { closeDrawer: cancel, saveDrawer: save } = useDrawer();

  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      // {name: 'Condition 100', function: 'mintNft', json-type: undefined, json: 'yolo'}
      values.name = values.function
      save?.(values);
    } catch (error) {
      const values = form.getFieldsValue();
      values.name = values.function
      save?.(values, !!error);
    }
  };

  return (
    <div>
      <Form form={form} initialValues={node?.data || { name: node?.name }}>
        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
          <Input placeholder="Contract address"/>
        </Form.Item>

        {/* {abi ? ( */}
        <div style={abi ? { display: "block" } : { display: "none" }}>
          <Form.Item
            name="function"
            label="Function"
            rules={[{ required: true }]}
          >
            <Select
              style={{ width: "100%" }}
              onChange={(e: string) => setSelectedCommand(e)}
            >
              {abi?.functions?.map((func: any) => (
                <Select.Option value={func.name}>{func.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          {abi?.functions
            ?.filter((func: any) => func.name === selectedCommand)?.[0]
            ?.inputs?.map((inpt: any) => (
              <Form.Item
                name={inpt.name}
                label={inpt.name}
                rules={[{ required: true }]}
              >
                <Input defaultValue="" placeholder={inpt.type} />
              </Form.Item>
            ))}
        </div>
        {/* ) : ( */}
        <div style={abi ? { display: "none" } : { display: "block" }}>
          <Form.Item name="abi" label="ABI" rules={[{ required: true }]}>
            <Input.TextArea
              rows={4}
              placeholder="Paste ABI here..."
              onChange={(e: any) => setAbi(JSON.parse(e.target.value))}
            />
          </Form.Item>
        </div>
        {/* )} */}
      </Form>
      <br />
      <div className="buttons-grid">
        <Button onClick={cancel}>Cancel</Button>
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};
