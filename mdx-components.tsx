import type { MDXComponents } from 'mdx/types';
import { BoardMember, BoardGrid } from '@/components/BoardMember';
import { TableOfContents } from '@/components/TableOfContents';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    BoardMember,
    BoardGrid,
    TableOfContents,
    ...components,
  };
}
