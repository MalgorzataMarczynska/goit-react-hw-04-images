import axios from 'axios';
let limit = 12;
export const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: limit,
});
const baseUrl =
  'https://pixabay.com/api/?key=31935843-a63100f17f055f7a8dc315776&';
export const fetchImagesWithQuery = async (searchQuery, page) => {
  const response = await axios.get(
    `${baseUrl}q=${searchQuery}&${searchParams}&page=${page}`
  );
  return response.data;
};
