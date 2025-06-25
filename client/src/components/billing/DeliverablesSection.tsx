interface DeliverablesSectionProps {
  deliverablesTotal: number;
}

export function DeliverablesSection({
  deliverablesTotal,
}: DeliverablesSectionProps) {
  return (
    <div>
      <div className="text-sm font-medium text-muted-foreground mb-2">
        Custom Deliverables
      </div>
      <div className="text-lg font-semibold text-foreground">
        ${deliverablesTotal.toLocaleString()}
      </div>
    </div>
  );
}
