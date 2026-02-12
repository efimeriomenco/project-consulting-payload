'use client'

import React, { useEffect, useState } from 'react'
import type { NewsGridBlockType, Post } from '@/payload-types'
import { useParams, useSearchParams } from 'next/navigation'
import { Media } from '@/components/Media'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from '@/i18n/routing'

type Props = NewsGridBlockType & {
  id?: string
}

export const NewsGridBlockComponent: React.FC<Props> = ({
  title,
  readMoreLabel,
  populateBy = 'collection',
  selectedPosts,
  postsPerPage = 6,
  columns = '2',
  showPagination = true,
}) => {
  const { locale } = useParams()
  const searchParams = useSearchParams()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  const effectivePostsPerPage = postsPerPage ?? 6
  const effectiveColumns = columns ?? '2'
  const isSelectionMode = populateBy === 'selection'

  useEffect(() => {
    const page = searchParams.get('page')
    if (page) {
      setCurrentPage(parseInt(page, 10))
    }
  }, [searchParams])

  useEffect(() => {
    // If using individual selection, use the selected posts directly
    if (isSelectionMode && selectedPosts) {
      const postsArray = selectedPosts
        .map((post) => (typeof post === 'object' ? post : null))
        .filter((post): post is Post => post !== null)
      setPosts(postsArray)
      setTotalPages(1)
      setLoading(false)
      return
    }

    // Otherwise fetch from API
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `/api/posts?limit=${effectivePostsPerPage}&page=${currentPage}&sort=-publishedAt&locale=${locale}&depth=1`
        )
        const data = await res.json()
        setPosts(data.docs || [])
        setTotalPages(data.totalPages || 1)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [effectivePostsPerPage, currentPage, locale, isSelectionMode, selectedPosts])
  
  const gridColsClass = {
    '2': 'grid-cols-1 md:grid-cols-2',
    '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[effectiveColumns] || 'grid-cols-1 md:grid-cols-2'

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <section className="container mx-auto">
        {title && (
          <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            {title}
          </h2>
        )}
        <div className={`grid ${gridColsClass} gap-6`}>
          {Array.from({ length: isSelectionMode ? 3 : effectivePostsPerPage }).map((_, i) => (
            <div 
              key={i} 
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 animate-pulse"
            >
              {/* Image skeleton */}
              <div className="relative h-48 md:h-96 bg-gray-200" />
              
              {/* Content skeleton */}
              <div className="p-6">
                {/* Title skeleton */}
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                
                {/* Description skeleton */}
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
                
                {/* Button skeleton */}
                <div className="h-10 bg-gray-200 rounded-full w-40" />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (posts.length === 0) {
    return (
      <section className="container mx-auto">
        {title && (
          <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            {title}
          </h2>
        )}
        <div className="text-center py-12 text-gray-500">
          <p>No posts available yet.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="container mx-auto">
      {title && (
        <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          {title}
        </h2>
      )}

      {/* Grid */}
      <div className={`grid ${gridColsClass} gap-6`}>
        {posts.map((post) => (
          <div
            key={post.id}
            className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 h-full flex flex-col hover:shadow-xl transition-shadow duration-300"
          >
            {/* Image */}
            <div className="relative h-48 md:h-96 bg-[#051229] overflow-hidden flex-shrink-0">
              {post.featuredImage && typeof post.featuredImage === 'object' ? (
                <Media
                  resource={post.featuredImage}
                  imgClassName="w-full h-full object-cover"
                  fill
                />
              ) : post.meta?.image && typeof post.meta.image === 'object' ? (
                <Media
                  resource={post.meta.image}
                  imgClassName="w-full h-full object-cover"
                  fill
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white/50 text-sm">No image</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="font-montserrat text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#1A3275] transition-colors duration-300">
                {post.title}
              </h3>
              <p className="font-montserrat text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                {post.excerpt || post.meta?.description || ''}
              </p>
              <Link
                href={`/posts/${post.slug}`}
                className="inline-flex items-center gap-2 bg-[#051229] text-white text-sm font-medium pl-0.5 pr-3 py-0.5 rounded-full hover:bg-[#1A3275] transition-all duration-300 cursor-pointer mt-auto w-fit"
              >
                <ArrowRight className="bg-[#1A3275] group-hover:bg-white group-hover:text-[#1A3275] rounded-full p-1 w-8 h-8 transition-all duration-300" />
                {readMoreLabel || 'Citește mai mult'}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination - only show for collection mode */}
      {!isSelectionMode && showPagination && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${
                currentPage === page
                  ? 'bg-[#1A3275] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </section>
  )
}
