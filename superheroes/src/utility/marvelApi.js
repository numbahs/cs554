import axios from 'axios';

const marvelInstance = axios.create();
marvelInstance.interceptors.request.use((config) => {
  console.log(config);
})

export const searchForSuperHeroes = superHeroName => {
  const url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&apikey=bce7132e6680ab01fe92e386ca9bdf2a`
  const httpResponse = await Axios.get(url);

  return httpResponse.data.data.results;
}