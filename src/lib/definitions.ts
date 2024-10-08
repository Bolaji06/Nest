export interface ISessionData {
  id: string;
  username: string;
  email: string;
  avatar: string;
  status: string
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
    firstName: string;
    lastName: string;
    about: string;
    phone: string;
    location: string;
  };
}

export interface IUserProfile {
  id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: string;
  password: string;
  userType: string;
  firstName: string;
  lastName: string;
  about: string;
  phone: string;
  location: string;
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
  title: string;
  city: string;
  minPrice: string;
  maxPrice: string;
  type: "buy" | "rent" | "";
  property: "apartment" | "condo" | "land" | "house" | "";
};

export type TPost = {
  id: string;
  title: string;
  price: number;
  unitArea: number;
  images: string[];
  address: string;
  city: string;
  bedroom: number;
  bathroom: number;
  longitude: string;
  latitude: string;
  type: "buy" | "sell";
  property: "apartment" | "condo" | "land" | "house" | "";
  createdAt: string;
  userId: string;
  description: string;
  user: {
    username: string;
    avatar: string;
  };
};

export interface Post {
  id: string;
  title: string;
  price: number;
  unitArea: number;
  images: string[];
  address: string;
  city: string;
  bedroom: number;
  bathroom: number;
  longitude: string;
  latitude: string;
  type: "buy" | "sell";
  property: "apartment" | "condo" | "land" | "house" | "";
  createdAt: string;
  userId: string;
  description: string;
}

export type TPostResult = {
  success: boolean;
  message: TPost;
};

export type TAmenities = {
    roomDetails: {
      appliances: string[];
      basement: string;
      floorCovering: string[];
      rooms: string[];
      indoorFeatures: string[]
    };
    utilitiesDetails: {
      coolingType: string[];
      heatingType: string[];
      heatingFuel: string[]
    };

    buildingDetails: {
      buildingAmenities: string[];
      architecturalStyle: string;
      exterior: string[];
      numUnit: number;
      numFloor: number;
      outdoorAmenities: string[];
      parking: string[];
      parkingSpace: number;
      roof: string[];
      view: string[];
    };
}

export type TPostAmenities = {
  success: boolean;
  message: {
    post: TPost;
    amenities: TAmenities;
    isSaved: boolean;
  };
};

export interface ISavedPost {
  success: false;
  message: [
    {
      id: string;
      userId: string;
      postId: string;
      createdAt: string;
    }
  ]
}

import { postSchemaType } from "@/utils/validation";

export type Category = keyof postSchemaType['amenities']; // "roomDetails" | "buildingDetails" | "utilitiesDetails"

export type RoomDetailsKeys = keyof postSchemaType['amenities']['roomDetails']; // "appliance" | "basement" | etc.
export type BuildingDetailsKeys = keyof postSchemaType['amenities']['buildingDetails']; // "architecturalStyle" | "buildingAmenities" | etc.
export type UtilitiesDetailsKeys = keyof postSchemaType['amenities']['utilitiesDetails']; // "coolingType" | "heatingFuel" | etc.

// Union type for all possible keys
export type AmenityKeys = RoomDetailsKeys | BuildingDetailsKeys | UtilitiesDetailsKeys;


