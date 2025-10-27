'use client'

import React, { useMemo } from 'react'
import * as _jsx_runtime from 'react/jsx-runtime'
import { components as defaultComponents } from './MDXComponents'

// Create MDX component from compiled code string
const getMDXComponent = (code: string, globals: Record<string, unknown> = {}) => {
  const scope = { React, _jsx_runtime, ...globals }
  const fn = new Function(...Object.keys(scope), code)
  return fn(...Object.values(scope)).default
}

// Hook to memoize MDX component creation
export const useMDXComponent = (code: string, globals: Record<string, unknown> = {}) => {
  return useMemo(() => getMDXComponent(code, globals), [code, globals])
}

interface MDXLayoutRendererProps {
  code: string
  [key: string]: unknown
}

// Render MDX content with default components
export const MDXLayoutRenderer = ({ code, ...rest }: MDXLayoutRendererProps) => {
  const MDXContent = useMDXComponent(code)
  return <MDXContent components={defaultComponents} {...rest} />
}
