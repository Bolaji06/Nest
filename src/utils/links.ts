
import {
  Facebook,
  Twitter,
  Instagram,
 
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
    name: "Posts",
    link: "/account/activity/all_post",
    
  },
  {
    name: "Saved Post",
    link: "/account/activity/saved_post",
    
  },
  // {
  //   name: "Saved Search",
  //   link: "/account/activity/saved_search",
  // },
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
  "restaurant",
];

export const propertyType = ["condo", "apartment", "land", "house"];

export const appliance = [
  "Dishwasher",
  "Dryer",
  "Freezer",
  "Garbage disposal",
  "Microwave",
  "Range/Oven",
  "Refrigerator",
  "Trash compactor",
  "Washer",
  "Others",
];

export const basement = [
  "Finished",
  "Unfinished",
  "Partially finished",
  "None",
];

export const floorCovering = [
  "Carpet",
  "Concrete",
  "Hardwood",
  "Laminate",
  "Linoleum/Vinyl",
  "Slate",
  "Softwood",
  "Tile",
  "Other",
];

export const rooms = [
  "Breakfast nook",
  "Dinning room",
  "Family room",
  "Laundry",
  "Library",
  "Master bath",
  "Mud room",
  "Office",
  "Pantry",
  "Recreation room",
  "Workshop",
  "Solarium / Atrium",
  "Sun room",
  "Walk-in-closet",
];

export const indoorFeatures = [
  "Attic",
  "Cable ready",
  "Ceiling fans",
  "Double pane/storm windows",
  "Fireplace",
  "Intercom system",
  "Jetted tub",
  "Mother-in-law-apartment",
  "Security system",
  "Skylights",
  "Vaulted ceiling",
  "Web bar",
  "Wired",
];

export const buildingAmenities = [
  "Gated Entry",
  "Near transportation",
  "Sport Court",
  "Storage",
  "Elevator",
  "Doorman",
  "Controlled access",
  "Disabled access",
];
export const architecturalStyle = [
  "Bungalow",
  "Modern",
  "Cape Cod",
  "Contemporary",
  "Ranch / Rambler",
  "Colonial",
  "French",
  "Georgian",
  "Loft",
  "Other",
];

export const exterior = [
  "Brick",
  "Stucco",
  "Metal",
  "Stone",
  "Vinyl",
  "Cement / Concrete",
  "Wood",
  "Shingle",
];
export const outdoorAmenities = [
  "Balcony/patio",
  "Lawn",
  "Pond",
  "Barbecue area",
  "Deck",
  "Pool",
  "Sauna",
  "Sprinkler system",
  "RV parking",
  "Porch",
  "Garden",
  "Waterfront",
  "Hut tub/spa",
  "Greenhouse",
];
export const parking = [
  "Carport",
  "Garage - Attached",
  "Garage - Detached",
  "Off-street",
  "On-street",
  "None",
];

export const roof = [
  "Asphalt",
  "Shake / Shingle",
  "Slate",
  "Tile",
  "Metal",
  "Composition",
  "Built-up",
  "Other",
];

export const view = [
  "City",
  "Mountain",
  "Park",
  "Territorial",
  "Forest",
  "Waterfall",
  "None",
];

export const coolingType = [
  "Central",
  "Solar",
  "Evaporative",
  "Wall",
  "Refrigeration",
  "Evaporative",
  "Other",
  "None",
];
export const heatingType = [
  "Baseboard",
  "Stove",
  "Wall",
  "Forced air",
  "Geothermal",
  "Radiant",
  "Heat pump",
  "Geothermal",
];
export const heatingFuel = [
  "Coal",
  "Solar",
  "Electric",
  "Gas",
  "Wood / Pellet",
  "Oil",
  "None",
];
