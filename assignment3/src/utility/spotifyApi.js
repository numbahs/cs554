import axios from 'axios';

const { authString, authLink, searchLink } = require('./secret.js');

const auth = async () => {
  const { data } = await axios.post(
    authLink,
    'grant_type=client_credentials',
    {
      headers: {
        Authorization: authString
      }
    }
  );
  return data;
};

const searchForSong = async (query, token) => {
  const { data } = await axios.get(
    searchLink,
    {
      params: {
        q: query,
        type: 'track',
        market: 'US'
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return data;
};

export {
  auth,
  searchForSong
}
