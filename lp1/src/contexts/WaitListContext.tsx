// contexts/WaitlistContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface WaitlistContextValue {
  isOpen: boolean;
  email: string;
  submitted: boolean;
  anchorEl: HTMLElement | null;
  open: (anchor?: HTMLElement | null) => void;
  close: () => void;
  setEmail: (v: string) => void;
  submit: (e: React.FormEvent) => void;
}

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export const WaitlistProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = (anchor?: HTMLElement | null) => {
    setAnchorEl(anchor ?? null);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setAnchorEl(null);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setEmail('');
      setAnchorEl(null);
    }, 2200);
  };

  return (
    <WaitlistContext.Provider value={{ isOpen, email, submitted, anchorEl, open, close, setEmail, submit }}>
      {children}
    </WaitlistContext.Provider>
  );
};

export const useWaitlist = () => {
  const ctx = useContext(WaitlistContext);
  if (!ctx) throw new Error('useWaitlist must be used within WaitlistProvider');
  return ctx;
};