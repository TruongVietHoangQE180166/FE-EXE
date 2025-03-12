// src/components/common/ForgotPassForm.tsx
import React, { useState } from "react";
import { Button, Form, Input, Typography, notification } from "antd";
import { MailOutlined, CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import "../../styles/common/ForgotPassForm.css";

const { Text, Title } = Typography;

export default function ForgotPassForm() {
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const showSuccessNotification = () => {
    api.success({
      message: "Reset Request Successful",
      description: "A password reset link has been sent to your email. You'll be redirected to the login page.",
      icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
      duration: 2,
    });
  };

  const showErrorNotification = (errorMessage: string) => {
    api.error({
      message: "Reset Request Failed",
      description: errorMessage || "An error occurred. Please try again.",
      icon: <CloseCircleOutlined style={{ color: "#ff4d4f" }} />,
      duration: 3,
    });
  };

  const onFinish = async (values: { email: string }) => {
    setLoading(true);

    try {
      setTimeout(() => {
        const emailExists = mockEmailCheck(values.email);
        if (emailExists) {
          showSuccessNotification();
          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else {
          showErrorNotification("This email is not registered.");
          setLoading(false);
        }
      }, 1500);
    } catch (error) {
      showErrorNotification("An unexpected error occurred.");
      setLoading(false);
    }
  };

  const mockEmailCheck = (email: string): boolean => {
    const registeredEmails = ["admin@example.com", "user@example.com"];
    return registeredEmails.includes(email);
  };

  return (
    <section className="forgotpass-section">
      {contextHolder}
      <div className="forgotpass-container">
        <div className="forgotpass-header">
          <svg
            width="50"
            height="50"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.464294" width="24" height="24" rx="4.8" fill="#1890FF" />
            <path d="M14.8643 3.6001H20.8643V9.6001H14.8643V3.6001Z" fill="white" />
            <path d="M10.0643 9.6001H14.8643V14.4001H10.0643V9.6001Z" fill="white" />
            <path d="M4.06427 13.2001H11.2643V20.4001H4.06427V13.2001Z" fill="white" />
          </svg>
          <Title className="forgotpass-title">Forgot Password</Title>
          <Text className="forgotpass-text">Enter your email to reset your password.</Text>
        </div>
        <Form
          form={form}
          name="forgotpass_form"
          initialValues={{}}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
          scrollToFirstError
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please enter a valid email!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" disabled={loading} />
          </Form.Item>

          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={loading ? <LoadingOutlined /> : null}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
            <div className="forgotpass-footer">
              <Text className="forgotpass-text">Back to? </Text>
              <a className="forgotpass-login-link" href="/">
                Log in
              </a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}