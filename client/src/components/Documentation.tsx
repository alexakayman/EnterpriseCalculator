import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";
import { VENDOR_INFO } from "../../../shared/pricing-config";

export default function Documentation() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Card className="mb-8 border border-border bg-gradient-to-r from-primary/5 to-primary/10 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground text-center">
          Vendor Documentation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-3">
          {VENDOR_INFO.map((info, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors cursor-pointer group"
              onClick={() => copyToClipboard(info.value, info.label)}
              title={`Click to copy ${info.label}`}
            >
              <div>
                <p className="font-semibold text-foreground text-sm">
                  {info.label}:
                </p>
                <p className="text-sm text-muted-foreground">{info.value}</p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                {copiedField === info.label ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
