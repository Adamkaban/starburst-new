import config from "../../site.config";

export const AFFILIATE_URL = config.affiliate.mainUrl;
export const PROMO_CODE = "STARBURST";

export interface Casino {
  name: string;
  bonus: string;
  rating: number;
  licensed: boolean;
  wagering?: number;
  minDeposit?: string;
  paymentMethods?: string[];
}

export const casinos: Casino[] = [
  {
    name: "1win",
    bonus: "600% Welcome Bonus (code STRS2026)",
    rating: 4.6,
    licensed: true,
    wagering: 35,
    minDeposit: "R180",
    paymentMethods: ["EFT", "Visa", "Mastercard", "Ozow"],
  },
  {
    name: "YesPlay",
    bonus: "Up to R12,000 + Free Spins",
    rating: 4.4,
    licensed: true,
    wagering: 30,
    minDeposit: "R1",
    paymentMethods: ["EFT", "Ozow", "Visa"],
  },
  {
    name: "Yebo Casino",
    bonus: "R10,000 Welcome Bonus",
    rating: 4.3,
    licensed: true,
    wagering: 40,
    minDeposit: "R100",
    paymentMethods: ["EFT", "Visa", "Mastercard"],
  },
  {
    name: "Thunderbolt Casino",
    bonus: "R10,000 + 100 Free Spins",
    rating: 4.2,
    licensed: true,
    wagering: 40,
    minDeposit: "R100",
    paymentMethods: ["EFT", "Visa"],
  },
  {
    name: "Springbok Casino",
    bonus: "R11,500 Welcome Package",
    rating: 4.1,
    licensed: true,
    wagering: 40,
    minDeposit: "R50",
    paymentMethods: ["EFT", "Visa", "Mastercard"],
  },
  {
    name: "Lottoland",
    bonus: "Up to R5,000 + Free Spins",
    rating: 4.0,
    licensed: true,
    wagering: 35,
    minDeposit: "R50",
    paymentMethods: ["EFT", "Visa"],
  },
];
