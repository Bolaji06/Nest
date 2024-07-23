// import facebook from '../../public/facebook.svg'
// import twitter from '../../public/twitter.svg'
// import pintrest from '../../public/pintrest.svg'

import {
  Facebook,
  Twitter,
  Instagram,
  UserRound,
  BrickWall,
  Heart,
  SearchIcon,
} from "lucide-react";

export const navLinks = [
  {
    link: "Buy",
    href: "/buy",
  },
  {
    link: "Sell",
    href: "/sell",
  },
  {
    link: "Rent",
    href: "/rent",
  },
  {
    link: "Agents",
    href: "/agents",
  },
];

export const socialLinks = [
  {
    name: "Facebook",
    link: "www.facebook.com",
    icon: Facebook,
  },
  {
    name: "X",
    link: "www.x.com",
    icon: Twitter,
  },
  {
    name: "Pinterest",
    link: "www.pinterest.com",
    icon: Instagram,
  },
];

export const profileSideLink = [
  {
    name: "Profile",
    link: "/account",
    icon: UserRound,
  },
  {
    name: "Posts",
    link: "/account/all_post",
    icon: BrickWall,
  },
  {
    name: "Saved Post",
    link: "/account/saved_post",
    icon: Heart,
  },
  {
    name: "Saved Search",
    link: "/account/saved_search",
    icon: SearchIcon,
  },
];

enum UserType {
  renter,
  rentee,
  home_seller,
  home_buyer,
  other,
}

export const userType = [
  {
    text: "Renter",
    value: "renter",
  },
  {
    text: "Rentee",
    value: "rentee",
  },
  {
    text: "Home Buyer",
    value: "home_buyer",
  },
  {
    text: "Home Seller",
    value: "home_seller",
  },
  {
    text: "Other",
    value: "other",
  },
];

export const postForm = [
  "title",
  "price",
  "address",
  "city",
  "longitude",
  "latitude",
  "bedroom",
  "bathroom",
  "type",
  "property",
  "description",
  "utilities",
  "pets",
  "income",
  "size",
  "school",
  "bus",
  "restaurant"
];

export const propertyType = [
  "condo",
  "apartment",
  "land",
  "house",
]
