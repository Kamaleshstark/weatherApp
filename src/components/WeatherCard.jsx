import React from 'react';
import { Cloud, Droplets, Thermometer } from 'lucide-react';

export const WeatherCard = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{data.name}</h2>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
          className="w-16 h-16"
        />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Thermometer className="text-red-500" />
          <span className="text-4xl font-bold">{Math.round(data.main.temp)}°C</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Cloud className="text-blue-500" />
          <span className="text-lg text-gray-600">{data.weather[0].description}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Droplets className="text-blue-400" />
          <span className="text-lg text-gray-600">Humidity: {data.main.humidity}%</span>
        </div>
        
        <div className="text-sm text-gray-500">
          Feels like: {Math.round(data.main.feels_like)}°C
        </div>
      </div>
    </div>
  );
};