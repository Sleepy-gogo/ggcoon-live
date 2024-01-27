'use client';

import { Button, ButtonProps } from '@/components/ui/button';
import { useState, useContext, createContext } from 'react';

interface HoverableButtonContextProps {
  isMouseOver: boolean;
}

const HoverableButtonContext = createContext<
  HoverableButtonContextProps | undefined
>(undefined);

export const useHoverableButtonContext = () => {
  const context = useContext(HoverableButtonContext);
  if (!context) {
    throw new Error(
      'useHoverableButtonContext must be used within a HoverableButton'
    );
  }
  return context;
};

export function HoverableButton({ children, ...props }: ButtonProps) {
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <HoverableButtonContext.Provider value={{ isMouseOver }}>
      <Button
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
        {...props}
      >
        {children}
      </Button>
    </HoverableButtonContext.Provider>
  );
}

export function HoverableButtonHover({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMouseOver } = useHoverableButtonContext();
  if (!isMouseOver) {
    return null;
  }
  return <>{children}</>;
}

export function HoverableButtonDefault({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMouseOver } = useHoverableButtonContext();
  if (isMouseOver) {
    return null;
  }
  return <>{children}</>;
}
