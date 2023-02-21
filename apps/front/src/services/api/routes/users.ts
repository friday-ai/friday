import HttpClient from '../HttpClient';
import DemoClient from '../DemoClient';
import { UserType } from '../../../utils/interfaces';

class Users {
  readonly api: HttpClient | DemoClient;

  constructor(api: HttpClient | DemoClient) {
    this.api = api;
  }

  patch = async (user: UserType): Promise<UserType> => {
    return this.api.patch<UserType>(`/api/v1/user/${user.id}`, user);
  };

  getCount = async (): Promise<number> => {
    return this.api.get<number>('/api/v1/user/count');
  };
}

export default Users;
