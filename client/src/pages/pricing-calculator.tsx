import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Users, Settings, Calculator, Phone } from "lucide-react";

interface Deliverable {
  id: string;
  name: string;
  description: string;
  price: number;
}

const deliverables: Deliverable[] = [
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
  {
    id: "setup",
    name: "Setup / Training Fee",
    description: "Complete onboarding and team training program",
    price: 15000,
  },
];

export default function PricingCalculator() {
  const [seats, setSeats] = useState(10);
  const [selectedDeliverables, setSelectedDeliverables] = useState<string[]>([]);
  const [billingOption, setBillingOption] = useState("monthly");
  const [paymentMethod, setPaymentMethod] = useState("ach");

  const seatPrice = 75;
  const monthlyTotal = seats * seatPrice;
  const annualTotal = monthlyTotal * 12;
  const signingFee = annualTotal * 0.1;

  const deliverablesTotal = selectedDeliverables.reduce((total, id) => {
    const deliverable = deliverables.find(d => d.id === id);
    return total + (deliverable?.price || 0);
  }, 0);

  const calculateBillingAmount = () => {
    switch (billingOption) {
      case "quarterly":
        return (annualTotal * 0.95) / 4;
      case "annual":
        return annualTotal * 0.9;
      default:
        return monthlyTotal;
    }
  };

  const calculateFirstYearTotal = () => {
    let seatCost;
    switch (billingOption) {
      case "quarterly":
        seatCost = annualTotal * 0.95;
        break;
      case "annual":
        seatCost = annualTotal * 0.9;
        break;
      default:
        seatCost = annualTotal; // Monthly for first year
    }
    const subtotal = seatCost + signingFee + deliverablesTotal;
    
    // Apply payment method fees
    if (paymentMethod === "ach") {
      return subtotal + 5;
    } else if (paymentMethod === "credit") {
      return subtotal * 1.03;
    }
    return subtotal;
  };

  const handleDeliverableChange = (deliverableId: string, checked: boolean) => {
    if (checked) {
      setSelectedDeliverables(prev => [...prev, deliverableId]);
    } else {
      setSelectedDeliverables(prev => prev.filter(id => id !== deliverableId));
    }
  };

  const getSavings = () => {
    switch (billingOption) {
      case "quarterly":
        return annualTotal * 0.05;
      case "annual":
        return annualTotal * 0.1;
      default:
        return 0;
    }
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
            Customize your enterprise package with seats and deliverables to see real-time pricing.
          </p>
        </div>

        {/* Enterprise Configuration Section */}
        <div className="max-w-4xl mx-auto">

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
                    <Label htmlFor="seats" className="text-sm font-medium text-foreground mb-2 block">
                      Number of Seats
                    </Label>
                    <Input
                      id="seats"
                      type="number"
                      value={seats}
                      onChange={(e) => setSeats(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      className="border-input"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-2 block">
                      Seat Price (Monthly)
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-muted-foreground">$</span>
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
                    <div className="text-sm font-medium text-muted-foreground mb-1">Total Monthly</div>
                    <div className="text-2xl font-bold text-foreground">
                      ${monthlyTotal.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm font-medium text-muted-foreground mb-1">Total Annual</div>
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
                  {deliverables.map((deliverable) => (
                    <div
                      key={deliverable.id}
                      className={`flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer ${
                        selectedDeliverables.includes(deliverable.id) 
                          ? "border-primary bg-primary/5" 
                          : "border-border"
                      }`}
                      onClick={() => handleDeliverableChange(deliverable.id, !selectedDeliverables.includes(deliverable.id))}
                    >
                      <div className="flex-1">
                        <div className="font-medium text-foreground text-sm mb-1">
                          {deliverable.name}
                        </div>
                        <p className="text-xs text-muted-foreground">{deliverable.description}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-foreground text-sm">
                          ${deliverable.price.toLocaleString()}
                        </span>
                        <Checkbox
                          id={deliverable.id}
                          checked={selectedDeliverables.includes(deliverable.id)}
                          onCheckedChange={(checked) =>
                            handleDeliverableChange(deliverable.id, checked as boolean)
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

          {/* Billing Summary */}
          <Card className="mt-8 border border-border bg-card shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground flex items-center">
                <Calculator className="mr-3 h-5 w-5" />
                Enterprise Billing Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-2">
                      Signing Confirmation & Setup
                    </div>
                    <div className="text-sm text-muted-foreground mb-1">10% of annual seat cost</div>
                    <div className="text-lg font-semibold text-foreground">
                      ${signingFee.toLocaleString()}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-2">One-Time Deliverables</div>
                    <div className="text-lg font-semibold text-foreground">
                      ${deliverablesTotal.toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-3">Payment Method</div>
                    <div className="space-y-2">
                      <div 
                        className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                          paymentMethod === "ach" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setPaymentMethod("ach")}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-foreground text-sm">ACH Transfer</div>
                            <div className="text-xs text-muted-foreground">$5 processing fee</div>
                          </div>
                          <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                            {paymentMethod === "ach" && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                          </div>
                        </div>
                      </div>
                      
                      <div 
                        className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                          paymentMethod === "credit" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setPaymentMethod("credit")}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-foreground text-sm">Credit Card</div>
                            <div className="text-xs text-muted-foreground">3% processing fee</div>
                          </div>
                          <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
                            {paymentMethod === "credit" && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-sm font-medium text-muted-foreground mb-2">Billing Options</div>
                  
                  <div className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                    billingOption === "monthly" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`} onClick={() => setBillingOption("monthly")}>
                    <div className="font-medium text-foreground text-sm">Monthly Pricing</div>
                    <div className="text-lg font-bold text-foreground">
                      ${monthlyTotal.toLocaleString()}/month
                    </div>
                  </div>
                  
                  <div className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                    billingOption === "quarterly" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`} onClick={() => setBillingOption("quarterly")}>
                    <div className="font-medium text-foreground text-sm">Quarterly (5% off)</div>
                    <div className="text-lg font-bold text-foreground">
                      ${Math.round((annualTotal * 0.95) / 4).toLocaleString()}/quarter
                    </div>
                  </div>
                  
                  <div className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                    billingOption === "annual" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`} onClick={() => setBillingOption("annual")}>
                    <div className="font-medium text-foreground text-sm">Annual (10% off)</div>
                    <div className="text-lg font-bold text-foreground">
                      ${(annualTotal * 0.9).toLocaleString()}/year
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-foreground text-background rounded-lg p-4">
                    <div className="text-sm opacity-90 mb-1">Total First Year Cost</div>
                    <div className="text-2xl font-bold">
                      ${Math.round(calculateFirstYearTotal()).toLocaleString()}
                    </div>
                    <div className="text-xs opacity-75 mt-1">
                      Seats + Setup + Deliverables + {paymentMethod === "ach" ? "ACH Fee" : "3% CC Fee"}
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
        </div>
      </div>
    </div>
  );
}
