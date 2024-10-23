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

const IndependentForm_Two: React.FC<IndependentFormProps> = ({
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
                label="Article Title"
                name="articleTitle"
                rules={[{ required: true, message: "Please input the article title!" }]}
            >
                <Input placeholder="Enter article Title" />
            </Form.Item>

            <Form.Item
                label="Publishing Date"
                name="publishing_date"
                rules={[{ required: true, message: "Please input the publishing date!" }]}
            >
                <Input placeholder="Enter publishing date" />
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

export default IndependentForm_Two;
