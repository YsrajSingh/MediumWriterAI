"use client";

import { Button, Form, Input } from "antd";
import React from "react";

interface IndependentFormProps {
    formData: { accountName: string; accountKey: string };
    onFormChange: (changedValues: any, allValues: any) => void;
    onSubmit: () => void;
    onReset: () => void;
    loading: boolean;
}

const IndependentForm: React.FC<IndependentFormProps> = ({
    formData,
    onFormChange,
    onSubmit,
    onReset,
    loading,
}) => {
    return (
        <Form
            layout="vertical"
            initialValues={formData}
            onValuesChange={onFormChange}
        >
            <Form.Item
                label="Account Name"
                name="accountName"
                rules={[{ required: true, message: "Please input the account name!" }]}
            >
                <Input placeholder="Enter account name" />
            </Form.Item>

            <Form.Item
                label="Account Key"
                name="accountKey"
                rules={[{ required: true, message: "Please input the account key!" }]}
            >
                <Input.Password placeholder="Enter account key" />
            </Form.Item>

            <Form.Item style={{ display:'flex', justifyContent: 'end'}}>
                <Button type="primary" onClick={onSubmit} loading={loading}>
                    Submit
                </Button>
                <Button style={{ marginLeft: "10px" }} onClick={onReset}>
                    Reset
                </Button>
            </Form.Item>
        </Form>
    );
};

export default IndependentForm;
