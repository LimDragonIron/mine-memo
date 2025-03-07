import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export const useCurrentUser = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState(session?.user);

  useEffect(() => {
    if (session) {
      setUser(session.user);
    }
  }, [session]);

  return user;
};