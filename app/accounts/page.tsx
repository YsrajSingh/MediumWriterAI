// Accounts.tsx
"use client";

import { useState } from "react";
import IndependentForm from "@/utils/form/page";
import AsyncModal from "@/utils/modal/page";
import PaginatedTable from "@/utils/table/page";
import NotificationToast from "@/utils/NotifyToast/page";
import { Modal, notification, Button, Space } from "antd";

export default function Accounts() {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [formData, setFormData] = useState({
        accountName: "",
        accountKey: "",
    });
    const [loading, setLoading] = useState(false);
    const [notificationContent, setNotificationContent] = useState({
        title: "Notification Title",
        description: "This is the dynamic content of the notification.",
        pauseOnHover: false,
    });

    const [dataSource, setDataSource] = useState(
        Array.from({ length: 100 }).map((_, i) => ({
            key: i,
            name: `Edward ${i}`,
            age: 32,
            address: `London Park no. ${i}`,
        }))
    );

    const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const columns = [
        {
            title: "Full Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
        }
    ];

    const handleEdit = (record: any) => {
        setSelectedRecord(record);
        setOpenEditModal(true);
    };

    const handleDelete = (key: React.Key) => {
        setSelectedRecord(dataSource.find((item) => item.key === key) || null);
        setOpenDeleteModal(true);
    };

    const handleCancelDelete = () => {
        setOpenDeleteModal(false);
    };

    const handleConfirmDelete = () => {
        if (selectedRecord) {
            const updatedDataSource = dataSource.filter(
                (item) => item.key !== selectedRecord.key
            );
            setDataSource(updatedDataSource);
        }
        setOpenDeleteModal(false);
    };

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        if (!formData.accountName || !formData.accountKey) {
            notification.open({
                message: "Validation Error!",
                description:
                    "Required fields are empty. Please fill in all the fields.",
                pauseOnHover: false,
            });
            return;
        }

        setConfirmLoading(true);
        setLoading(true);

        setTimeout(() => {
            console.log("Form Submitted:", formData);
            setConfirmLoading(false);
            setLoading(false);
            setOpen(false);

            notification.open({
                message: "Success!",
                description: "Account created successfully.",
                pauseOnHover: false,
            });
        }, 2000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleFormChange = (changedValues: any, allValues: any) => {
        setFormData(allValues);
    };

    const handleReset = () => {
        setFormData({ accountName: "", accountKey: "" });
        setOpen(false);
    };

    return (
        <>
            <Space
                style={{
                    marginBottom: 16,
                    display: "flex",
                    justifyContent: "end",
                }}
            >
                <Button type="primary" onClick={showModal}>
                    Create new account
                </Button>
            </Space>
            <AsyncModal
                title="Create Account"
                open={open}
                confirmLoading={confirmLoading}
                modalText={null}
                // onShowModal={showModal}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <IndependentForm
                    formData={formData}
                    onFormChange={handleFormChange}
                    onSubmit={handleOk}
                    onReset={handleReset}
                    loading={loading}
                />
            </AsyncModal>
            <NotificationToast
                title={notificationContent.title}
                description={notificationContent.description}
                pauseOnHover={notificationContent.pauseOnHover}
            />
            <PaginatedTable
                dataSource={dataSource}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <AsyncModal
                title="Edit Account"
                open={openEditModal}
                confirmLoading={false}
                modalText={`Edit record for ${selectedRecord?.name}`}
                // onShowModal={() => setOpenEditModal(true)}
                onOk={() => {
                    console.log("Updated Record:", selectedRecord);
                    setOpenEditModal(false);
                }}
                onCancel={() => setOpenEditModal(false)}
            >
                <div>
                    <label>Full Name:</label>
                    <input
                        value={selectedRecord?.name}
                        onChange={(e) =>
                            setSelectedRecord({
                                ...selectedRecord!,
                                name: e.target.value,
                            })
                        }
                    />
                    <label>Age:</label>
                    <input
                        type="number"
                        value={selectedRecord?.age}
                        onChange={(e) =>
                            setSelectedRecord({
                                ...selectedRecord!,
                                age: +e.target.value,
                            })
                        }
                    />
                    <label>Address:</label>
                    <input
                        value={selectedRecord?.address}
                        onChange={(e) =>
                            setSelectedRecord({
                                ...selectedRecord!,
                                address: e.target.value,
                            })
                        }
                    />
                </div>
            </AsyncModal>

            {/* Delete Confirmation Modal */}
            <Modal
                title="Confirm Deletion"
                visible={openDeleteModal}
                onCancel={handleCancelDelete}
                onOk={handleConfirmDelete}
                okText="Delete"
                cancelText="Cancel"
            >
                <p>Are you sure you want to delete this record?</p>
            </Modal>
        </>
    );
}
