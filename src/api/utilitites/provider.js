import axios from 'axios'; 
import { handleResponse, handleError } from './response'; 

const BASE_URL = 'https://wordsapiv1.p.rapidapi.com/words/';
const API_HOST = process.env.REACT_APP_WORD_API_HOST;
const API_KEY = process.env.REACT_APP_WORD_API_KEY;

const onWordExists = async (word) => {
    console.log(API_HOST)
    const options = {
        method: "GET",
        url: `${BASE_URL}${word}`,
        headers: {
          "x-rapidapi-host": API_HOST,
          "x-rapidapi-key": API_KEY,
        },
      };
    return await axios
        .request(options)
        .then(handleResponse) 
        .catch(handleError); 
}

const onRandomWord = async () => {
    const options = {
        method: "GET",
        url: `${BASE_URL}`,
        headers: {
          "x-rapidapi-host": API_HOST,
          "x-rapidapi-key": API_KEY,
        },
        params: {
            random: "true",
            letters: "5",
          },
      };
    return await axios
        .request(options)
        .then(handleResponse) 
        .catch(handleError); 
  };

const apiProvider = {
    onWordExists,
    onRandomWord,
}

export default apiProvider;