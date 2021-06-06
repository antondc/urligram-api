export type valueof<T> = T[keyof T];

export type WeatherCodes = {
  100: 'Sunny';
  200: 'Few clouds';
  201: 'Scattered clouds';
  202: 'Broken clouds';
  203: 'Overcast clouds';
  300: 'Light showers';
  301: 'Light rain';
  302: 'Moderate rain';
  303: 'Heavy rain';
  304: 'Torrent rain';
  400: 'Light storm';
  401: 'Moderate storm';
  402: 'Strong storm';
  500: 'Light snow';
  501: 'Moderate snow';
  502: 'Heavy snow';
  503: 'Blizzard';
  600: 'Mist';
  601: 'Fog';
};

export type IWeatherGetResponse = {
  temperature: number;
  humidity: number;
  weatherCode: keyof WeatherCodes;
  windSpeed: number;
  widDirection: string;
  pressure: number;
  weatherDesc: valueof<WeatherCodes>;
  precipitations: number;
};
