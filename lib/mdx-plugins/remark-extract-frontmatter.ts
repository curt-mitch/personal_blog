// Note: This plugin is not needed for contentlayer
// Contentlayer already extracts frontmatter using gray-matter
// Keeping a stub for compatibility

export function remarkExtractFrontmatter() {
  return (tree: any, file: any) => {
    // No-op: contentlayer handles frontmatter extraction
    return tree
  }
}
