"use client";

import { Button, Form, Input, Card, Typography, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLogin } from "@/shared/queries/auth";

const { Title, Text } = Typography;

export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLogin();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      await loginMutation.mutateAsync(values);
      message.success("Успешный вход!");
      router.push("/");
    } catch (error: unknown) {
      console.error("~ ~ onFinish ~ error~:", error);
      message.error("Ошибка входа");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <div className="text-center mb-8">
          <Title level={2} className="mb-2">
            Вход в систему
          </Title>
          <Text type="secondary">Введите ваши учетные данные для входа</Text>
        </div>

        <Form name="login" onFinish={onFinish} layout="vertical" size="large">
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

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={loginMutation.isPending}
            >
              Войти
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-4">
          <Text type="secondary">
            Нет аккаунта?{" "}
            <Link
              href="/auth/register"
              className="text-blue-600 hover:text-blue-800"
            >
              Зарегистрироваться
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
}
