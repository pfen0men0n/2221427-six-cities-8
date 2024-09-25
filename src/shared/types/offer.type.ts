import { User } from './user.type.js';
import { Property } from './property.type.js';
import { City } from './city.type.js';
import { Location } from './location.type.js';
import { FEATURES } from '../../consts/constanst.js';

export type Offer = {
    title: string;
    description: string;
    postDate: Date;
    city: City;
    preview: string;
    images: string[];
    isPremium: boolean;
    isFavorite: boolean;
    rating: number;
    type: Property;
    rooms: number;
    guests: number;
    price: number;
    features : typeof FEATURES;
    user: User;
    location: Location;


}
