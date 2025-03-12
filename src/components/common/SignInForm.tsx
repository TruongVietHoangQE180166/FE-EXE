import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Typography, notification} from "antd";
import { LockOutlined, MailOutlined, CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { login } from "../../utils/auth";
import "../../styles/common/SignInForm.css";

const { Text, Title } = Typography;

export default function SignInForm() {
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);

  const showSuccessNotification = () => {
    api.success({
      message: "Login Successful",
      description: "Welcome back! You're being redirected to your dashboard.",
      icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
      duration: 2,
    });
  };

  const showErrorNotification = () => {
    api.error({
      message: "Login Failed",
      description: "Incorrect email or password. Please try again.",
      icon: <CloseCircleOutlined style={{ color: "#ff4d4f" }} />,
      duration: 3,
    });
  };

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    
    try {
      // Simulating a network request with setTimeout
      // In a real app, this would be your actual login API call
      setTimeout(() => {
        const user = login(values.email, values.password);
        
        if (user) {
          showSuccessNotification();
          
          setTimeout(() => {
            if (user.role === "admin") {
              router.push("/admin/dashboard");
            } else {
              router.push("/user/dashboard");
            }
          }, 1000);
        } else {
          showErrorNotification();
          setLoading(false);
        }
      }, 1500); // Simulating login process delay
    } catch (error) {
      showErrorNotification();
      setLoading(false);
    }
  };

  return (
    <section className="login-section">
      {contextHolder}
      <div className="login-container">
        <div className="login-header">
          <svg
            width="50"
            height="50"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.464294" width="24" height="24" rx="4.8" fill="#1890FF" />
            <path
              d="M14.8643 3.6001H20.8643V9.6001H14.8643V3.6001Z"
              fill="white"
            />
            <path
              d="M10.0643 9.6001H14.8643V14.4001H10.0643V9.6001Z"
              fill="white"
            />
            <path
              d="M4.06427 13.2001H11.2643V20.4001H4.06427V13.2001Z"
              fill="white"
            />
          </svg>
          
          <Title className="login-title">Sign in</Title>
          <Text className="login-text">Enter your credentials to access your account.</Text>
        </div>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          requiredMark="optional"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" disabled={loading} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              disabled={loading}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox disabled={loading}>Remember me</Checkbox>
            </Form.Item>
            <a className="login-forgot-password" href="/forgot-pass">
              Forgot password?
            </a>
          </Form.Item>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button 
              block 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              icon={loading ? <LoadingOutlined /> : null}
            >
              {loading ? "Logging in" : "Log in"}
            </Button>
            <div className="login-footer">
              <Text className="login-text">Don't have an account?</Text>
              <a className="login-sign-up-now" href="/sign-up">
                Sign up now
              </a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}