import config from "../../site.config";

export const AFFILIATE_URL = config.affiliate.mainUrl;
export const PROMO_CODE = "STARBURST";

export interface Casino {
  name: string;
  bonus: string;
  rating: number;
  licensed: boolean;
}

export const casinos: Casino[] = [
  {
    name: "Yebo Casino",
    bonus: "R10,000 Welcome Bonus",
    rating: 4.5,
    licensed: true,
  },
  {
    name: "Thunderbolt Casino",
    bonus: "R10,000 + 100 Free Spins",
    rating: 4.3,
    licensed: true,
  },
  {
    name: "Springbok Casino",
    bonus: "R11,500 Welcome Package",
    rating: 4.2,
    licensed: true,
  },
];
