interface SigningFeeSectionProps {
  signingFee: number;
}

export function SigningFeeSection({ signingFee }: SigningFeeSectionProps) {
  return (
    <div>
      <div className="text-sm text-muted-foreground mb-1">
        10% of annual seat cost + setup fee.
      </div>
      <div className="text-lg font-semibold text-foreground">
        ${signingFee.toLocaleString()}
      </div>
    </div>
  );
}
