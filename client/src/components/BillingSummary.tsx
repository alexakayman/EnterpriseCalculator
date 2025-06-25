import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Download } from "lucide-react";
import {
  BILLING_OPTIONS,
  PAYMENT_METHODS,
  SETUP_TRAINING_FEE,
  SIGNING_FEE_PERCENTAGE,
  getAnnualSeatsPrice,
  getBillingOptionPrice,
  getTotalSeatsPrice,
  getSeatPrice,
  type BillingOption,
  type PaymentMethod,
} from "../../../shared/pricing-config";
import { usePDFExport } from "./PDFExport";
import { SigningFeeSection } from "./billing/SigningFeeSection";
import { DeliverablesSection } from "./billing/DeliverablesSection";
import { PaymentMethodsSection } from "./billing/PaymentMethodsSection";
import { BillingPlansSection } from "./billing/BillingPlansSection";
import { TotalCostSection } from "./billing/TotalCostSection";

interface BillingSummaryProps {
  seats: number;
  selectedDeliverables: string[];
  billingOption: string;
  paymentMethod: string;
  onBillingOptionChange: (option: string) => void;
  onPaymentMethodChange: (method: string) => void;
  deliverablesTotal: number;
}

export default function BillingSummary({
  seats,
  selectedDeliverables,
  billingOption,
  paymentMethod,
  onBillingOptionChange,
  onPaymentMethodChange,
  deliverablesTotal,
}: BillingSummaryProps) {
  const { exportToPDF } = usePDFExport();

  const monthlyTotal = getTotalSeatsPrice(seats);
  const annualTotal = getAnnualSeatsPrice(seats);
  const signingFee =
    annualTotal * (SIGNING_FEE_PERCENTAGE / 100) + SETUP_TRAINING_FEE;

  const calculateFirstYearTotal = () => {
    const billingOpt = BILLING_OPTIONS.find((opt) => opt.id === billingOption);
    if (!billingOpt) return 0;

    let seatCost;
    if (billingOpt.paymentSchedule === "monthly") {
      // For monthly billing, multiply by 12 to get first year total
      seatCost = getBillingOptionPrice(seats, billingOption) * 12;
    } else if (billingOpt.paymentSchedule === "quarterly") {
      // For quarterly billing, multiply by 4 to get first year total
      seatCost = getBillingOptionPrice(seats, billingOption) * 4;
    } else {
      // For annual billing, it's already the full year
      seatCost = getBillingOptionPrice(seats, billingOption);
    }

    const subtotal =
      seatCost + signingFee + deliverablesTotal + SETUP_TRAINING_FEE;

    // Apply payment method fees
    const paymentOpt = PAYMENT_METHODS.find(
      (method) => method.id === paymentMethod
    );
    if (!paymentOpt) return subtotal;

    if (paymentOpt.feeType === "fixed") {
      return subtotal + paymentOpt.feeAmount;
    } else if (paymentOpt.feeType === "percentage") {
      return subtotal * (1 + paymentOpt.feeAmount / 100);
    }

    return subtotal;
  };

  const handleExportPDF = () => {
    exportToPDF({
      filename: `ACME-quote-${new Date().toISOString().split("T")[0]}.pdf`,
      format: "A4",
      orientation: "portrait",
    });
  };

  return (
    <Card className="mt-8 mb-8 border border-border bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground flex items-center">
          <Calculator className="mr-3 h-5 w-5" />
          Billing Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6 h-full">
          <div className="space-y-4">
            <SigningFeeSection signingFee={signingFee} />
            <DeliverablesSection deliverablesTotal={deliverablesTotal} />
            <PaymentMethodsSection
              paymentMethod={paymentMethod}
              onPaymentMethodChange={onPaymentMethodChange}
            />
          </div>

          <BillingPlansSection
            seats={seats}
            billingOption={billingOption}
            onBillingOptionChange={onBillingOptionChange}
          />

          <div className="flex flex-col h-full">
            <TotalCostSection
              totalCost={calculateFirstYearTotal()}
              paymentMethod={paymentMethod}
            />
            <Button
              onClick={handleExportPDF}
              className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Download className="mr-2 h-4 w-4" />
              Exported as PDF
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
