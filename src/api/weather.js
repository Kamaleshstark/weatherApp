import axios from 'axios';

const API_KEY = '8f1d510cabbf357de5ec4881a96ef302';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export const getWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};

export const getCitySuggestions = async (query) => {
  if (!query.trim() || query.length < 1) return [];
  
  try {
    const response = await axios.get(`${GEO_URL}/direct`, {
      params: {
        q: query,
        limit: 5,
        appid: API_KEY
      }
    });
    return response.data.map(city => ({
      name: city.name,
      country: city.country,
      state: city.state
    }));
  } catch (error) {
    console.error('Failed to fetch city suggestions:', error);
    return [];
  }
};