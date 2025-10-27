import { writeFileSync, mkdirSync, readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import GithubSlugger from 'github-slugger'
import matter from 'gray-matter'
import siteMetadata from '../data/siteMetadata.js'

const tagData = JSON.parse(readFileSync('./app/tag-data.json', 'utf8'))

// Simple HTML entity escaping for RSS/XML
function escape(unsafe) {
  if (!unsafe) return ''
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function getAllMdxFiles(dir) {
  const files = []
  const items = readdirSync(dir, { withFileTypes: true })

  for (const item of items) {
    if (item.isDirectory()) {
      files.push(...getAllMdxFiles(join(dir, item.name)))
    } else if (item.name.endsWith('.mdx') || item.name.endsWith('.md')) {
      files.push(join(dir, item.name))
    }
  }

  return files
}

function parseBlogPosts() {
  const blogDir = './data/blog'
  const mdxFiles = getAllMdxFiles(blogDir)
  const posts = []

  mdxFiles.forEach((filePath) => {
    const fileContent = readFileSync(filePath, 'utf8')
    const { data } = matter(fileContent)

    if (data.draft !== true) {
      // Extract slug from filepath
      const slug = filePath
        .replace(blogDir + '/', '')
        .replace(/\.(mdx|md)$/, '')

      posts.push({
        slug,
        title: data.title,
        date: data.date,
        summary: data.summary,
        tags: data.tags || [],
      })
    }
  })

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

const generateRssItem = (config, post) => `
  <item>
    <guid>${config.siteUrl}/blog/${post.slug}</guid>
    <title>${escape(post.title)}</title>
    <link>${config.siteUrl}/blog/${post.slug}</link>
    ${post.summary && `<description>${escape(post.summary)}</description>`}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${config.email} (${config.author})</author>
    ${post.tags && post.tags.map((t) => `<category>${t}</category>`).join('')}
  </item>
`

const generateRss = (config, posts, page = 'feed.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(config.title)}</title>
      <link>${config.siteUrl}/blog</link>
      <description>${escape(config.description)}</description>
      <language>${config.language}</language>
      <managingEditor>${config.email} (${config.author})</managingEditor>
      <webMaster>${config.email} (${config.author})</webMaster>
      ${posts.length > 0 ? `<lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>` : ''}
      <atom:link href="${config.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map((post) => generateRssItem(config, post)).join('')}
    </channel>
  </rss>
`

async function generateRSS(config, allBlogs, page = 'feed.xml') {
  const publishPosts = allBlogs.filter((post) => post.draft !== true)
  // RSS for blog post
  if (publishPosts.length > 0) {
    const rss = generateRss(config, publishPosts)
    writeFileSync(`./public/${page}`, rss)
  }

  if (publishPosts.length > 0) {
    for (const tag of Object.keys(tagData)) {
      const filteredPosts = allBlogs.filter((post) =>
        post.tags.map((t) => GithubSlugger.slug(t)).includes(tag)
      )
      if (filteredPosts.length > 0) {
        const rss = generateRss(config, filteredPosts, `tags/${tag}/${page}`)
        const rssPath = `public/tags/${tag}`
        mkdirSync(rssPath, { recursive: true })
        writeFileSync(`public/tags/${tag}/${page}`, rss)
      }
    }
  }
}

const allBlogs = parseBlogPosts()
generateRSS(siteMetadata, allBlogs)
console.log('RSS feed generated successfully')
