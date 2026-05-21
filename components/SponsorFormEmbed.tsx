// components/SponsorFormEmbed.tsx
'use client';

import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';

const FORM_EMBED_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdlYAIAX4qS_ElPS7oFiqoGedZPdnTdHIFPhQSSBZWH_t949A/viewform?embedded=true';
const TIER_ENTRY = 'entry.366340186';
const COST_ENTRY = 'entry.1013453428';

interface SponsorFormCtx {
  selectTier: (value: string) => void;
  selectCost: (value: string) => void;
}

const Ctx = createContext<{
  state: SponsorFormCtx;
  tierValue: string | null;
  costValue: string | null;
  embedRef: RefObject<HTMLDivElement | null>;
} | null>(null);

export function SponsorFormProvider({ children }: { children: ReactNode }) {
  const [tierValue, setTierValue] = useState<string | null>(null);
  const [costValue, setCostValue] = useState<string | null>(null);
  const embedRef = useRef<HTMLDivElement>(null);

  const scrollToEmbed = () => {
    embedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const state: SponsorFormCtx = {
    selectTier: (value) => {
      setTierValue(value);
      scrollToEmbed();
    },
    selectCost: (value) => {
      setCostValue(value);
      scrollToEmbed();
    },
  };

  return (
    <Ctx.Provider value={{ state, tierValue, costValue, embedRef }}>
      {children}
    </Ctx.Provider>
  );
}

export function useSponsorForm() {
  return useContext(Ctx);
}

interface SponsorFormEmbedProps {
  title: string;
}

export function SponsorFormEmbed({ title }: SponsorFormEmbedProps) {
  const ctx = useSponsorForm();

  const params = new URLSearchParams();
  if (ctx?.tierValue) params.set(TIER_ENTRY, ctx.tierValue);
  if (ctx?.costValue) params.set(COST_ENTRY, ctx.costValue);
  const query = params.toString();
  const src = query ? `${FORM_EMBED_URL}&${query}` : FORM_EMBED_URL;

  return (
    <div
      ref={ctx?.embedRef}
      className="not-prose my-8 flex justify-center scroll-mt-8"
    >
      <iframe
        src={src}
        title={title}
        width={640}
        height={1400}
        loading="lazy"
        className="w-full max-w-[640px] border-0 bg-white rounded-lg shadow-sm"
      >
        Loading…
      </iframe>
    </div>
  );
}
