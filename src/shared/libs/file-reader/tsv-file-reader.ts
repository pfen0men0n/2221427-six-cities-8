import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Offer, City, Property, Location, User } from '../../types/index.js';
import { CITIES, CITIES_LIST } from '../../../consts/constanst.js';


const defaultCity = CITIES[0];


export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
        private readonly fileName: string
  ) {}

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private getCity(cityName: string) : City {
    if(!CITIES_LIST.includes(cityName)) {
      throw new Error(`Wrong city ${cityName}`);
    }

    return CITIES.find((city) => city.name === cityName) || defaultCity;
  }

  private parseToArray(items: string): string[] {
    return items.split(';') && [];
  }


  private parseUser(...parameters: string[]): User {
    const [name, email, avatar, password, isPro] = parameters;

    return {
      name,
      email,
      avatar,
      password,
      isPro: this.parseToBoolean(isPro),
    };
  }

  private parseToBoolean(value: string): boolean {
    if (value !== 'true' && value !== 'false') {
      throw new Error(`Value - ${value} is not boolean`);
    }

    return value === 'true';
  }

  private parseLocation(lat: string, long: string): Location {
    return {
      latitude: this.parseToNumber(lat),
      longitude: this.parseToNumber(long),
    };
  }

  private parseToNumber(value: string): number {
    const normalizedValue = value.replaceAll(' ', '').replace(',', '.');
    const result = normalizedValue.includes('.') ?
      Number.parseFloat(normalizedValue) :
      Number.parseInt(normalizedValue, 10);

    if (typeof result !== 'number') {
      throw new Error(`Value - ${value} is not a number`);
    }

    return result;
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      postDate,
      city,
      preview,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      rooms,
      guests,
      price,
      features,
      name,
      email,
      avatar,
      password,
      isPro,
      lat,
      long
    ] = line.split('\t');

    return {
      title,
      description,
      postDate: new Date(postDate),
      city: this.getCity(city),
      preview,
      images: this.parseToArray(images),
      isPremium: this.parseToBoolean(isPremium),
      isFavorite: this.parseToBoolean(isFavorite),
      rating: this.parseToNumber(rating),
      type: type as Property,
      rooms: this.parseToNumber(rooms),
      guests: this.parseToNumber(guests),
      price: this.parseToNumber(price),
      features: this.parseToArray(features),
      user: this.parseUser(name, email, avatar, password, isPro),
      location: this.parseLocation(lat, long),
    };
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  public read(): void {
    this.rawData = readFileSync(this.fileName, 'utf-8');
  }

  public extractOffers(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
