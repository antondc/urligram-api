
import { IWeatherGetRequest } from './interfaces/IWeatherGetRequest';
import { IWeatherGetResponse } from './interfaces/IWeatherGetResponse';


export interface IWeatherRepo {
  weatherGetOne: (weatherGetRequest: IWeatherGetRequest) => Promise<IWeatherGetResponse>;

}
