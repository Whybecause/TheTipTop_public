import axiosInstance from '../helpers/AxiosInterceptor';

const create = (data) => {
  return axiosInstance.post('/gift', data);
};

const getAll = () => {
  return axiosInstance.get('/gift');
};

const getGiftCode = () => {
  return axiosInstance.get('/gift/code');
};

const getUserGifts = async (id) => {
  return axiosInstance.get(`/gift/belongs/${id}`);
};

const submitCode = (data) => {
  return axiosInstance.post('/gift/submit-code', data);
};

const checkout = (id, data) => {
  return axiosInstance.patch(`/gift/${id}`, data);
};

const deleteById = (id) => {
  return axiosInstance.delete(`/gift/${id}`);
};

const deleteAll = () => {
  return axiosInstance.delete('/gift');
};


export const giftService = {
  create,
  getAll,
  getGiftCode,
  getUserGifts,
  submitCode,
  checkout,
  deleteById,
  deleteAll,
};
