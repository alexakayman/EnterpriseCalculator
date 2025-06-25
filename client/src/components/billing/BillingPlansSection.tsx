import { Badge } from "@/components/ui/badge";
import {
  BILLING_OPTIONS,
  getBillingOptionPrice,
  getSeatPrice,
} from "../../../../shared/pricing-config";

interface BillingPlansSectionProps {
  seats: number;
  billingOption: string;
  onBillingOptionChange: (option: string) => void;
}

export function BillingPlansSection({
  seats,
  billingOption,
  onBillingOptionChange,
}: BillingPlansSectionProps) {
  const calculateBillingAmount = (optionId: string) => {
    return getBillingOptionPrice(seats, optionId);
  };

  const calculateSeatPerMonthEquivalent = (optionId: string) => {
    const option = BILLING_OPTIONS.find((opt) => opt.id === optionId);
    if (!option) return getSeatPrice(seats);

    const baseMonthlyPrice = getSeatPrice(seats);

    switch (option.paymentSchedule) {
      case "monthly":
        return baseMonthlyPrice * option.priceMultiplier;
      case "quarterly":
        return baseMonthlyPrice * option.priceMultiplier;
      case "annual":
        return baseMonthlyPrice; // Annual's monthly equivalent is just the base price
      default:
        return baseMonthlyPrice;
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-muted-foreground mb-2">
        Billing Plans
      </div>

      {BILLING_OPTIONS.map((option) => (
        <div
          key={option.id}
          className={`border rounded-lg p-3 cursor-pointer transition-colors ${
            billingOption === option.id
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
          onClick={() => onBillingOptionChange(option.id)}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium text-foreground text-sm">
              {option.name}
              {option.discountPercentage > 0 &&
                ` (${option.discountPercentage}% off)`}
            </div>
            <Badge
              variant={option.style === "Green" ? "Default" : "secondary"}
              className="text-xs"
            >
              {option.tag}
            </Badge>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="text-lg font-bold text-foreground">
              ${Math.round(calculateBillingAmount(option.id)).toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              $
              {Math.round(
                calculateSeatPerMonthEquivalent(option.id)
              ).toLocaleString()}
              /seat per month
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
