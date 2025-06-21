import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Users, Settings, Calculator, Phone } from "lucide-react";
import {
  DELIVERABLES,
  BILLING_OPTIONS,
  PAYMENT_METHODS,
  SEAT_PRICE_MONTHLY,
  MINIMUM_SEATS,
  SETUP_TRAINING_FEE,
  SIGNING_FEE_PERCENTAGE,
  type Deliverable,
  type BillingOption,
  type PaymentMethod,
} from "../../../shared/pricing-config";

export default function PricingCalculator() {
  const [seats, setSeats] = useState(MINIMUM_SEATS);
  const [selectedDeliverables, setSelectedDeliverables] = useState<string[]>(
    []
  );
  const [billingOption, setBillingOption] = useState("monthly");
  const [paymentMethod, setPaymentMethod] = useState("ach");

  const seatPrice = SEAT_PRICE_MONTHLY;
  const monthlyTotal = seats * seatPrice;
  const annualTotal = monthlyTotal * 12;
  const signingFee =
    annualTotal * (SIGNING_FEE_PERCENTAGE / 100) + SETUP_TRAINING_FEE;

  const deliverablesTotal = selectedDeliverables.reduce((total, id) => {
    const deliverable = DELIVERABLES.find((d) => d.id === id);
    return total + (deliverable?.price || 0);
  }, 0);

  const calculateBillingAmount = (optionId: string) => {
    const option = BILLING_OPTIONS.find((opt) => opt.id === optionId);
    if (!option) return monthlyTotal;

    const discountMultiplier = 1 - option.discountPercentage / 100;

    switch (option.paymentSchedule) {
      case "monthly":
        return monthlyTotal;
      case "quarterly":
        return (annualTotal * discountMultiplier) / 4;
      case "annual":
        return annualTotal * discountMultiplier;
      default:
        return monthlyTotal;
    }
  };

  const calculateFirstYearTotal = () => {
    const billingOpt = BILLING_OPTIONS.find((opt) => opt.id === billingOption);
    const discountMultiplier = billingOpt
      ? 1 - billingOpt.discountPercentage / 100
      : 1;

    let seatCost;
    if (billingOpt?.paymentSchedule === "monthly") {
      seatCost = annualTotal; // Monthly for first year
    } else {
      seatCost = annualTotal * discountMultiplier;
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

  const handleDeliverableChange = (deliverableId: string, checked: boolean) => {
    if (checked) {
      setSelectedDeliverables((prev) => [...prev, deliverableId]);
    } else {
      setSelectedDeliverables((prev) =>
        prev.filter((id) => id !== deliverableId)
      );
    }
  };

  const getSavings = () => {
    const option = BILLING_OPTIONS.find((opt) => opt.id === billingOption);
    return option ? annualTotal * (option.discountPercentage / 100) : 0;
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
            Enterprise Pricing Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            An enterprise pricing calculator with advancing billing, one-time
            deliverables, and payment method toggles.
          </p>
        </div>

        {/* Enterprise Configuration Section */}
        <div className="max-w-4xl mx-auto gap-8">
          {/* Billing Summary */}
          <Card className="mt-8 mb-8 border border-border bg-card shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground flex items-center">
                <Calculator className="mr-3 h-5 w-5" />
                Billing Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-2">
                      Upfront Signing Confirmation
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">
                      10% of annual seat cost + setup fee.
                    </div>
                    <div className="text-lg font-semibold text-foreground">
                      ${signingFee.toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-2">
                      Optional Deliverables
                    </div>
                    <div className="text-lg font-semibold text-foreground">
                      ${deliverablesTotal.toLocaleString()}
                    </div>
                  </div>

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
                          onClick={() => setPaymentMethod(method.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-foreground text-sm">
                                {method.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {method.description}
                              </div>
                            </div>
                            <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                              {paymentMethod === method.id && (
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    Billing Options
                  </div>

                  {BILLING_OPTIONS.map((option) => (
                    <div
                      key={option.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        billingOption === option.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setBillingOption(option.id)}
                    >
                      <div className="font-medium text-foreground text-sm">
                        {option.name}
                        {option.discountPercentage > 0 &&
                          ` (${option.discountPercentage}% off)`}
                      </div>
                      <div className="text-lg font-bold text-foreground">
                        $
                        {Math.round(
                          calculateBillingAmount(option.id)
                        ).toLocaleString()}
                        /
                        {option.paymentSchedule === "quarterly"
                          ? "quarter"
                          : option.paymentSchedule === "annual"
                          ? "year"
                          : "month"}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="bg-foreground text-background rounded-lg p-4">
                    <div className="text-sm opacity-90 mb-1">
                      Total First Year Cost
                    </div>
                    <div className="text-2xl font-bold">
                      ${Math.round(calculateFirstYearTotal()).toLocaleString()}
                    </div>
                    <div className="text-xs opacity-75 mt-1">
                      Seats + Signing Fee + Deliverables +{" "}
                      {PAYMENT_METHODS.find((m) => m.id === paymentMethod)
                        ?.name || "Payment Fee"}
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Sales Team
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Seats Configuration */}
            <Card className="border border-border bg-card shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground flex items-center">
                  <Users className="mr-3 h-5 w-5" />
                  Seats Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="seats"
                      className="text-sm font-medium text-foreground mb-2 block"
                    >
                      Number of Seats
                    </Label>
                    <Input
                      id="seats"
                      type="number"
                      value={seats}
                      onChange={(e) =>
                        setSeats(
                          Math.max(
                            MINIMUM_SEATS,
                            parseInt(e.target.value) || MINIMUM_SEATS
                          )
                        )
                      }
                      min={MINIMUM_SEATS}
                      className="border-input"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Minimum {MINIMUM_SEATS} seats required
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">
                      Seat Price (Monthly)
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-muted-foreground">
                        $
                      </span>
                      <Input
                        value={seatPrice}
                        readOnly
                        className="pl-8 bg-muted border-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Total Monthly
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      ${monthlyTotal.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Total Annual
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      ${annualTotal.toLocaleString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deliverables Section */}
            <Card className="border border-border bg-card shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground flex items-center">
                  <Settings className="mr-3 h-5 w-5" />
                  Deliverables & Add-ons
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {DELIVERABLES.map((deliverable) => (
                    <div
                      key={deliverable.id}
                      className={`flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer ${
                        selectedDeliverables.includes(deliverable.id)
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                      onClick={() =>
                        handleDeliverableChange(
                          deliverable.id,
                          !selectedDeliverables.includes(deliverable.id)
                        )
                      }
                    >
                      <div className="flex-1">
                        <div className="font-medium text-foreground text-sm mb-1">
                          {deliverable.name}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {deliverable.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-foreground text-sm">
                          ${deliverable.price.toLocaleString()}
                        </span>
                        <Checkbox
                          id={deliverable.id}
                          checked={selectedDeliverables.includes(
                            deliverable.id
                          )}
                          onCheckedChange={(checked) =>
                            handleDeliverableChange(
                              deliverable.id,
                              checked as boolean
                            )
                          }
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      Selected Deliverables Total
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      ${deliverablesTotal.toLocaleString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
