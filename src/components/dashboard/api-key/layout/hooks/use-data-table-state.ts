'use client'

import { useMemo, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { z } from 'zod'
import { useDebounce } from '@/hooks/use-debounce'

// Schemas
export const QuerySchema = z.object({
  username: z.preprocess(
    (val) => (val === null ? undefined : val),
    z.string().optional().default(''),
  ),
})

export const FilterSchema = z.object({
  status: z.array(z.string()).optional().default([]),
  role: z.array(z.string()).optional().default([]),
})

export const SortSchema = z.object({
  sort_by: z.preprocess(
    (val) => (val === null ? undefined : val),
    z.string().optional(),
  ),
  sort_order: z.preprocess(
    (val) => (val === null ? undefined : val),
    z.union([z.literal('asc'), z.literal('desc')]).optional().default('asc'),
  ),
})

export const PaginationSchema = z.object({
  page: z.preprocess(
    (val) => (val === null ? undefined : val),
    z.string().optional().default('1').transform(Number),
  ),
  per_page: z.preprocess(
    (val) => (val === null ? undefined : val),
    z.union([
      z.literal('10'),
      z.literal('20'),
      z.literal('30'),
      z.literal('40'),
      z.literal('50'),
    ]).optional().default('20').transform(Number),
  ),
})

export type Queries = z.infer<typeof QuerySchema>
export type Filters = z.infer<typeof FilterSchema>
export type Sort = z.infer<typeof SortSchema>
export type Pagination = z.infer<typeof PaginationSchema>

export function useDataTableState() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const debounce = useDebounce(200)

  const getSearchParamsObject = () => {
    const params: Record<string, string | string[]> = {}
    searchParams.forEach((value, key) => {
      if (params[key]) {
        if (Array.isArray(params[key])) {
          (params[key] as string[]).push(value)
        } else {
          params[key] = [params[key] as string, value]
        }
      } else {
        params[key] = value
      }
    })
    return params
  }

  const queries = useMemo(() => {
    return QuerySchema.parse({
      username: searchParams.get('username'),
    })
  }, [searchParams])

  const filters = useMemo(() => {
    return FilterSchema.parse({
      status: searchParams.getAll('status'),
      role: searchParams.getAll('role'),
    })
  }, [searchParams])

  const sort = useMemo(() => {
    return SortSchema.parse({
      sort_by: searchParams.get('sort_by'),
      sort_order: searchParams.get('sort_order'),
    })
  }, [searchParams])

  const pagination = useMemo(() => {
    return PaginationSchema.parse({
      page: searchParams.get('page'),
      per_page: searchParams.get('per_page'),
    })
  }, [searchParams])

  const setNewSearchParams = useCallback((newParams: URLSearchParams) => {
    router.push(`?${newParams.toString()}`)
  }, [router])

  const updateQueries = (newQueries: Partial<Queries>) => {
    debounce(() => {
      const params = new URLSearchParams(searchParams.toString())
      for (const [key, value] of Object.entries(newQueries)) {
        if (value === undefined || value === '') {
          params.delete(key)
        } else {
          params.set(key, value)
        }
      }
      setNewSearchParams(params)
    })
    updatePagination({ page: undefined })
  }

  const updateFilters = (newFilters: Partial<Filters>) => {
    const params = new URLSearchParams(searchParams.toString())
    for (const [key, value] of Object.entries(newFilters)) {
      params.delete(key)
      if (Array.isArray(value)) {
        value.forEach(v => params.append(key, v))
      }
    }
    setNewSearchParams(params)
    updatePagination({ page: undefined })
  }

  const updateSort = (newSort: Partial<Sort>) => {
    const params = new URLSearchParams(searchParams.toString())
    if (newSort.sort_by) {
      params.set('sort_by', newSort.sort_by)
      params.set('sort_order', newSort.sort_order || 'asc')
    } else {
      params.delete('sort_by')
      params.delete('sort_order')
    }
    setNewSearchParams(params)
    updatePagination({ page: undefined })
  }

  const updatePagination = (newPagination: Partial<Pagination>) => {
    const params = new URLSearchParams(searchParams.toString())
    for (const [key, value] of Object.entries(newPagination)) {
      if (value !== undefined) {
        params.set(key, String(value))
      } else {
        params.delete(key)
      }
    }
    setNewSearchParams(params)
  }

  const isFiltered =
    Object.values(filters).some((filterArray) => filterArray.length > 0) ||
    Object.values(queries).some((query) => query !== '')

  const resetFilters = () => {
    router.push('?')
  }

  return {
    queries,
    filters,
    sort,
    pagination,
    updateQueries,
    updateFilters,
    updateSort,
    updatePagination,
    isFiltered,
    resetFilters,
  }
}
