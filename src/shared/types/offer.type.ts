import { User } from './user.type.js';
import { Property } from './property.type.js';
import { City } from './city.type.js';
import { Location } from './location.type.js';
import { Features } from './features.type.js';

export type Offer = {
    title: string;
    descriprion: string;
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
    features : Features;
    user: User;
    location: Location;


}