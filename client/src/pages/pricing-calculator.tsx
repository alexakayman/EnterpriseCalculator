import { useState } from "react";
import {
  DELIVERABLES,
  MINIMUM_SEATS,
  CLIENT_NAME,
  type Deliverable,
} from "../../../shared/pricing-config";
import EnterprisePromises from "@/components/EnterprisePromises";
import BillingSummary from "@/components/BillingSummary";
import SeatsConfiguration from "@/components/SeatsConfiguration";
import Deliverables from "@/components/Deliverables";
import Documentation from "@/components/Documentation";
import { PrintSection } from "@/components/PDFExport";

export default function PricingCalculator() {
  const [seats, setSeats] = useState(MINIMUM_SEATS);
  const [selectedDeliverables, setSelectedDeliverables] = useState<string[]>(
    []
  );
  const [billingOption, setBillingOption] = useState("monthly");
  const [paymentMethod, setPaymentMethod] = useState("ach");

  const deliverablesTotal = selectedDeliverables.reduce((total, id) => {
    const deliverable = DELIVERABLES.find((d) => d.id === id);
    return total + (deliverable?.price || 0);
  }, 0);

  const handleDeliverableChange = (deliverableId: string, checked: boolean) => {
    if (checked) {
      setSelectedDeliverables((prev) => [...prev, deliverableId]);
    } else {
      setSelectedDeliverables((prev) =>
        prev.filter((id) => id !== deliverableId)
      );
    }
  };

  return (
    <div className="min-h-screen py-12 px-6 bg-background">
      <div className="w-full">
        {/* Header */}
        <PrintSection pageBreak="after">
          <div className="text-center mb-2">
            <h1 className="text-5xl font-bold text-foreground mb-2 leading-tight">
              ACME {"<>"} {CLIENT_NAME}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A B2B SaaS complex price scaling quote generator.
            </p>
          </div>
        </PrintSection>

        {/* Enterprise Configuration Section */}
        <div className="w-full gap-4">
          {/* Billing Summary */}
          <PrintSection pageBreak="inside-avoid">
            <BillingSummary
              seats={seats}
              selectedDeliverables={selectedDeliverables}
              billingOption={billingOption}
              paymentMethod={paymentMethod}
              onBillingOptionChange={setBillingOption}
              onPaymentMethodChange={setPaymentMethod}
              deliverablesTotal={deliverablesTotal}
            />
          </PrintSection>

          <div className="grid lg:grid-cols-2 gap-4 mb-4">
            {/* Seats Configuration */}
            <PrintSection pageBreak="inside-avoid">
              <SeatsConfiguration seats={seats} onSeatsChange={setSeats} />
            </PrintSection>

            {/* Deliverables Section */}
            <PrintSection pageBreak="inside-avoid">
              <Deliverables
                selectedDeliverables={selectedDeliverables}
                onDeliverableChange={handleDeliverableChange}
                deliverablesTotal={deliverablesTotal}
              />
            </PrintSection>
          </div>

          {/* Enterprise Promises Section */}
          <PrintSection pageBreak="before">
            <EnterprisePromises />
          </PrintSection>

          {/* Documentation Section */}
          <PrintSection pageBreak="before">
            <Documentation />
          </PrintSection>
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        2025, ACME Inc. All rights reserved. Do not distribute. Pricing varies
        per customer and quotes are only valid for a 30 day period. Please
        contact your ACME POC with questions.
      </p>
    </div>
  );
}
