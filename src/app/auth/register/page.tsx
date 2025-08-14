"use client";

import { Button, Form, Input, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRegister } from "@/shared/queries/auth";

const { Title, Text } = Typography;

export default function RegisterPage() {
  const router = useRouter();
  const registerMutation = useRegister();

  const onFinish = async (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (values.password !== values.confirmPassword) {
      message.error("Пароли не совпадают!");
      return;
    }

    try {
      await registerMutation.mutateAsync({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      message.success("Регистрация успешна!");
      router.push("/");
    } catch (error: unknown) {
      console.error("~ ~ onFinish ~ error~:", error);
      message.error("Ошибка регистрации");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-8">
          <Title level={2} className="mb-2">
            Регистрация
          </Title>
          <Text type="secondary">Создайте новый аккаунт</Text>
        </div>

        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Пожалуйста, введите имя!" },
              { min: 2, message: "Имя должно содержать минимум 2 символа!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Имя"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Пожалуйста, введите email!" },
              {
                type: "email",
                message: "Пожалуйста, введите корректный email!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Пожалуйста, введите пароль!" },
              {
                min: 6,
                message: "Пароль должен содержать минимум 6 символов!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Пароль"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: "Пожалуйста, подтвердите пароль!" },
              {
                min: 6,
                message: "Пароль должен содержать минимум 6 символов!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Подтвердите пароль"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={registerMutation.isPending}
            >
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-4">
          <Text type="secondary">
            Уже есть аккаунт?{" "}
            <Link
              href="/auth/login"
              className="text-blue-600 hover:text-blue-800"
            >
              Войти
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
}
