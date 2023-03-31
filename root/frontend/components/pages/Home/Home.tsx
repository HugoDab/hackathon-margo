import Head from 'next/head';

import { MainLayout } from 'components/MainLayout';
import { Map } from 'components/Map';
import { useGetMe } from 'services/api/user/useUser';

export const Home = (): JSX.Element => {
  const user = useGetMe();

  return (
    <div>
      <Head>
        <title>DrinkWater</title>
        <meta name="description" content="DrinkWater" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout header={user && <h2>Welcome {user.name} to DrinkWater !</h2>}>
        {user && (
          <>
            <Map />
          </>
        )}
      </MainLayout>
    </div>
  );
};
