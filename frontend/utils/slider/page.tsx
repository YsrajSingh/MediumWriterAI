"use client";
import React from "react";
import { Layout, Menu } from "antd";
import Link from "next/link";
import Image from "next/image";
import { MenuProps } from "antd/es/menu";
import { MenuOutlined } from "@ant-design/icons";

const { Sider } = Layout;

interface MenuItem {
  key: string;
  label: string;
  link?: string; // link is optional because submenus won't have a link
  children?: MenuItem[]; // children can be added to support nested items
}

interface NavigationMenuProps {
  menuItems: MenuItem[];
  logoSrc: string;
  logoAlt: string;
  logoWidth?: number;
  logoHeight?: number;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({
  menuItems,
  logoSrc,
  logoAlt,
  logoWidth = 120,
  logoHeight = 50,
}) => {
  // Recursively render Menu items
  const renderMenuItems = (items: MenuItem[]): React.ReactNode => {
    return items.map((item) => {
      if (item.children) {
        return (
          <Menu.SubMenu
            key={item.key}
            title={item.label}
            icon={<MenuOutlined />}
          >
            {renderMenuItems(item.children)}
          </Menu.SubMenu>
        );
      }

      return (
        <Menu.Item key={item.key}>
          {item.link ? (
            <Link href={item.link}>{item.label}</Link>
          ) : (
            item.label
          )}
        </Menu.Item>
      );
    });
  };

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
      <div style={{ textAlign: "center", padding: "10px" }}>
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={logoWidth}
          height={logoHeight}
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>

      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        {renderMenuItems(menuItems)}
      </Menu>
    </Sider>
  );
};

export default NavigationMenu;
