import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '27144751-892a725032099e3eb90bcbf85',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 10,
  },
});

export const query = async (q, page) => {
  const { data } = await instance.get('/?', {
    params: {
      q,
      page,
    },
  });
  return data;
};
