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
    return seatCost + signingFee + deliverablesTotal;
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
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-dark-blue mb-4">
            Enterprise Pricing Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Configure your enterprise package with seats and deliverables to see real-time pricing across different billing options.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* Seats Section */}
            <Card className="shadow-lg border-gray-200 overflow-hidden">
              <CardHeader className="bg-primary-blue text-white">
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Users className="mr-3 h-5 w-5" />
                  Seats Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="seats" className="text-sm font-medium text-gray-700 mb-2 block">
                      Number of Seats
                    </Label>
                    <Input
                      id="seats"
                      type="number"
                      value={seats}
                      onChange={(e) => setSeats(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      className="px-4 py-3 border-gray-300 focus:ring-2 focus:ring-primary-blue focus:border-primary-blue"
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Seat Price (Monthly)
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500">$</span>
                      <Input
                        value={seatPrice}
                        readOnly
                        className="pl-8 pr-4 py-3 border-gray-300 bg-gray-50 text-gray-700"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  <div className="bg-light-blue rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-700 mb-1">Total Monthly</div>
                    <div className="text-2xl font-bold primary-blue">
                      ${monthlyTotal.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-light-blue rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-700 mb-1">Total Annual</div>
                    <div className="text-2xl font-bold primary-blue">
                      ${annualTotal.toLocaleString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deliverables Section */}
            <Card className="shadow-lg border-gray-200 overflow-hidden">
              <CardHeader className="bg-secondary-blue text-white">
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Settings className="mr-3 h-5 w-5" />
                  Deliverables & Add-ons
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {deliverables.map((deliverable) => (
                    <div
                      key={deliverable.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <Checkbox
                          id={deliverable.id}
                          checked={selectedDeliverables.includes(deliverable.id)}
                          onCheckedChange={(checked) =>
                            handleDeliverableChange(deliverable.id, checked as boolean)
                          }
                          className="w-5 h-5"
                        />
                        <div>
                          <Label htmlFor={deliverable.id} className="font-medium text-gray-900 cursor-pointer">
                            {deliverable.name}
                          </Label>
                          <p className="text-sm text-gray-600">{deliverable.description}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-gray-900">
                        ${deliverable.price.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="bg-light-blue rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-700 mb-1">
                      Selected Deliverables Total
                    </div>
                    <div className="text-2xl font-bold secondary-blue">
                      ${deliverablesTotal.toLocaleString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Calculator Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-gray-200 overflow-hidden sticky top-8">
              <CardHeader className="bg-gradient-to-r from-primary-blue to-secondary-blue text-white">
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Calculator className="mr-3 h-5 w-5" />
                  Billing Options
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* Signing Confirmation */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    Signing Confirmation & Setup
                  </div>
                  <div className="text-sm text-gray-600 mb-2">10% of annual seat cost</div>
                  <div className="text-lg font-semibold text-gray-900">
                    ${signingFee.toLocaleString()}
                  </div>
                </div>

                {/* One-Time Deliverables */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-700 mb-2">One-Time Deliverables</div>
                  <div className="text-lg font-semibold text-gray-900">
                    ${deliverablesTotal.toLocaleString()}
                  </div>
                </div>

                {/* Billing Options */}
                <RadioGroup value={billingOption} onValueChange={setBillingOption} className="space-y-4">
                  {/* Monthly */}
                  <div className={`border rounded-lg p-4 hover:border-primary-blue hover:bg-light-blue/20 transition-all cursor-pointer ${
                    billingOption === "monthly" ? "border-primary-blue bg-light-blue/20" : "border-gray-200"
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-gray-900">Monthly Pricing</div>
                      <RadioGroupItem value="monthly" />
                    </div>
                    <div className="text-sm text-gray-600 mb-2">Billed monthly</div>
                    <div className="text-xl font-bold primary-blue">
                      ${monthlyTotal.toLocaleString()}/month
                    </div>
                  </div>

                  {/* Quarterly */}
                  <div className={`border rounded-lg p-4 hover:border-primary-blue hover:bg-light-blue/20 transition-all cursor-pointer ${
                    billingOption === "quarterly" ? "border-primary-blue bg-light-blue/20" : "border-gray-200"
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-gray-900">Quarterly Installments</div>
                      <RadioGroupItem value="quarterly" />
                    </div>
                    <div className="text-sm text-gray-600 mb-1">5% off annual (4 payments)</div>
                    <div className="text-sm text-green-600 mb-2">
                      Save ${(annualTotal * 0.05).toLocaleString()}/year
                    </div>
                    <div className="text-xl font-bold primary-blue">
                      ${Math.round((annualTotal * 0.95) / 4).toLocaleString()}/quarter
                    </div>
                  </div>

                  {/* Annual */}
                  <div className={`border rounded-lg p-4 hover:border-primary-blue hover:bg-light-blue/20 transition-all cursor-pointer ${
                    billingOption === "annual" ? "border-primary-blue bg-light-blue/20" : "border-gray-200"
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-gray-900">Annual Upfront</div>
                      <RadioGroupItem value="annual" />
                    </div>
                    <div className="text-sm text-gray-600 mb-1">10% off annual</div>
                    <div className="text-sm text-green-600 mb-2">
                      Save ${(annualTotal * 0.1).toLocaleString()}/year
                    </div>
                    <div className="text-xl font-bold primary-blue">
                      ${(annualTotal * 0.9).toLocaleString()}/year
                    </div>
                  </div>
                </RadioGroup>

                {/* Total Summary */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="bg-gradient-to-r from-primary-blue to-secondary-blue text-white rounded-lg p-4">
                    <div className="text-sm opacity-90 mb-1">Total First Year Cost</div>
                    <div className="text-2xl font-bold">
                      ${calculateFirstYearTotal().toLocaleString()}
                    </div>
                    <div className="text-xs opacity-75 mt-1">Seats + Setup + Deliverables</div>
                  </div>
                </div>

                {/* Contact CTA */}
                <div className="mt-6">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 transition-colors">
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Sales Team
                  </Button>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Get a custom quote and finalize your package
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
