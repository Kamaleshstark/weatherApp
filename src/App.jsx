import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { getWeather, getCitySuggestions } from './api/weather';
import { WeatherCard } from './components/WeatherCard';

function App() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const results = await getCitySuggestions(query);
      setSuggestions(results);
    };

    if (query.length >= 1) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = async (cityName) => {
    setLoading(true);
    setError('');
    setQuery(cityName);
    setSuggestions([]);
    
    try {
      const data = await getWeather(cityName);
      setWeather(data);
    } catch (err) {
      setError('City not found or error fetching weather data');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Weather Forecast</h1>
      
      <div className="w-full max-w-md mb-8 relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter city name..."
            className="w-full px-4 py-2 rounded-lg border-2 border-transparent focus:border-white bg-white/20 backdrop-blur-md text-white placeholder-white/70 outline-none"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSuggestions([]);
              }}
              className="absolute right-10 top-1/2 -translate-y-1/2 text-white hover:text-blue-200 transition-colors"
            >
              <X size={20} />
            </button>
          )}
          <button
            onClick={() => query && handleSearch(query)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-blue-200 transition-colors"
            disabled={loading}
          >
            <Search size={20} />
          </button>
        </div>

        {suggestions.length > 0 && (
          <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg overflow-hidden z-10">
            {suggestions.map((city, index) => (
              <button
                key={`${city.name}-${city.country}-${index}`}
                onClick={() => handleSearch(city.name)}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <span className="font-medium">{city.name}</span>
                <span className="text-sm text-gray-500">
                  {city.state ? `${city.state}, ` : ''}{city.country}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {loading && (
        <div className="text-white">Loading...</div>
      )}

      {error && (
        <div className="text-red-200 bg-red-500/20 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      {weather && <WeatherCard data={weather} />}
    </div>
  );
}

export default App;