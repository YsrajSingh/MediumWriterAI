// PaginatedTable.tsx
"use client";

import { Table, Button } from "antd";
import type { TableColumnsType } from "antd";
import { useState } from "react";

interface PaginatedTableProps {
  dataSource: any[];
  columns: TableColumnsType<any>;
  onEdit: (record: any) => void;
  onDelete: (key: React.Key) => void;
}

const PaginatedTable: React.FC<PaginatedTableProps> = ({
  dataSource,
  columns,
  onEdit,
  onDelete,
}) => {
  return (
    <Table
      columns={[
        ...columns,
        {
          title: "Action",
          key: "operation",
          fixed: "right",
          width: 200,
          render: (_, record) => (
            <>
              <Button onClick={() => onEdit(record)} type="link" style={{ marginRight: 8 }}>
                Edit
              </Button>
              <Button onClick={() => onDelete(record.key)} type="link" danger>
                Delete
              </Button>
            </>
          ),
        },
      ]}
      dataSource={dataSource}
    />
  );
};

export default PaginatedTable;
