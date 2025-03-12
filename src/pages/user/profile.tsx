import UserLayout from '../../components/user/UserLayout';
import { Typography } from 'antd';

const { Title } = Typography;

export default function UserProfile() {
  return (
    <UserLayout>
      <Title level={2}>Hồ sơ cá nhân</Title>
      <p>Đây là trang hồ sơ cá nhân của user.</p>
    </UserLayout>
  );
}