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
}

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  feeType: 'fixed' | 'percentage';
  feeAmount: number;
}

export const SEAT_PRICE_MONTHLY = 75;
export const MINIMUM_SEATS = 30;
export const SETUP_TRAINING_FEE = 15000;

export const DELIVERABLES: Deliverable[] = [
  {
    id: "multilingual",
    name: "Multi-Lingual Integration",
    description: "Full localization support for global deployment",
    price: 10000,
  },
  {
    id: "phi",
    name: "PHI Compliance Integration",
    description: "Protected Health Information compliance setup",
    price: 25000,
  },
  {
    id: "hipaa",
    name: "HIPAA Compliance Integration", 
    description: "Complete HIPAA compliance implementation",
    price: 25000,
  },
  {
    id: "whitelabel",
    name: "White Label Fee",
    description: "Complete branding customization and removal of our branding",
    price: 50000,
  },
];

export const BILLING_OPTIONS: BillingOption[] = [
  {
    id: "monthly",
    name: "Monthly Pricing",
    description: "Billed monthly",
    discountPercentage: 0,
    paymentSchedule: "monthly",
  },
  {
    id: "quarterly",
    name: "Quarterly Installments",
    description: "5% off annual (4 payments)",
    discountPercentage: 5,
    paymentSchedule: "quarterly",
  },
  {
    id: "annual",
    name: "Annual Upfront",
    description: "10% off annual",
    discountPercentage: 10,
    paymentSchedule: "annual",
  },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "ach",
    name: "ACH Transfer",
    description: "$5 processing fee",
    feeType: "fixed",
    feeAmount: 5,
  },
  {
    id: "credit",
    name: "Credit Card",
    description: "3% processing fee",
    feeType: "percentage",
    feeAmount: 3,
  },
];

export const SIGNING_FEE_PERCENTAGE = 10; // 10% of annual seat cost