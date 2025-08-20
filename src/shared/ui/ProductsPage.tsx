"use client";

import { Table, Card, Alert, Button, Space, Input } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useProducts } from "../queries/products";
import { Product } from "../models/product";
import Image from "next/image";

const ProductsPage: React.FC = () => {
  const { data: products, isLoading, error } = useProducts();

  const productColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
      width: 100,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) =>
        image ? (
          <Image
            src={image}
            width={50}
            height={50}
            alt="Product"
            style={{
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
        ) : (
          <div />
        ),
      width: 80,
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_: unknown, record: Product) => (
        <Space size="small">
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
        title="Restaurant Products"
        extra={
          <Button type="primary" icon={<PlusOutlined />}>
            Add Product
          </Button>
        }
      >
        <div style={{ marginBottom: 16 }}>
          <Input
            placeholder="Search products..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
          />
        </div>

        {error ? (
          <Alert
            message="Error loading products"
            description="Failed to fetch products data. Please try again later."
            type="error"
            showIcon
          />
        ) : (
          <Table
            columns={productColumns}
            dataSource={products || []}
            loading={isLoading}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }}
            scroll={{ x: 900 }}
          />
        )}
      </Card>
    </div>
  );
};

export default ProductsPage;
