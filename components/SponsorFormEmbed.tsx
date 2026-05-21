// components/SponsorFormEmbed.tsx
const FORM_EMBED_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdlYAIAX4qS_ElPS7oFiqoGedZPdnTdHIFPhQSSBZWH_t949A/viewform?embedded=true';

interface SponsorFormEmbedProps {
  title: string;
}

export function SponsorFormEmbed({ title }: SponsorFormEmbedProps) {
  return (
    <div className="not-prose my-8 flex justify-center">
      <iframe
        src={FORM_EMBED_URL}
        title={title}
        width={640}
        height={1266}
        loading="lazy"
        className="w-full max-w-[640px] border-0 bg-white rounded-lg shadow-sm"
      >
        Loading…
      </iframe>
    </div>
  );
}
