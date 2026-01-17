import type { MDXComponents } from 'mdx/types';
import { BoardMember, BoardGrid } from '@/components/BoardMember';
import { TableOfContents } from '@/components/TableOfContents';
import { ProfileImage } from '@/components/ProfileImage';
import Gallery from '@/components/Gallery';
import { Link } from '@/routing';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    BoardMember,
    BoardGrid,
    TableOfContents,
    ProfileImage,
    Gallery,
    Link,
    a: ({ href, children, ...props }) => {
      // External links or anchors use regular <a>
      if (href?.startsWith('http') || href?.startsWith('#') || href?.startsWith('mailto:')) {
        return <a href={href} {...props}>{children}</a>;
      }
      // Internal links use locale-aware Link
      return <Link href={href as any} {...props}>{children}</Link>;
    },
    ...components,
  };
}
