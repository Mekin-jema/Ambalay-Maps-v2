// This file contains mock data for the API key management page.
import { faker } from '@faker-js/faker'
import { format } from 'timeago.js'

// Define the shape of a client item
export interface Client {
  id: string
  apiKey: string
  user: string
  realm: string
  createdAt: string // timeago formatted string
  status: 'active' | 'inactive'
  actions: ('view' | 'copy' | 'delete')[]
  selected: boolean
}

// Generate mock data
export const clients: Client[] = Array.from({ length: 24 }, () => {
  const firstName = faker.person.firstName()

  return {
    id: faker.string.uuid(),
    apiKey: faker.string.uuid(),
    user: faker.internet.email({ firstName }).toLocaleLowerCase(),
    realm: 'reserved',
    createdAt: format(faker.date.recent()), // e.g. "2 hours ago"
    status: faker.helpers.arrayElement(['active', 'inactive']),
    actions: ['view', 'copy', 'delete'],
    selected: faker.datatype.boolean(),
  }
})
