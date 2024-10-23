// LogViewer.tsx
import React, { useState } from 'react';
import { List, Typography, Collapse, Pagination } from 'antd';

const { Panel } = Collapse;

interface Log {
    title: string;       // Title of the log
    description: string; // Description of the log
    timestamp: string;   // Timestamp of the log entry
}

interface LogViewerProps {
    logs: Log[];        // Array of log objects
    pageSize: number;   // Number of logs per page
}

const LogViewer: React.FC<LogViewerProps> = ({ logs, pageSize }) => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Calculate paginated logs
    const paginatedLogs = logs.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    
    return (
        <div>
            <List
                bordered
                dataSource={paginatedLogs}
                renderItem={(log, index) => (
                    <List.Item>
                        <Collapse style={{ width: '100%' }}>
                            <Panel header={log.title} key={index}>
                                <Typography.Paragraph>{log.description}</Typography.Paragraph>
                                <Typography.Text style={{ float: 'right', fontSize: '12px', color: '#888' }}>
                                    {log.timestamp}
                                </Typography.Text>
                            </Panel>
                        </Collapse>
                    </List.Item>
                )}
            />
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={logs.length}
                onChange={handlePageChange}
                style={{ marginTop: '10px', textAlign: 'right' }}
            />
        </div>
    );
};

export default LogViewer;
