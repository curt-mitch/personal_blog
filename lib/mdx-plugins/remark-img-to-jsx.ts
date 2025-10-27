import { visit } from 'unist-util-visit'
import sizeOf from 'image-size'
import fs from 'fs'

// Convert markdown images to Next.js Image component with dimensions
export function remarkImgToJsx() {
  return (tree: any) => {
    visit(
      tree,
      // Only visit p tags that contain an img element
      (node: any) => node.type === 'paragraph' && node.children.some((n: any) => n.type === 'image'),
      (node: any) => {
        const imageNode = node.children.find((n: any) => n.type === 'image')

        // Check if image exists in public directory
        if (fs.existsSync(`${process.cwd()}/public${imageNode.url}`)) {
          const dimensions = sizeOf(`${process.cwd()}/public${imageNode.url}`)

          // Convert to JSX Image component
          imageNode.type = 'mdxJsxFlowElement'
          imageNode.name = 'Image'
          imageNode.attributes = [
            { type: 'mdxJsxAttribute', name: 'alt', value: imageNode.alt },
            { type: 'mdxJsxAttribute', name: 'src', value: imageNode.url },
            { type: 'mdxJsxAttribute', name: 'width', value: dimensions.width },
            { type: 'mdxJsxAttribute', name: 'height', value: dimensions.height },
          ]

          // Wrap in div
          node.type = 'div'
          node.children = [imageNode]
        }
      }
    )
  }
}
