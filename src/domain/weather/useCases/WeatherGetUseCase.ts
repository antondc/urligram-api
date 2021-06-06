import { IWeatherRepo } from '@domain/weather/repositories/IWeatherRepo';
import { DEFAULT_LOCATION } from '@shared/constants/env';
import { validateIpAddress } from '@tools/helpers/string/validateIpAddress';
import { IWeatherGetRequest } from './interfaces/IWeatherGetRequest';
import { IWeatherGetResponse } from './interfaces/IWeatherGetResponse';

export const weatherCodes = {
  100: 'Sunny',
  200: 'Few clouds',
  201: 'Scattered clouds',
  202: 'Broken clouds',
  203: 'Overcast clouds',
  300: 'Light showers',
  301: 'Light rain',
  302: 'Moderate rain',
  303: 'Heavy rain',
  304: 'Torrent rain',
  400: 'Light storm',
  401: 'Moderate storm',
  402: 'Strong storm',
  500: 'Light snow',
  501: 'Moderate snow',
  502: 'Heavy snow',
  503: 'Blizzard',
  600: 'Mist',
  601: 'Fog',
};

const addressesNotAllowed = ['192.168.88.1', '192.168.', '127.0.0.1'];

export interface IWeatherGetUseCase {
  execute: (weatherGetRequest: IWeatherGetRequest) => Promise<IWeatherGetResponse>;
}

export class WeatherGetUseCase implements IWeatherGetUseCase {
  private location: string;
  private weatherRepo: IWeatherRepo;

  constructor(weatherRepo: IWeatherRepo) {
    this.weatherRepo = weatherRepo;
  }

  public async execute(weatherGetRequest: IWeatherGetRequest): Promise<IWeatherGetResponse> {
    const { remoteAddress } = weatherGetRequest;

    const isIpValid = validateIpAddress(remoteAddress);
    const addressNotAllowed = addressesNotAllowed.some((item) => remoteAddress.includes(item));

    if (!isIpValid || addressNotAllowed) {
      this.location = DEFAULT_LOCATION;
    } else {
      this.location = remoteAddress;
    }

    const weatherData = await this.weatherRepo.weatherGetOne({ location: this.location });

    return weatherData;
  }
}
