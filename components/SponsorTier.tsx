// components/SponsorTier.tsx
import type { ReactNode } from 'react';

const FORM_BASE_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdlYAIAX4qS_ElPS7oFiqoGedZPdnTdHIFPhQSSBZWH_t949A/viewform?usp=pp_url';
const TIER_ENTRY = 'entry.366340186';
const COST_ENTRY = 'entry.1013453428';

function buildFormUrl(entry: string, value: string) {
  return `${FORM_BASE_URL}&${entry}=${encodeURIComponent(value)}`;
}

const rowBase =
  'flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-5 py-3';
const rowInteractive =
  'hover:bg-stone-100 focus-visible:bg-stone-100 focus-visible:outline-none transition-colors cursor-pointer';

interface SponsorTierProps {
  name: string;
  description: string;
  amount: string;
  formValue?: string;
}

export function SponsorTier({
  name,
  description,
  amount,
  formValue,
}: SponsorTierProps) {
  const inner = (
    <>
      <div className="flex-1 min-w-0">
        <p className="font-serif italic text-lg text-neutral-900 leading-tight m-0">
          {name}
        </p>
        <p className="text-sm text-neutral-700 leading-snug m-0">{description}</p>
      </div>
      <span className="inline-flex items-center justify-center self-start sm:self-center shrink-0 bg-orange-50 text-orange-900 text-sm font-serif italic font-semibold rounded-md px-3 py-1 min-w-[7rem] text-center whitespace-nowrap">
        {amount}
      </span>
    </>
  );

  if (formValue) {
    return (
      <a
        href={buildFormUrl(TIER_ENTRY, formValue)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${rowBase} ${rowInteractive}`}
      >
        {inner}
      </a>
    );
  }
  return <div className={rowBase}>{inner}</div>;
}

export function SponsorTiers({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-6 bg-stone-50 border border-stone-300 rounded-lg shadow-sm divide-y divide-stone-200 overflow-hidden">
      {children}
    </div>
  );
}

interface SponsorCostProps {
  amount: string;
  description: string;
  formValue?: string;
}

const costRowBase = 'flex items-center gap-4 px-5 py-3';

export function SponsorCost({ amount, description, formValue }: SponsorCostProps) {
  const inner = (
    <>
      <span className="inline-flex items-center justify-center shrink-0 bg-orange-50 text-orange-900 text-sm font-serif italic font-semibold rounded-md px-3 py-1 min-w-[5.5rem] text-center whitespace-nowrap">
        {amount}
      </span>
      <span className="text-base text-neutral-800 leading-snug">{description}</span>
    </>
  );

  if (formValue) {
    return (
      <a
        href={buildFormUrl(COST_ENTRY, formValue)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${costRowBase} ${rowInteractive}`}
      >
        {inner}
      </a>
    );
  }
  return <div className={costRowBase}>{inner}</div>;
}

export function SponsorCosts({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-6 bg-stone-50 border border-stone-300 rounded-lg shadow-sm divide-y divide-stone-200 overflow-hidden">
      {children}
    </div>
  );
}
