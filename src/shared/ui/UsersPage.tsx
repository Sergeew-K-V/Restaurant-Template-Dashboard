"use client";

import { Table, Card, Alert, Button, Space, Input, Tag, Avatar } from "antd";
import { PlusOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useUsers } from "../queries/users";
import { IUser } from "../models/user";

const UsersPage: React.FC = () => {
  const { data: users, isLoading, error } = useUsers();

  const userColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Avatar",
      key: "avatar",
      width: 80,
      render: (_: unknown, record: IUser) => (
        <Avatar
          size={40}
          icon={<UserOutlined />}
          style={{ backgroundColor: "#1890ff" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: string) => (
        <Tag color="blue" style={{ fontSize: 12 }}>
          {email}
        </Tag>
      ),
    },
    {
      title: "Status",
      key: "status",
      width: 100,
      render: (_: unknown, record: IUser) => <Tag color="green">Active</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_: unknown, record: IUser) => (
        <Space size="small">
          <Button type="link" size="small">
            View
          </Button>
          <Button type="link" size="small">
            Edit
          </Button>
          <Button type="link" size="small" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 16 }}>
      <Card
        title="Registered Guests"
        extra={
          <Button type="primary" icon={<PlusOutlined />}>
            Add Guest
          </Button>
        }
      >
        <div style={{ marginBottom: 16 }}>
          <Input
            placeholder="Search guests..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
          />
        </div>

        {error ? (
          <Alert
            message="Error loading guests"
            description="Failed to fetch guests data. Please try again later."
            type="error"
            showIcon
          />
        ) : (
          <Table
            columns={userColumns}
            dataSource={users || []}
            loading={isLoading}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }}
            scroll={{ x: 800 }}
          />
        )}
      </Card>
    </div>
  );
};

export default UsersPage;
