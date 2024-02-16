interface InfoFieldProps {
  title: string;
  children: React.ReactNode;
}

export function InfoField({ title, children }: InfoFieldProps) {
  return (
    <div>
      <h3 className="text-sm text-muted-foreground mb-2">{title}</h3>
      {children}
    </div>
  );
}
