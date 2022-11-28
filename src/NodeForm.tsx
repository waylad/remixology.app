import { Button, Form, Input } from "antd";
import React, { useContext } from "react";
import { BuilderContext, useDrawer } from "react-flow-builder";

export const NodeForm: React.FC = (props: any) => {
  const { selectedNode: node } = useContext(BuilderContext);

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

  return (
    <div>
      <Form form={form} initialValues={node?.data || { name: node?.name }}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
      <div className="buttons-grid">
        <Button onClick={cancel}>Cancel</Button>
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};
