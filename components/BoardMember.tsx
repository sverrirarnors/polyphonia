// components/BoardMember.tsx
import Image from 'next/image';

interface BoardMemberProps {
  name: string;
  role: string;
  image?: string;
}

export function BoardMember({ name, role, image }: BoardMemberProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-32 h-32 mb-3 rounded-full overflow-hidden bg-stone-300">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl text-neutral-500">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <h3 className="font-semibold text-neutral-900">{name}</h3>
      <p className="text-sm text-neutral-700">{role}</p>
    </div>
  );
}

interface BoardGridProps {
  children: React.ReactNode;
}

export function BoardGrid({ children }: BoardGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 my-8">
      {children}
    </div>
  );
}
