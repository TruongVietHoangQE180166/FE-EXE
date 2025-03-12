import { Layout, Menu, Button } from 'antd';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { logout } from '../../utils/auth';
import '../../styles/user/UserLayout.css';

const { Header, Content, Footer } = Layout;

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
  const router = useRouter();

  const menuItems = [
    {
      key: '1',
      label: 'Dashboard',
      path: '/user/dashboard',
    },
    {
      key: '2',
      label: 'Profile',
      path: '/user/profile',
    },
    {
      key: '3',
      label: 'Tasks',
      path: '/user/task',
    },
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const getSelectedKey = () => {
    const currentPath = router.pathname;
    const matchedItem = menuItems.find(item => item.path === currentPath);
    return matchedItem ? [matchedItem.key] : ['1'];
  };

  return (
    <Layout className="user-layout">
      <Header className="user-header">
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={getSelectedKey()}
          items={menuItems.map(item => ({
            key: item.key,
            label: item.label,
            onClick: () => router.push(item.path),
          }))}
          className="user-menu"
        />
        <Button
          type="primary"
          onClick={handleLogout}
          className="logout-button"
        >
          logout
        </Button>
      </Header>
      <Content className="user-layout-content">{children}</Content>
      <Footer className="user-layout-footer">
        User Panel ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default UserLayout;