const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '37600791-d09d47700ee4db7cdd78bc1fd';

export const searchImages = (searchWord, page) => {
  return fetch(
    `${BASE_URL}?q=${searchWord}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};
