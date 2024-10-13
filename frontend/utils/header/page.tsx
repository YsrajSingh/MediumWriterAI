"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Layout, Menu, theme } from "antd";

const { Header } = Layout;

// Define the props type for the Header component
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
            <h1>{appName}</h1>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <SignInButton />
            </SignedOut>
        </Header>
    );
}
