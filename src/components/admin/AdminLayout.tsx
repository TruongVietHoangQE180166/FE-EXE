import { Layout, Menu, Button } from 'antd';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { logout } from '../../utils/auth';
import '../../styles/admin/AdminLayout.css';

const { Header, Content, Footer } = Layout;

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const router = useRouter();

  const menuItems = [
    {
      key: '1',
      label: 'Dashboard',
      path: '/admin/dashboard',
    },
    {
      key: '2',
      label: 'Users',
      path: '/admin/user',
    },
    {
      key: '3',
      label: 'Settings',
      path: '/admin/setting',
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
    <Layout className="admin-layout">
      <Header className="admin-header">
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={getSelectedKey()}
          items={menuItems.map(item => ({
            key: item.key,
            label: item.label,
            onClick: () => router.push(item.path),
          }))}
          className="admin-menu"
        />
        <Button
          type="primary"
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
        </Button>
      </Header>
      <Content className="admin-layout-content">{children}</Content>
      <Footer className="admin-layout-footer">
        Admin Panel ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default AdminLayout;