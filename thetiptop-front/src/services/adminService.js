import axiosInstance from '../helpers/AxiosInterceptor';

const getStats = () => {
  return axiosInstance.get('/stats');
};

const defineWinner = () => {
  return axiosInstance.patch('/game/winner');
};

const getWinner = () => {
  return axiosInstance.get('/game/winner');
};

const resetWinner = () => {
  return axiosInstance.patch('/game/reset-winner');
};

const downloadEmailCSV = async () => {
  const result = await axiosInstance({
    method: 'GET',
    url: '/emailing',
    responseType: 'blob',
  });

  const url = window.URL.createObjectURL(new Blob([result.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'emailing.csv');
  document.body.appendChild(link);
  link.click();
};

export const adminService = {
  getStats,
  defineWinner,
  getWinner,
  resetWinner,
  downloadEmailCSV,
};

