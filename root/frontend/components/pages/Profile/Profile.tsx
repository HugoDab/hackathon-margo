import { MainLayout } from 'components/MainLayout';
import { useGetMe } from 'services/api/user/useUser';

import { ProfileForm } from './ProfileForm';

export const Profile = (): JSX.Element => {
  const user = useGetMe();

  return (
    <MainLayout header={<h2>Here you can update your profile !</h2>}>
      {user && <ProfileForm user={user} />}
    </MainLayout>
  );
};
