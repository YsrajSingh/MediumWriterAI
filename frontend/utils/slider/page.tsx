"use client"
import React from "react";
import { Layout, Menu } from "antd";
const { Sider } = Layout;
import {
    SettingOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";

const items = [
    SettingOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    UserOutlined,
].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
}));

export default function NavigationMenu() {
    return (
        <Sider
            breakpoint="xl"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <div className="demo-logo-vertical" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["4"]}
                items={items}
            />
        </Sider>
    );
}
