import HttpClient from '../HttpClient';
import { VariableType } from '../../../utils/interfaces';
import DemoClient from '../DemoClient';

class Variables {
  readonly api: HttpClient | DemoClient;

  constructor(api: HttpClient | DemoClient) {
    this.api = api;
  }

  create = async (variable: VariableType): Promise<VariableType> => {
    return this.api.post<VariableType>(`/api/v1/variable`, variable);
  };

  getAll = async (): Promise<VariableType[]> => {
    return this.api.get<VariableType[]>('/api/v1/variable', { scope: 'full' });
  };

  patch = async (variable: VariableType): Promise<VariableType> => {
    return this.api.patch<VariableType>(`/api/v1/variable/${variable.id}`, variable);
  };

  delete = async (variable: VariableType): Promise<{ success: boolean }> => {
    return this.api.delete(`/api/v1/variable/${variable.id}`);
  };
}

export default Variables;
