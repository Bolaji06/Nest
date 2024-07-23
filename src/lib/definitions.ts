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
