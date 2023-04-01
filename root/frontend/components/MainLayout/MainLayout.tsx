import { PictureOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { Pages } from "@/constant";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
};

const items: MenuItem[] = [
  getItem(
    "Map",
    "1",
    <Link href={Pages.Home}>
      <PictureOutlined />
    </Link>
  ),
];

type LayoutProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
};

export const MainLayout = ({ children, header }: LayoutProps): JSX.Element => {
  const { asPath } = useRouter();
  const [selectedKeys, setSelectedKeys] = useState(["1"]);
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    if (asPath === Pages.Home) {
      setSelectedKeys(["1"]);
    } else {
      setSelectedKeys(["1"]);
    }
  }, [asPath]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        // onMouseEnter={() => setCollapsed(false)}
        // onMouseLeave={() => setCollapsed(true)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link href={Pages.Home}>
            <Image src="/water-bottle.png" alt="Logo" width={32} height={32} />
          </Link>
        </div>
        <Menu
          theme="dark"
          selectedKeys={selectedKeys}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ paddingLeft: "16px", background: colorBgContainer }}>
          {header}
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              // background: colorBgContainer,
              position: "relative",
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          DrinkWater ©2023 Created by Hugo&Marek
        </Footer>
      </Layout>
    </Layout>
  );
};
