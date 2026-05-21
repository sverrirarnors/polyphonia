// components/SponsorTier.tsx
'use client';

import type { ReactNode } from 'react';
import { useSponsorForm } from '@/components/SponsorFormEmbed';

const rowBase =
  'flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-5 py-3 w-full text-left';
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
  const ctx = useSponsorForm();

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

  if (formValue && ctx) {
    return (
      <button
        type="button"
        onClick={() => ctx.state.selectTier(formValue)}
        className={`${rowBase} ${rowInteractive}`}
      >
        {inner}
      </button>
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

const costRowBase = 'flex items-center gap-4 px-5 py-3 w-full text-left';

interface SponsorCostProps {
  amount: string;
  description: string;
  formValue?: string;
}

export function SponsorCost({ amount, description, formValue }: SponsorCostProps) {
  const ctx = useSponsorForm();

  const inner = (
    <>
      <span className="inline-flex items-center justify-center shrink-0 bg-orange-50 text-orange-900 text-sm font-serif italic font-semibold rounded-md px-3 py-1 min-w-[5.5rem] text-center whitespace-nowrap">
        {amount}
      </span>
      <span className="text-base text-neutral-800 leading-snug">{description}</span>
    </>
  );

  if (formValue && ctx) {
    return (
      <button
        type="button"
        onClick={() => ctx.state.selectCost(formValue)}
        className={`${costRowBase} ${rowInteractive}`}
      >
        {inner}
      </button>
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
