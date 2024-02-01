import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { createViewerToken } from '@/actions/token';

export function useViewerToken(hostId: string) {
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [identity, setIdentity] = useState('');

  useEffect(() => {
    const createToken = async () => {
      try {
        const viewerToken = await createViewerToken(hostId);
        setToken(viewerToken);

        const decoded = jwtDecode(viewerToken) as JwtPayload & {
          name?: string;
        };
        const name = decoded?.name;
        const identity = decoded.jti;

        if (name) {
          setName(name);
        }

        if (identity) {
          setIdentity(identity);
        }
      } catch (error) {
        toast.error('Something went wrong. Try again later');
      }
    };

    createToken();
  }, [hostId]);

  return { token, name, identity };
}
