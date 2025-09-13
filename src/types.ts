
export type Legend = {
    pickUp: string;
    return: string;
    pickUpLocation?: string;
    returnLocation?: string
}
export type FareRules = {
    cancellation?: { freeUntilHours?: number; feeAfter?: string };
    changes?: string;
    fuelPolicy?: string;
    mileage?: { limitPerDay?: number; excessPerMile?: string };
    deposit?: string;
    age?: string;
    insurance?: string[];
    extras?: { name: string; price?: string }[];
};
// src/types.ts
export type Car = {
    id: string
    vendor: string
    vendorCode?: string
    name: string
    code?: string
    codeContext?: string
    airConditionInd?: boolean
    transmission?: string
    fuelType?: string
    driveType?: string
    passengerQuantity?: string | number
    baggageQuantity?: string | number
    doors?: string | number
    pictureURL: string
    price: number
    currency: string
  }
  