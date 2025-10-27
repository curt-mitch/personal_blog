import { visit } from 'unist-util-visit'
import GithubSlugger from 'github-slugger'
import { remark } from 'remark'

// Simple toString implementation for AST nodes
function toString(node: any): string {
  if (!node || typeof node !== 'object') return ''

  if (node.value) return node.value
  if (node.alt) return node.alt
  if (node.children) {
    return node.children.map((child: any) => toString(child)).join('')
  }
  if (Array.isArray(node)) {
    return node.map((item) => toString(item)).join('')
  }

  return ''
}

// Remark plugin to extract TOC from headings
export function remarkTocHeadings() {
  return (tree: any, file: any) => {
    const toc: { value: string; url: string; depth: number }[] = []
    const slugger = new GithubSlugger()

    visit(tree, 'heading', (node: any) => {
      const textContent = toString(node)
      toc.push({
        value: textContent,
        url: '#' + slugger.slug(textContent),
        depth: node.depth,
      })
    })

    file.data.toc = toc
  }
}

// Extract TOC headings from markdown string
export async function extractTocHeadings(markdown: string) {
  const vfile = await remark().use(remarkTocHeadings).process(markdown)
  return vfile.data.toc as { value: string; url: string; depth: number }[]
}
