import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  Headphones,
  BarChart3,
  Key,
  CreditCard,
  Zap,
  UserCheck,
} from "lucide-react";

export default function EnterprisePromises() {
  const promises = [
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Direct line to founders with immediate response.",
    },
    {
      icon: UserCheck,
      title: "User Provisioning",
      description: "Role-based access control & management.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Post-call analytics & detailed insights.",
    },
    {
      icon: Key,
      title: "Single Sign-On",
      description: "Seamless authentication integration.",
    },
    {
      icon: Shield,
      title: "SOC II and Advanced Security",
      description: "Enterprise-grade security features and compliance.",
    },
    {
      icon: CreditCard,
      title: "Centralized Billing",
      description: "Unified billing & payment management.",
    },
    {
      icon: BarChart3,
      title: "Usage Analytics",
      description: "Comprehensive reporting dashboard.",
    },
    {
      icon: Zap,
      title: "Latest Models",
      description: "Unlimited access to cutting-edge AI models.",
    },
    {
      icon: UserCheck,
      title: "Custom Onboarding",
      description: "Tailored implementation & training.",
    },
  ];

  return (
    <Card className="mb-4 border border-border bg-gradient-to-r from-primary/5 to-primary/10 shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground text-center">
          Enterprise-Grade Features & Support
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promises.map((promise, index) => {
            const IconComponent = promise.icon;
            return (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <IconComponent className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">
                    {promise.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {promise.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
