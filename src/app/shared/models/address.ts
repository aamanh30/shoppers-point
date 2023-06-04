import { GeoLocation } from './geolocation';

export interface Address {
  geolocation: GeoLocation;
  city: string;
  street: string;
  number: number;
  zipcode: string;
}
