"use client";

import {
  Table,
  Card,
  Alert,
  Button,
  Space,
  Input,
  Modal,
  Form,
  InputNumber,
  Upload,
  message,
  Radio,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useProducts, useCreateProduct } from "../hooks";
import { Product } from "../models/product";
import Image from "next/image";
import { useState } from "react";
import type { UploadFile } from "antd/es/upload/interface";

const { TextArea } = Input;

const ProductsPage: React.FC = () => {
  const { data: products, isLoading, error } = useProducts();
  const createProductMutation = useCreateProduct();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUploadType, setImageUploadType] = useState<"url" | "file">("url");
  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);

  const handleAddProduct = () => {
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setImageFileList([]);
    setImageUploadType("url");
  };

  const handleFormSubmit = async (values: Omit<Product, "id">) => {
    setIsSubmitting(true);
    try {
      // Handle image data based on upload type
      let imageData = values.image;
      if (imageUploadType === "file" && imageFileList.length > 0) {
        const file = imageFileList[0].originFileObj;
        if (file) {
          // TODO: Implement file upload to server/cloud storage
          // For now, we'll create a temporary URL
          imageData = URL.createObjectURL(file);
          console.log("File to upload:", file);
        }
      }

      const productData = {
        ...values,
        image: imageData,
      };

      // Use the mutation hook to create the product
      await createProductMutation.mutateAsync(productData);

      message.success("Product created successfully!");
      setIsModalVisible(false);
      form.resetFields();
      setImageFileList([]);
      setImageUploadType("url");
    } catch (error) {
      message.error("Failed to create product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddProduct}
          >
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

      {/* Product Creation Modal */}
      <Modal
        title="Create New Product"
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        width={600}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          initialValues={{
            price: 0,
          }}
        >
          <Form.Item
            name="name"
            label="Product Name"
            rules={[
              { required: true, message: "Please enter product name" },
              { min: 2, message: "Product name must be at least 2 characters" },
              {
                max: 100,
                message: "Product name cannot exceed 100 characters",
              },
            ]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please enter product description" },
              {
                min: 10,
                message: "Description must be at least 10 characters",
              },
              { max: 500, message: "Description cannot exceed 500 characters" },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Enter product description"
              showCount
              maxLength={500}
            />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: "Please enter product price" },
              {
                type: "number",
                min: 0,
                message: "Price must be greater than or equal to 0",
              },
            ]}
          >
            <InputNumber
              placeholder="0.00"
              min={0}
              step={0.01}
              precision={2}
              style={{ width: "100%" }}
              addonBefore="$"
            />
          </Form.Item>

          <Form.Item label="Product Image" required>
            <Radio.Group
              value={imageUploadType}
              onChange={(e) => setImageUploadType(e.target.value)}
              style={{ marginBottom: 16 }}
            >
              <Radio.Button value="url">Image URL</Radio.Button>
              <Radio.Button value="file">Upload Image</Radio.Button>
            </Radio.Group>

            {imageUploadType === "url" ? (
              <Form.Item
                name="image"
                rules={[
                  { required: true, message: "Please enter image URL" },
                  { type: "url", message: "Please enter a valid URL" },
                ]}
                noStyle
              >
                <Input placeholder="https://example.com/image.jpg" />
              </Form.Item>
            ) : (
              <Form.Item
                name="imageFile"
                rules={[{ required: true, message: "Please upload an image" }]}
                noStyle
              >
                <Upload
                  listType="picture-card"
                  fileList={imageFileList}
                  onChange={({ fileList }) => setImageFileList(fileList)}
                  beforeUpload={() => false} // Prevent auto upload
                  accept="image/*"
                  maxCount={1}
                  onPreview={(file) => {
                    if (file.url || file.preview) {
                      window.open(file.url || file.preview);
                    }
                  }}
                >
                  {imageFileList.length < 1 && (
                    <div>
                      <UploadOutlined />
                      <div style={{ marginTop: 8 }}>Upload Image</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            )}

            {imageUploadType === "file" && imageFileList.length > 0 && (
              <div style={{ marginTop: 8 }}>
                <small style={{ color: "#666" }}>
                  Supported formats: JPG, PNG, GIF, WebP
                </small>
              </div>
            )}
          </Form.Item>

          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button onClick={handleModalCancel}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting || createProductMutation.isPending}
              >
                Create Product
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductsPage;
