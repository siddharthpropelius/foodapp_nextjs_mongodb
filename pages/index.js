import Login from '../components/auth/Login';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push('/home');
  } else {
    return (
      <div>
        <Login />
      </div>
    );
  }
}
