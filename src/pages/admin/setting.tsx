import AdminLayout from '../../components/admin/AdminLayout';
import { Typography } from 'antd';

const { Title } = Typography;

export default function AdminSettings() {
  return (
    <AdminLayout>
      <Title level={2}>Cài đặt hệ thống</Title>
      <p>Đây là trang cài đặt dành cho admin.</p>
    </AdminLayout>
  );
}