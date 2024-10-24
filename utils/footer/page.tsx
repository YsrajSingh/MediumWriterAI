"use client"
import { Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

export default function NarrowFooter() {
    return (
        <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
    );
}
