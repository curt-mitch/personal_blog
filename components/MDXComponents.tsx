import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import LargePrime from './LargePrime'
import Base64ConverterComponent from './cryptography/Base64Converter'
import Base64Encryptor from './cryptography/Base64Encryptor'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  BlogNewsletterForm,
  LargePrime,
  Base64ConverterComponent,
  Base64Encryptor,
}
