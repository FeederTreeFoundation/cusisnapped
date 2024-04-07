import Router from 'next/router';
import { axiosInstance } from './constants';

import type { UserDTO } from '@/pages/api/users';

const baseUrl = `/api/users`;

const UserService = {
  login,
  logout,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function login(apiUser: string, token: string) {
  const res = await axiosInstance.post<{ api_user_id: number, organization_id: number }>(
    `${baseUrl}/authenticate`,
    { apiUser, token }
  );

  if(res.data?.api_user_id) axiosInstance.defaults.headers.common['authorization'] = token;
  return res;
}

async function logout() {
  // WIP: Remove authorization token instead of user id
  sessionStorage.removeItem('api_user_id');
  Router.push('/admin/login');
}

async function create(body: any) {
  return await axiosInstance.post<UserDTO>(baseUrl, body);
}

async function getAll(queryString: string = '') {
  return await axiosInstance.get<UserDTO[]>(`${baseUrl}${queryString}`);
}

async function getById(id: string) {
  return await axiosInstance.get<UserDTO>(
    `${baseUrl}/${id}`
  );
}

function update(id: string, body: any) {
  return axiosInstance.put<UserDTO>(`${baseUrl}/${id}`, body);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id: string) {
  return axiosInstance.delete<UserDTO>(`${baseUrl}/${id}`);
}

export default UserService;