import { SessionAttributes } from '@friday-ai/shared';
import { useCallback, useState } from 'react';
import { useBetween } from 'use-between';

import req, { Methods } from './request';
import useWebsocket from './useWebsocket';

const useApp = () => {
  const [session, setSession] = useState<SessionAttributes | null>(null);
  const [headers, setHeaders] = useState<string>('');
  const { connect, on, off } = useWebsocket();

  const request = useCallback(<T>(method: Methods, url: string, query = {}, body = {}) => req<T>(method, url, headers, query, body), [headers]);

  const initExistingSession = useCallback(async () => {
    const s = localStorage.getItem('session') ? (JSON.parse(localStorage.getItem('session') || '{}') as SessionAttributes) : null;
    if (s) {
      try {
        const res = await request<SessionAttributes>('post', '/api/v1/session/access_token', {}, { refreshToken: s.refreshToken });
        setSession(res);
        setHeaders(`Bearer ${res.accessToken}`);
        connect(res.accessToken, res.userId);
        return true;
      } catch (error) {
        setSession(null);
        setHeaders('');
        localStorage.removeItem('session');
        return false;
      }
    } else {
      return false;
    }
  }, [request, connect]);

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
    ws: { on, off },
  };
};

const useSharedApp = () => useBetween(useApp);

export default useSharedApp;