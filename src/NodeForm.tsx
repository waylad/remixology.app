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
      console.log("values", values);
      save?.(values);
    } catch (error) {
      const values = form.getFieldsValue();
      save?.(values, !!error);
    }
  };

  return (
    <div>
      <Form form={form} initialValues={node?.data || { name: node?.name }}>
        <Form.Item name="name" label="Address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        {abi ? (
          <div>
            <Form.Item
              name="function"
              label="Function"
              rules={[{ required: true }]}
            >
              <Select
                style={{ width: "100%" }}
                onChange={(e: string) => setSelectedCommand(e)}
              >
                {abi.functions?.map((func: any) => (
                  <Select.Option value={func.name}>{func.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <br />
            {abi.functions
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
        ) : (
          <Form.Item name="abi" label="ABI" rules={[{ required: true }]}>
            <Input.TextArea
              rows={4}
              placeholder="Paste ABI here..."
              onChange={(e: any) => setAbi(JSON.parse(e.target.value))}
            />
          </Form.Item>
        )}
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
