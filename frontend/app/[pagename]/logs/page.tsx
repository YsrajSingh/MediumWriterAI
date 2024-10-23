// /app/pagename/[pagename]/settings/page.tsx
"use client";
import LogViewer from "@/utils/LogsViewer/page";
import { Button } from "antd";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function SettingsPage() {
    const params = useParams();
    const [logs, setLogs] = useState<{ title: string; description: string; timestamp: string }[]>([]);

    const { pagename } = params;

    if (!pagename) {
        return <p>Loading...</p>;
    }

    const addLog = () => {
      const newLog = {
          title: `Log entry ${logs.length + 1}`,
          description: `This is the description for log entry ${logs.length + 1}.`,
          timestamp: new Date().toLocaleString(), // Current timestamp
      };
      setLogs((prevLogs) => [...prevLogs, newLog]);
  };
    return (
        <div>
            <Button
                onClick={addLog}
                type="primary"
                style={{ marginBottom: "10px" }}
            >
                Add Log
            </Button>
            <LogViewer logs={logs} pageSize={5} /> {/* Change pageSize as needed */}
        </div>
    );
}
