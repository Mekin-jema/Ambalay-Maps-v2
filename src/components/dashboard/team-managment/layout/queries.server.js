import { users as initialUsers } from '../shared/data/users'

export const listFilteredUsers = ({
  username,
  filters,
  currentPage,
  pageSize,
  sortBy,
  sortOrder,
}) => {
  const users = initialUsers
    .filter((user) => {
      // Filter by title
      return user.username.toLowerCase().includes(username.toLowerCase())
    })
    .filter((user) => {
      // Filter by other filters
      return Object.entries(filters).every(([key, value]) => {
        if (value.length === 0) return true
        return value.includes(user[key])
      })
    })
    .sort((a, b) => {
      if (!sortBy) return 0

      const aValue = a[sortBy]
      const bValue = b[sortBy]

      if (typeof aValue !== 'string' || typeof bValue !== 'string') {
        console.warn(`Invalid sort field type for ${sortBy}`)
        return 0
      }

      return sortOrder === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    })

  const totalPages = Math.ceil(users.length / pageSize)
  const totalItems = users.length
  const newCurrentPage = Math.min(currentPage, totalPages)

  return {
    data: users.slice(
      (newCurrentPage - 1) * pageSize,
      newCurrentPage * pageSize,
    ),
    pagination: {
      currentPage: newCurrentPage,
      pageSize,
      totalPages,
      totalItems,
    },
  }
}

export const getFacetedCounts = ({
  facets,
  username,
  filters,
}) => {
  const facetedCounts = {}

  // For each facet, filter the tasks based on the filters and count the occurrences
  for (const facet of facets) {
    // Filter the users based on the filters
    const filteredUsers = initialUsers
      .filter((user) => {
        // Filter by title
        return user.username.toLowerCase().includes(username.toLowerCase())
      })
      // Filter by other filters
      .filter((user) => {
        return Object.entries(filters).every(([key, value]) => {
          if (key === facet || value.length === 0) return true
          return value.includes(user[key])
        })
      })

    // Count the occurrences of each facet value
    facetedCounts[facet] = filteredUsers.reduce(
      (acc, user) => {
        acc[user[facet]] = (acc[user[facet]] ?? 0) + 1
        return acc
      },
      {},
    )
  }

  return facetedCounts
}
