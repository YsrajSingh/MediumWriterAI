"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Layout, Menu, theme } from "antd";
import { Typography } from 'antd';

const { Title } = Typography;
const { Header } = Layout;


interface HeaderProps {
    appName: string;
}

export default function ProfileHeader({ appName }: HeaderProps) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Header
            style={{
                background: colorBgContainer,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Title level={4} style={{ margin: 0 }}>{appName}</Title>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <SignInButton />
            </SignedOut>
        </Header>
    );
}
