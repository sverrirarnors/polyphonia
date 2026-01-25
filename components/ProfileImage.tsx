// components/ProfileImage.tsx
import Image from 'next/image';

interface ProfileImageProps {
  src: string;
  alt: string;
}

export function ProfileImage({ src, alt }: ProfileImageProps) {
  return (
    <div className="float-right ml-6 mb-4 w-64 md:w-80">
      <Image
        src={src}
        alt={alt}
        width={320}
        height={400}
        className="object-cover"
      />
    </div>
  );
}
