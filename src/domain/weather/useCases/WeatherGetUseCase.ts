import { DEFAULT_LOCATION } from '@shared/constants/env';
import { validateIpAddress } from '@tools/helpers/string/validateIpAddress';
import { IWeatherRepo } from '../repositories/IWeatherRepo';
import { IWeatherGetRequest } from './interfaces/IWeatherGetRequest';
import { IWeatherGetResponse } from './interfaces/IWeatherGetResponse';

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
