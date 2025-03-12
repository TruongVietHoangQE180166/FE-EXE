import UserLayout from '../../components/user/UserLayout';
import { Typography } from 'antd';

const { Title } = Typography;

export default function UserTasks() {
  return (
    <UserLayout>
      <Title level={2}>Danh sách nhiệm vụ</Title>
      <p>Đây là trang danh sách nhiệm vụ của user.</p>
    </UserLayout>
  );
}