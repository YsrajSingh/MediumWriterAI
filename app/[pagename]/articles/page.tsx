// /app/username/[username]/articles/page.tsx
"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import IndependentForm_Two from "@/utils/form2/page";
import AsyncModal from "@/utils/modal/page";
import PaginatedTable from "@/utils/table/page";
import NotificationToast from "@/utils/NotifyToast/page";
import { Modal, notification, Button, Space } from "antd";

export default function ArticlesPage() {
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [formData, setFormData] = useState({
        articleTitle: "",
        publisherDate: "",
    });
    const [loading, setLoading] = useState(false);
    const [notificationContent, setNotificationContent] = useState({
        title: "Notification Title",
        description: "This is the dynamic content of the notification.",
        pauseOnHover: false,
    });
    const { pagename } = params;

    const [dataSource, setDataSource] = useState(
        Array.from({ length: 100 }).map((_, i) => ({
            key: i,
            article_title: `Edward ${i}`,
            date: 32,
            address: `London Park no. ${i}`,
        }))
    );

    const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const columns = [
        {
            title: "Article Title",
            dataIndex: "article_title",
            key: "article_title",
        },
        {
            title: "Publishing Date",
            dataIndex: "date",
            key: "date",
        },
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
        if (!formData.articleTitle || !formData.publisherDate) {
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
        setFormData({ articleTitle: "", publisherDate: "" });
        setOpen(false);
    };

    if (!pagename) {
        return <p>Loading...</p>;
    }

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
                    Add new articles
                </Button>
            </Space>
            <AsyncModal
                title="Create Article"
                open={open}
                confirmLoading={confirmLoading}
                modalText={null}
                // onShowModal={showModal}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <IndependentForm_Two
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
                title="Edit Article"
                open={openEditModal}
                confirmLoading={false}
                modalText={`Edit record for ${selectedRecord?.article_title}`}
                // onShowModal={() => setOpenEditModal(true)}
                onOk={() => {
                    console.log("Updated Record:", selectedRecord);
                    setOpenEditModal(false);
                }}
                onCancel={() => setOpenEditModal(false)}
            >
                <div>
                    <label>Article Title:</label>
                    <input
                        value={selectedRecord?.article_title}
                        onChange={(e) =>
                            setSelectedRecord({
                                ...selectedRecord!,
                                article_title: e.target.value,
                            })
                        }
                    />
                    <label>Publishing Date:</label>
                    <input
                        type="number"
                        value={selectedRecord?.date}
                        onChange={(e) =>
                            setSelectedRecord({
                                ...selectedRecord!,
                                date: +e.target.value,
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
