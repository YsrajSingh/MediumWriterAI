"use client";

import { Button, Modal, Space } from "antd";
import React from "react";

interface AsyncModalProps {
    open: boolean;
    confirmLoading: boolean;
    modalText: string|null;
    onShowModal: () => void;
    onOk: () => void;
    onCancel: () => void;
    children: React.ReactNode;
}

const AsyncModal: React.FC<AsyncModalProps> = ({
    open,
    confirmLoading,
    modalText,
    onShowModal,
    onOk,
    onCancel,
    children,
}) => {
    return (
        <>
            <Space
                style={{
                    marginBottom: 16,
                    display: "flex",
                    justifyContent: "end",
                }}
            >
                <Button type="primary" onClick={onShowModal}>
                    Create new account
                </Button>
            </Space>
            <Modal
                title="Create Account"
                open={open}
                onOk={onOk}  // Calls the parent function to handle submit
                confirmLoading={confirmLoading}
                onCancel={onCancel}  // Closes the modal without submitting
                footer={null}  // We don't want any buttons here, handled by form
            >
                <p>{modalText}</p>
                {children}
            </Modal>
        </>
    );
};

export default AsyncModal;
