import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Settings, ChevronDown } from "lucide-react";
import { DELIVERABLES } from "../../../shared/pricing-config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface DeliverablesProps {
  selectedDeliverables: string[];
  onDeliverableChange: (deliverableId: string, checked: boolean) => void;
  deliverablesTotal: number;
}

export default function Deliverables({
  selectedDeliverables,
  onDeliverableChange,
  deliverablesTotal,
}: DeliverablesProps) {
  return (
    <Card className="border border-border bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground flex items-center">
          <Settings className="mr-3 h-5 w-5" />
          Deliverables & Add-ons
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="space-y-2">
          {DELIVERABLES.map((deliverable) => (
            <AccordionItem
              key={deliverable.id}
              value={deliverable.id}
              className={`border rounded-lg hover:bg-muted/50 transition-colors ${
                selectedDeliverables.includes(deliverable.id)
                  ? "border-primary bg-primary/5"
                  : "border-border"
              }`}
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline [&>svg]:hidden">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center flex-1 text-left">
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 mr-2 [&[data-state=open]]:rotate-180" />
                    <div className="font-medium text-foreground text-sm">
                      {deliverable.name}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-foreground text-sm">
                      ${deliverable.price.toLocaleString()}
                    </span>
                    <Checkbox
                      id={deliverable.id}
                      checked={selectedDeliverables.includes(deliverable.id)}
                      onCheckedChange={(checked) =>
                        onDeliverableChange(deliverable.id, checked as boolean)
                      }
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                <p className="text-xs text-muted-foreground">
                  {deliverable.description}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

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
  );
}
