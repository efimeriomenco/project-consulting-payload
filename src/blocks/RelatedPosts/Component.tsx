'use client'

import React from 'react'
import type { Post, Page } from '@/payload-types'
import { ContentCarouselBlockComponent } from '@/blocks/ContentCarouselBlock/Component'

export type RelatedPostsProps = {
  className?: string
  docs?: (Post | Page)[]
  introContent?: any
  title?: string
  readMoreLabel?: string
  contentType?: 'posts' | 'pages'
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { 
    className, 
    docs, 
    title, 
    readMoreLabel,
    contentType = 'posts'
  } = props

  if (!docs || docs.length === 0) {
    return null
  }

  // Filter out string IDs and ensure we have objects
  const validDocs = docs.filter((doc): doc is Post | Page => typeof doc === 'object' && doc !== null)

  if (validDocs.length === 0) {
    return null
  }

  // Map docs to the correct relationship format
  const selectedItems = contentType === 'posts'
    ? validDocs.map((doc) => ({
        relationTo: 'posts' as const,
        value: doc as Post
      }))
    : validDocs.map((doc) => ({
        relationTo: 'pages' as const,
        value: doc as Page
      }))

  return (
    <div className={className}>
      <ContentCarouselBlockComponent
        title={title ?? ''}
        contentType={contentType}
        populateBy="selection"
        selectedItems={selectedItems}
        readMoreLabel={readMoreLabel}
      />
    </div>
  )
}
