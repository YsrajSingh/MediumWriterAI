"use client";
import { Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

interface WrapperProps {
    children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Content
            className="content-inner"
            style={{
                overflowY: "scroll",
                padding: "20px",
                height: "calc(100vh - 64px)", // Adjust this based on your Header's height
            }}
        >
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                {children}
            </div>
        </Content>
    );
};

export default Wrapper;
