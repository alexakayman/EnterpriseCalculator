import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users } from "lucide-react";
import {
  MINIMUM_SEATS,
  SEAT_PRICING_TIERS,
  getSeatPrice,
  getTotalSeatsPrice,
  getAnnualSeatsPrice,
} from "../../../shared/pricing-config";

interface SeatsConfigurationProps {
  seats: number;
  onSeatsChange: (seats: number) => void;
}

export default function SeatsConfiguration({
  seats,
  onSeatsChange,
}: SeatsConfigurationProps) {
  const monthlySeatPrice = getSeatPrice(seats);
  const monthlyTotal = getTotalSeatsPrice(seats);
  const annualTotal = getAnnualSeatsPrice(seats);

  // Find current tier for display
  const currentTier = SEAT_PRICING_TIERS.find(
    (tier) => seats >= tier.minSeats && seats <= tier.maxSeats
  );

  return (
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
                onSeatsChange(
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
              Minimum {MINIMUM_SEATS} seat required
            </p>
          </div>
          <div>
            <Label className="text-sm font-medium text-foreground mb-2 block">
              Base Seat Price (Monthly)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-muted-foreground">
                $
              </span>
              <Input
                value={monthlySeatPrice}
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

        <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
            Monthly Pricing Tiers
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {SEAT_PRICING_TIERS.map((tier, index) => (
              <div
                key={index}
                className={`p-2 rounded ${
                  currentTier === tier
                    ? "bg-blue-100 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800"
                    : "bg-white dark:bg-gray-800"
                }`}
              >
                <div className="font-medium">
                  {tier.minSeats === 1 && tier.maxSeats === 3
                    ? "1-3 seats"
                    : tier.maxSeats === Infinity
                    ? `${tier.minSeats}+ seats`
                    : `${tier.minSeats}-${tier.maxSeats} seats`}
                </div>
                <div className="text-muted-foreground">
                  ${tier.pricePerSeat}/seat/month
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
