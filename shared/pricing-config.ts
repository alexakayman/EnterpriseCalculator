export interface Deliverable {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface BillingOption {
  id: string;
  name: string;
  description: string;
  discountPercentage: number;
  paymentSchedule: string;
  priceMultiplier: number; // Multiplier compared to annual's monthly equivalent
  tag: string;
  style: "Default" | "Green";
}

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  feeType: "fixed" | "percentage";
  feeAmount: number;
  logoPath?: string; // Optional path to logo image
}

export const MINIMUM_SEATS = 10;
export const SETUP_TRAINING_FEE = 10000;
export const SIGNING_FEE_PERCENTAGE = 10; // 10% of annual seat cost
const base_price = 300;

// Configuration toggles
export const SHOW_PAYMENT_LOGOS = false; // Toggle to show/hide payment method logos

// Client configuration
export const CLIENT_NAME = "CustomerCo";

// Vendor information
export const VENDOR_INFO = [
  { label: "ACME POC", value: "Alexa Kayman, CRO, alexa@ACME.com" },
  { label: "Client POC", value: "Jeff Bezoz, bezos@jeff.com" },
  { label: "Legal Name", value: "ACME Inc" },
  { label: "Legal Address", value: "100 Amanon St, San Francisco CA 94100" },
  { label: "Company EIN", value: "33-4000000" },
  { label: "Company Email", value: "admin@ACME.com" },
  { label: "Company Phone Number", value: "+1 200-555-6666" },
  { label: "Customer EIN", value: "33-5000000" },
];

export const DELIVERABLES: Deliverable[] = [
  {
    id: "pci-dss",
    name: "PCI DSS Compliance Integration",
    description:
      "Complete Payment Card Industry Data Security Standard compliance setup and certification support.",
    price: 25000,
  },
  {
    id: "fraud-detection",
    name: "Advanced Fraud Detection Engine",
    description:
      "AI-powered real-time fraud detection system with machine learning algorithms and behavioral analysis.",
    price: 35000,
  },
  {
    id: "kyc-aml",
    name: "KYC/AML Compliance Suite",
    description:
      "Know Your Customer and Anti-Money Laundering compliance tools with automated verification workflows.",
    price: 20000,
  },
  {
    id: "penetration-testing",
    name: "Penetration Testing & Vulnerability Assessment",
    description:
      "Comprehensive security testing including automated scans and manual penetration testing.",
    price: 22000,
  },
  {
    id: "custom-security",
    name: "Custom Security Implementation",
    description:
      "Tailored security solution designed for your specific fintech requirements. Minimum $75k.",
    price: 75000,
  },
];

export const BILLING_OPTIONS: BillingOption[] = [
  {
    id: "monthly",
    name: "Monthly",
    description: "Billed monthly (60% premium)",
    discountPercentage: 0,
    paymentSchedule: "monthly",
    priceMultiplier: 1.6, // 60% more expensive than annual's monthly equivalent
    tag: "Most Flexible",
    style: "Default",
  },
  {
    id: "quarterly",
    name: "Quarterly",
    description: "(4 payments, 25% premium)",
    discountPercentage: 0,
    paymentSchedule: "quarterly",
    priceMultiplier: 1.25, // 25% more expensive than annual's monthly equivalent
    tag: "Popular",
    style: "Default",
  },
  {
    id: "annual",
    name: "Annual",
    description: "Annual payment (best value)",
    discountPercentage: 0,
    paymentSchedule: "annual",
    priceMultiplier: 1.0, // Base price (annual's monthly equivalent)
    tag: "Best Value",
    style: "Green",
  },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "ach",
    name: "ACH Transfer",
    description: "$5 processing fee",
    feeType: "fixed",
    feeAmount: 5,
    logoPath: "/images/payment/bank-logos.svg", // Generic bank logos
  },
  {
    id: "credit",
    name: "Credit Card",
    description: "3% processing fee",
    feeType: "percentage",
    feeAmount: 3,
    logoPath: "/images/payment/credit-cards.svg", // Visa, Mastercard, Amex, etc.
  },
];

// Tiered pricing structure - these are now MONTHLY prices per seat
export const SEAT_PRICING_TIERS = [
  { minSeats: 6, maxSeats: 15, pricePerSeat: base_price + 40 },
  { minSeats: 16, maxSeats: 20, pricePerSeat: base_price + 20 },
  { minSeats: 21, maxSeats: 30, pricePerSeat: base_price },
  { minSeats: 31, maxSeats: Infinity, pricePerSeat: base_price - 20 },
];

// Get the monthly price per seat (base price)
export function getSeatPrice(seats: number): number {
  const tier = SEAT_PRICING_TIERS.find(
    (tier) => seats >= tier.minSeats && seats <= tier.maxSeats
  );
  return tier ? tier.pricePerSeat : SEAT_PRICING_TIERS[0].pricePerSeat;
}

// Get the total monthly price for all seats
export function getTotalSeatsPrice(seats: number): number {
  return seats * getSeatPrice(seats);
}

// Get the annual price for all seats (monthly * 12)
export function getAnnualSeatsPrice(seats: number): number {
  return getTotalSeatsPrice(seats) * 12;
}

// Get the annual's monthly equivalent (for comparison)
export function getAnnualMonthlyEquivalent(seats: number): number {
  return getTotalSeatsPrice(seats); // This is now the same as monthly price
}

// Get the price for a specific billing option
export function getBillingOptionPrice(
  seats: number,
  billingOptionId: string
): number {
  const option = BILLING_OPTIONS.find((opt) => opt.id === billingOptionId);
  if (!option) return getTotalSeatsPrice(seats);

  const monthlyPrice = getTotalSeatsPrice(seats);

  switch (option.paymentSchedule) {
    case "monthly":
      return monthlyPrice * option.priceMultiplier;
    case "quarterly":
      return monthlyPrice * option.priceMultiplier * 3; // 3 months worth
    case "annual":
      return monthlyPrice * 12; // 12 months worth at base price
    default:
      return monthlyPrice;
  }
}
