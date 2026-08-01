// contexts/WaitlistContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

const WAITLIST_ENDPOINT = 'https://script.google.com/macros/s/AKfycby8kJwvrxHUNHaVIWTDlJg4GJ3H-VmQxZLsQGu_hKGp4UG7qJSgE0m0L3iB4pCuTf5P/exec';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface WaitlistContextValue {
  isOpen: boolean;
  name: string;
  email: string;
  status: Status;
  error: string;
  anchorEl: HTMLElement | null;
  open: (anchor?: HTMLElement | null) => void;
  close: () => void;
  setName: (v: string) => void;
  setEmail: (v: string) => void;
  submit: (e: React.FormEvent) => void;
}

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export const WaitlistProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = (anchor?: HTMLElement | null) => {
    setAnchorEl(anchor ?? null);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setAnchorEl(null);
    setTimeout(() => {
      setStatus('idle');
      setName('');
      setEmail('');
      setError('');
    }, 200);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setStatus('loading');
    setError('');

    try {
      await fetch(WAITLIST_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });

      setStatus('success');
      setTimeout(() => {
        setIsOpen(false);
        setAnchorEl(null);
        setStatus('idle');
        setName('');
        setEmail('');
      }, 2200);
    } catch (err) {
      setStatus('error');
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <WaitlistContext.Provider
      value={{ isOpen, name, email, status, error, anchorEl, open, close, setName, setEmail, submit }}
    >
      {children}
    </WaitlistContext.Provider>
  );
};

export const useWaitlist = () => {
  const ctx = useContext(WaitlistContext);
  if (!ctx) throw new Error('useWaitlist must be used within WaitlistProvider');
  return ctx;
};