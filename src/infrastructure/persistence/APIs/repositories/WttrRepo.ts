import { IWeatherRepo } from '@domain/weather/repositories/IWeatherRepo';
import { weatherCodes } from '@domain/weather/useCases/WeatherGetUseCase';
import { HttpClient } from '@shared/services/HttpClient';
import { IWeatherDataApiResponse } from './interfaces/IWeatherDataApiResponse';

// Translates http://www.worldweatheronline.com weather codes —http://www.worldweatheronline.com/feed/wwoConditionCodes.txt—
// to openweathermap.org codes —https://openweathermap.org/weather-conditions—

const WeatherCodesMap = {
  395: 401, //	Moderate or heavy snow in area with thunder
  392: 401, //	Patchy light snow in area with thunder
  389: 401, //	Moderate or heavy rain in area with thunder
  386: 400, //	Patchy light rain in area with thunder
  377: 401, //	Moderate or heavy showers of ice pellets
  374: 401, //	Light showers of ice pellets
  371: 501, //	Moderate or heavy snow showers
  368: 501, //	Light snow showers
  365: 301, //	Moderate or heavy sleet showers
  362: 301, //	Light sleet showers
  359: 304, //	Torrential rain shower
  356: 303, //	Moderate or heavy rain shower
  353: 302, //	Light rain shower
  350: 401, //	Ice pellets
  338: 502, //	Heavy snow
  335: 501, //	Patchy heavy snow
  332: 501, //	Moderate snow
  329: 500, //	Patchy moderate snow
  326: 500, //	Light snow
  323: 500, //	Patchy light snow
  320: 500, //	Moderate or heavy sleet
  317: 500, //	Light sleet
  314: 302, //	Moderate or Heavy freezing rain
  311: 301, //	Light freezing rain
  308: 303, //	Heavy rain
  305: 303, //	Heavy rain at times
  302: 300, //	Moderate rain
  299: 300, //	Moderate rain at times
  296: 300, //	Light rain
  293: 302, //	Patchy light rain
  284: 302, //	Heavy freezing drizzle
  281: 300, //	Freezing drizzle
  266: 300, //	Light drizzle
  263: 300, //	Patchy light drizzle
  260: 601, //	Freezing fog
  248: 601, //	Fog
  230: 503, //	Blizzard
  227: 501, //	Blowing snow
  200: 401, //	Thundery outbreaks in nearby
  185: 500, //	Patchy freezing drizzle nearby
  182: 500, //	Patchy sleet nearby
  179: 500, //	Patchy snow nearby
  176: 301, //	Patchy rain nearby
  143: 600, //	Mist
  122: 202, //	Overcast
  119: 201, //	Cloudy
  116: 200, //	Partly Cloudy
  113: 100, //	Clear/Sunny
};

export class WttrRepo implements IWeatherRepo {
  public async weatherGetOne({ location }) {
    try {
      const httpClient = new HttpClient({ credentials: false });
      const weatherData = await httpClient.publicInstance.get<void, IWeatherDataApiResponse>(`http://wttr.in/${location}?format=j1`);

      const currentWeatherData = weatherData.current_condition[0];

      return {
        temperature: currentWeatherData.temp_C,
        humidity: currentWeatherData.humidity,
        weatherCode: WeatherCodesMap[currentWeatherData.weatherCode],
        windSpeed: currentWeatherData.windspeedKmph,
        widDirection: currentWeatherData.winddir16Point,
        pressure: currentWeatherData.pressure,
        weatherDesc: weatherCodes[WeatherCodesMap[currentWeatherData?.weatherCode]],
        precipitations: currentWeatherData.precipMM,
      };
    } catch (error) {
      throw error;
    } finally {
    }
  }
}
