export type IWeatherDataApiResponse = {
  current_condition: {
    cloudcover: number;
    FeelsLikeC: number;
    FeelsLikeF: number;
    humidity: number;
    localObsDateTime: string;
    observation_time: string;
    precipInches: number;
    precipMM: number;
    pressure: number;
    pressureInches: number;
    temp_C: number;
    temp_F: number;
    uvIndex: number;
    visibility: number;
    visibilityMiles: number;
    weatherCode: number;
    weatherDesc: { value: string }[];
    weatherIconUrl: string;
    winddir16Point: string;
    winddirDegree: number;
    windspeedKmph: number;
    windspeedMiles: number;
  }[];
};
