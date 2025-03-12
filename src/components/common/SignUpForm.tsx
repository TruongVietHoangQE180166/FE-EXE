import React, { useState } from "react";
import { Button, Form, Input, Typography, notification,} from "antd";
import { LockOutlined, MailOutlined, CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { register } from "../../utils/auth";
import "../../styles/common/SignUpForm.css";

const { Text, Title } = Typography;

export default function SignUpForm() {
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const showSuccessNotification = () => {
    api.success({
      message: "Registration Successful",
      description: "Your account has been created. You will be redirected to the login page.",
      icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
      duration: 2,
    });
  };

  const showErrorNotification = (errorMessage: string) => {
    api.error({
      message: "Registration Failed",
      description: errorMessage || "An error occurred while creating your account. Please try again.",
      icon: <CloseCircleOutlined style={{ color: "#ff4d4f" }} />,
      duration: 3,
    });
  };

  const onFinish = async (values: { email: string; password: string; confirmPassword: string }) => {
    setLoading(true);

    try {
      // Simulating a network request with setTimeout to match login form behavior
      setTimeout(() => {
        const success = register(values.email, values.password);
        
        if (success) {
          showSuccessNotification();
          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else {
          showErrorNotification("This email is already registered.");
          setLoading(false);
        }
      }, 1500); // Using the same delay as in login form
    } catch (error) {
      showErrorNotification("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <section className="signup-section">
      {contextHolder}
      <div className="signup-container">
        <div className="signup-header">
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
          <Title className="signup-title">Create Account</Title>
          <Text className="signup-text">Sign up to access all features.</Text>
        </div>
        <Form
          form={form}
          name="signup_form"
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
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Email" 
              disabled={loading} 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters long!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              disabled={loading}
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("The two passwords do not match!"));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm Password"
              disabled={loading}
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={loading ? <LoadingOutlined /> : null}
              size="large"
            >
              {loading ? "Registering..." : "Sign Up"}
            </Button>
            <div className="signup-footer">
              <Text className="signup-text">Already have an account?</Text>{" "}
              <a className="signup-login-link" href="/">
                Log in
              </a>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}