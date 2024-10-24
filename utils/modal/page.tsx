"use client";

import { Button, Modal, Space } from "antd";    
import React from "react";

interface AsyncModalProps {
    title: string;
    open: boolean;
    confirmLoading: boolean;
    modalText: string|null;
    // onShowModal: () => void;
    onOk: () => void;
    onCancel: () => void;
    children: React.ReactNode;
}

const AsyncModal: React.FC<AsyncModalProps> = ({
    title,
    open,
    confirmLoading,
    modalText,
    onOk,
    onCancel,
    children,
}) => {
    return (
            <Modal
                title={title}
                open={open}
                onOk={onOk}  // Calls the parent function to handle submit
                confirmLoading={confirmLoading}
                onCancel={onCancel}  // Closes the modal without submitting
                footer={null}  // We don't want any buttons here, handled by form
            >
                <p>{modalText}</p>
                {children}
            </Modal>
    );
};

export default AsyncModal;
