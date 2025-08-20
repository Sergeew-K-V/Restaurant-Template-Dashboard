"use client";

import { useState } from "react";
import { Layout, Menu, Card } from "antd";
import {
  ShoppingOutlined,
  UserOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import ProductsPage from "./ProductsPage";
import UsersPage from "./UsersPage";

const { Sider, Content } = Layout;

type MenuKey = "dashboard" | "products" | "guests";

const Dashboard: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<MenuKey>("products");

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "products",
      icon: <ShoppingOutlined />,
      label: "Products",
    },
    {
      key: "guests",
      icon: <UserOutlined />,
      label: "Guests",
    },
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case "dashboard":
        return (
          <Card title="Dashboard Overview" style={{ margin: 16 }}>
            <p>Welcome to your restaurant dashboard!</p>
            <p>Select a menu item from the sidebar to manage your data.</p>
          </Card>
        );
      case "products":
        return <ProductsPage />;
      case "guests":
        return <UsersPage />;
      default:
        return <ProductsPage />;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={250}
        style={{
          background: "#001529",
          boxShadow: "2px 0 8px rgba(0,0,0,0.15)",
        }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
            borderBottom: "1px solid #303030",
          }}
        >
          Restaurant Admin
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onSelect={({ key }) => setSelectedKey(key as MenuKey)}
          items={menuItems}
          style={{
            borderRight: 0,
            marginTop: 16,
          }}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: 0,
            minHeight: 280,
            background: "#f0f2f5",
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
