import { axiosInstance } from './constants';

import type { CustomerDTO } from '@/pages/api/customers';

const baseUrl = `/api/customers`;

const CustomerService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function create(body: any) {
  return await axiosInstance.post<CustomerDTO>(baseUrl, body);
}

async function getAll(queryString: string = '') {
  return await axiosInstance.get<CustomerDTO[]>(`${baseUrl}${queryString}`);
}

async function getById(id: string) {
  return await axiosInstance.get<CustomerDTO>(
    `${baseUrl}/${id}`
  );
}

function update(id: string, body: any) {
  return axiosInstance.put<CustomerDTO>(`${baseUrl}/${id}`, body);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id: string) {
  return axiosInstance.delete<CustomerDTO>(`${baseUrl}/${id}`);
}

export default CustomerService;