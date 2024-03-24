import axios from 'axios';

export type Methods = 'get' | 'post' | 'patch' | 'delete';

const port = parseInt(import.meta.env.VITE_SERVER_PORT, 10) || 3000;

const request = async <T>(method: Methods, url: string, header: string, query = {}, body = {}) => {
  const { data }: { data: T } = await axios<T>({
    method,
    url,
    baseURL: `http://${window.location.hostname}:${port}`,
    params: query,
    data: body,
    headers: {
      authorization: header,
    },
  });

  return data;
};

export default request;
