import UserLayout from '../../components/user/UserLayout';
import { Typography } from 'antd';
import { getCurrentUser } from '../../utils/auth';

const { Title } = Typography;

export default function UserDashboard() {
  const user = getCurrentUser();

  return (
    <UserLayout>
      <Title level={2}>Chào mừng đến với User Dashboard</Title>
      <p>Đây là trang chính của user. Xin chào, {user?.email}!</p>
    </UserLayout>
  );
}