import { writeFileSync, readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import GithubSlugger from 'github-slugger'
import matter from 'gray-matter'

const isProduction = process.env.NODE_ENV === 'production'
const blogDir = './data/blog'

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

function createTagCount() {
  const tagCount = {}
  const mdxFiles = getAllMdxFiles(blogDir)

  mdxFiles.forEach((filePath) => {
    const fileContent = readFileSync(filePath, 'utf8')
    const { data } = matter(fileContent)

    if (data.tags && (!isProduction || data.draft !== true)) {
      data.tags.forEach((tag) => {
        const formattedTag = GithubSlugger.slug(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })

  writeFileSync('./app/tag-data.json', JSON.stringify(tagCount))
  console.log(`Generated tag data for ${Object.keys(tagCount).length} tags`)
}

createTagCount()
