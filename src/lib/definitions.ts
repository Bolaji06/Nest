export interface ISessionData {
  id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: string;
}
export interface IUserProfileData {
  data: {
    id: string;
    username: string;
    email: string;
    avatar: string;
    createdAt: string;
    password: string;
    userType: string;
  };
}
export enum EType {
  buy,
  rent,
}
export enum EProperty {
  land,
  condo,
  house,
  apartment,
}

export type TSearchForm = {
  title: string,
  city: string,
  minPrice: string,
  maxPrice: string,
  type: "buy" | "rent" | ""
  property: "apartment" | "condo" | "land" | "house" | "",
}

export type TPost = {
  id: string,
  title: string,
  price: number,
  unitArea: number,
  images: string[],
  address: string,
  city: string,
  bedroom: number,
  bathroom: number,
  longitude: string,
  latitude: string,
  type: 'buy' | 'sell',
  property: "apartment" | "condo" | "land" | "house" | "",
  createdAt: string,
  userId: string,
  description: string;
  user: {
    username: string;
    avatar: string;
  }
  isSaved: boolean
}

export interface Post {
  id: string,
  title: string,
  price: number,
  unitArea: number,
  images: string[],
  address: string,
  city: string,
  bedroom: number,
  bathroom: number,
  longitude: string,
  latitude: string,
  type: 'buy' | 'sell',
  property: "apartment" | "condo" | "land" | "house" | "",
  createdAt: string,
  userId: string,
  description: string;
}

export type TPostResult = {
  success: boolean;
  message: TPost
}
