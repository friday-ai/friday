import { SessionAttributes } from '@friday-ai/shared';
import { useCallback, useState } from 'react';
import { useBetween } from 'use-between';

import req, { Methods } from './request';

const useApp = () => {
  const [session, setSession] = useState<SessionAttributes | null>(null);
  const [headers, setHeaders] = useState<string>('');

  const request = useCallback(<T>(method: Methods, url: string, query = {}, body = {}) => req<T>(method, url, headers, query, body), [headers]);

  const initExistingSession = useCallback(async () => {
    const s = localStorage.getItem('session') ? (JSON.parse(localStorage.getItem('session') || '{}') as SessionAttributes) : null;
    if (s) {
      // TODO: Check if session is still valid on server
      setSession(s);
      setHeaders(`Bearer ${s.accessToken}`);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await request<SessionAttributes>('post', '/api/v1/user/login', {}, { email, password });
      setSession(res);
      setHeaders(`Bearer ${res.accessToken}`);
      localStorage.setItem('session', JSON.stringify(res));
      localStorage.setItem('i18nextLng', res.user.language || 'en');
      return true;
    },
    [request]
  );

  const logout = useCallback(async () => {
    await request('patch', `/api/v1/session/revoke/${session?.id}`);
    setSession(null);
    setHeaders('');
    localStorage.removeItem('session');
    localStorage.removeItem('i18nextLng');
    return true;
  }, [session, request]);

  const signUp = useCallback(
    async (userName: string, email: string, password: string) => {
      const lang = localStorage.getItem('i18nextLng');
      const res = await request<SessionAttributes>(
        'post',
        '/api/v1/user/signup',
        {},
        { userName, email, password, language: lang, role: 'superadmin' }
      );

      setSession(res);
      setHeaders(`Bearer ${res.accessToken}`);
      localStorage.setItem('session', JSON.stringify(res));
      localStorage.setItem('i18nextLng', res.user.language || 'en');
      return true;
    },
    [request]
  );

  return {
    request,
    initExistingSession,
    login,
    logout,
    signUp,
    user: session?.user,
    hasSession: !!session,
  };
};

const useSharedApp = () => useBetween(useApp);

export default useSharedApp;
