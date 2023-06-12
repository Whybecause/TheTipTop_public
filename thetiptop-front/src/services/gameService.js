import axiosInstance from '../helpers/AxiosInterceptor';

const startGame = async (data) => {
  return axiosInstance.post('/game', data);
};

const getGame = async () => {
  return axiosInstance.get('/game');
};

const updateEndDate = async (data) => {
  return axiosInstance.patch('/game', data);
};

const endGame = () => {
  return axiosInstance.patch('/game/end');
};

const deleteGame = async () => {
  return axiosInstance.delete('/game');
};


export const gameService = {
  startGame,
  getGame,
  updateEndDate,
  endGame,
  deleteGame,
};

