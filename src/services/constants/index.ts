import axios from 'axios';

export const ROUTES = {
  root: {
    PATH: '/',
    PAGE_TITLE: 'Home',
  },
};

export const axiosInstance = axios.create({
  headers: {
    common: {
      // can be common or any other method
      authorization: '',
    },
  },
});