import AdminLayout from '../../components/admin/AdminLayout';
import { Typography } from 'antd';

const { Title } = Typography;

export default function AdminUsers() {
  return (
    <AdminLayout>
      <Title level={2}>Quản lý người dùng</Title>
      <p>Đây là trang quản lý người dùng dành cho admin.</p>
    </AdminLayout>
  );
}