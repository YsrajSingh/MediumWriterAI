"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type DataType = {
    id: number;
    name: string;
};

export default function Home() {
    const [data, setData] = useState<DataType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/getData");
                const result = await response.json();
                setData(result || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1>Data from PostgreSQL</h1>
                <ul>
                    {data.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            </main>
        </div>
    );
}
