// components/BoardMember.tsx
import Image from 'next/image';

interface BoardMemberProps {
  name: string;
  role: string;
  instrument?: string;
  email?: string;
  image?: string;
}

export function BoardMember({
  name,
  role,
  instrument,
  email,
  image,
}: BoardMemberProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-24 h-24 mb-1 rounded-full overflow-hidden bg-stone-200">
        {image ? (
          <Image src={image} alt={name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-stone-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
      </div>
      <p className="text-sm font-bold text-neutral-800 leading-tight m-0 mb-0.5">
        {role}
      </p>
      <p className="text-sm font-sans text-neutral-900 leading-tight m-0">
        {name}
      </p>
      {instrument && (
        <p className="text-sm text-neutral-600 leading-tight m-0">
          {instrument}
        </p>
      )}
      {email && (
        <a
          href={`mailto:${email}`}
          className="text-sm text-orange-600 hover:text-orange-700 leading-tight block"
        >
          {email}
        </a>
      )}
    </div>
  );
}

interface BoardGridProps {
  children: React.ReactNode;
}

export function BoardGrid({ children }: BoardGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-6">
      {children}
    </div>
  );
}
