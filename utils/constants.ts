import Axios from 'axios';

export const API = Axios.create({
  baseURL: process.env.PHOTOS_BASE_URL,
  timeout: 3000,
  headers: {
    Authorization: `Client-ID ${process.env.ACCESS_KEY}`
  }
});
