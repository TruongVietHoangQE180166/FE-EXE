import AdminLayout from '../../components/admin/AdminLayout';
import { Typography } from 'antd';
import { getCurrentUser } from '../../utils/auth';

const { Title } = Typography;

export default function AdminDashboard() {
  const user = getCurrentUser();

  return (
    <AdminLayout>
      <Title level={2}>Chào mừng đến với Admin Dashboard</Title>
      <p>Đây là trang chính của admin. Xin chào, {user?.email}!</p>
    </AdminLayout>
  );
}