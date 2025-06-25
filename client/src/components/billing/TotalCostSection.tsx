import { PAYMENT_METHODS } from "../../../../shared/pricing-config";

interface TotalCostSectionProps {
  totalCost: number;
  paymentMethod: string;
}

export function TotalCostSection({
  totalCost,
  paymentMethod,
}: TotalCostSectionProps) {
  const selectedPaymentMethod = PAYMENT_METHODS.find(
    (m) => m.id === paymentMethod
  );

  return (
    <div className="bg-foreground text-background rounded-lg p-6 flex-1 flex flex-col justify-center">
      <div className="text-sm opacity-90 mb-2">Total First Year Cost</div>
      <div className="text-4xl font-bold mb-2">
        ${Math.round(totalCost).toLocaleString()}
      </div>
      <div className="text-xs opacity-75">
        Seats + Signing Fee + Deliverables +{" "}
        {selectedPaymentMethod?.name || "Payment Fee"}
      </div>
    </div>
  );
}
