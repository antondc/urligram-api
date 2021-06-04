import { IWeatherRepo } from '@domain/weather/repositories/IWeatherRepo';
import { HttpClient } from '@shared/services/HttpClient';
import { IWeatherDataApiResponse } from './interfaces/IWeatherDataApiResponse';

export class WttrRepo implements IWeatherRepo {
  public async weatherGetOne({ location }) {
    try {
      const httpClient = new HttpClient({ credentials: false });
      const weatherData = await httpClient.publicInstance.get<void, IWeatherDataApiResponse>(`http://wttr.in/${location}?format=j1`);

      const currentWeatherData = weatherData.current_condition[0];

      return {
        temperature: currentWeatherData.temp_C,
        humidity: currentWeatherData.humidity,
        weatherCode: currentWeatherData.weatherCode,
        windSpeed: currentWeatherData.windspeedKmph,
        widDirection: currentWeatherData.winddir16Point,
        pressure: currentWeatherData.pressure,
        weatherDesc: currentWeatherData.weatherDesc[0]?.value,
        precipitations: currentWeatherData.precipMM,
      };
    } catch (error) {
      throw error;
    } finally {
    }
  }
}
