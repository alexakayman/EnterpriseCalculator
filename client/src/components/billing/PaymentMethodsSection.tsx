import {
  PAYMENT_METHODS,
  SHOW_PAYMENT_LOGOS,
} from "../../../../shared/pricing-config";

interface PaymentMethodsSectionProps {
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
}

export function PaymentMethodsSection({
  paymentMethod,
  onPaymentMethodChange,
}: PaymentMethodsSectionProps) {
  return (
    <div>
      <div className="text-sm font-medium text-muted-foreground mb-3">
        Payment Method
      </div>
      <div className="space-y-2">
        {PAYMENT_METHODS.map((method) => (
          <div
            key={method.id}
            className={`border rounded-lg p-3 cursor-pointer transition-colors ${
              paymentMethod === method.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => onPaymentMethodChange(method.id)}
          >
            <div className="flex flex-row items-start justify-between">
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex flex-col gap-1">
                  <div className="font-medium text-foreground text-sm">
                    {method.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {method.description}
                  </div>
                </div>
                {SHOW_PAYMENT_LOGOS && method.logoPath && (
                  <div className="mt-2">
                    <img
                      src={method.logoPath}
                      alt={`${method.name} logo`}
                      className="h-6 w-auto object-contain"
                    />
                  </div>
                )}
              </div>
              <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center ml-3">
                {paymentMethod === method.id && (
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
