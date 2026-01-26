// components/Footer.tsx
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('Footer');

  const sponsors = [
    {
      name: 'AKI',
      logo: '/images/layout/aki_logo.svg',
      url: 'https://aki-zh.ch',
    },
    {
      name: 'VSETH',
      logo: '/images/layout/vseth_logo.svg',
      url: 'https://vseth.ethz.ch/',
    },
    {
      name: 'VSUZH',
      logo: '/images/layout/vsuzh_logo.svg',
      url: 'https://www.vsuzh.ch/',
    },
    {
      name: 'UZH',
      logo: '/images/layout/uzh_logo.svg',
      url: 'https://www.uzh.ch/',
    },
  ];

  return (
    <footer className="bg-stone-600 text-white mt-32">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Sponsors Section */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-stone-200 mb-6 text-center">
            {t('supportedBy')}
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {sponsors.map((sponsor) => (
              <a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-75"
                aria-label={sponsor.name}
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="h-16 md:h-20 w-auto"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-stone-700 text-center">
          <p className="text-sm text-stone-300">
            © {new Date().getFullYear()} Universitätsorchester Polyphonia Zürich
          </p>
        </div>
      </div>
    </footer>
  );
}
