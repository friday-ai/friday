import axios, { AxiosError, AxiosRequestHeaders } from 'axios';
import { SessionType, UserType } from '../../utils/interfaces';

const port = parseInt(import.meta.env.VITE_SERVER_PORT, 10);

class Auth {
  public session: SessionType;

  public setSession: (session: SessionType) => void;

  constructor(session: SessionType, setSession: (session: SessionType) => void) {
    this.session = session;
    this.setSession = setSession;
  }

  hasSession = (): boolean => {
    return !!this.session.accessToken;
  };

  getHeaders = (): Partial<AxiosRequestHeaders> => {
    if (!this.hasSession()) {
      return {};
    }
    return { authorization: `Bearer ${this.session?.accessToken}` };
  };

  checkSession = () => {
    if (this.hasSession()) {
      return this.refreshToken();
    }
    return false;
  };

  login = async (email: string, password: string, onSuccess: VoidFunction, onError: (error: string) => void) => {
    try {
      const { data } = await axios.post<SessionType>(`http://${window.location.hostname}:${port}/api/v1/user/login`, { email, password });
      localStorage.setItem('session', JSON.stringify(data));
      onSuccess();
      this.setSession(data);
    } catch (e: unknown) {
      const error = e as AxiosError;

      if (error?.response?.status === 404) {
        onError('404');
        return;
      }

      if (error?.response?.status === 403) {
        onError('403');
        return;
      }
      throw e;
    }
  };

  logout = async () => {
    const headers = this.getHeaders();
    const sessionId = this.session.id;

    localStorage.removeItem('session');
    this.setSession({});

    await axios.patch<SessionType>(
      `http://${window.location.hostname}:${port}/api/v1/session/revoke/${sessionId}`,
      {},
      {
        headers,
      }
    );
  };

  refreshToken = async () => {
    try {
      const { data } = await axios.post<SessionType>(`http://${window.location.hostname}:${port}/api/v1/session/access_token`, {
        refreshToken: this.session.refreshToken,
      });

      this.setSession(data);
      return true;
    } catch (e) {
      return false;
    }
  };

  signup = async (user: UserType) => {
    const { data } = await axios.post<SessionType>(`http://${window.location.hostname}:${port}/api/v1/user/signup`, user);
    this.setSession(data);
    localStorage.setItem('session', JSON.stringify(data));
  };
}

export default Auth;
