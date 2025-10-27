import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// Remark/Rehype plugins (reusing our existing ones)
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypePrismPlus from 'rehype-prism-plus';

// Our custom plugins
import { remarkCodeTitles } from './lib/mdx-plugins/remark-code-title.ts';
import { remarkImgToJsx } from './lib/mdx-plugins/remark-img-to-jsx.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://curt-mitch.com',
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      configFile: './tailwind.config.js',
    }),
  ],
  markdown: {
    remarkPlugins: [
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
    ],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeKatex,
      [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
    ],
    shikiConfig: {
      theme: 'github-dark',
    },
  },
  // Output to a different directory so we don't conflict with Next.js
  outDir: './dist-astro',
  // Use a different port for dev server
  server: {
    port: 4321,
  },
});
