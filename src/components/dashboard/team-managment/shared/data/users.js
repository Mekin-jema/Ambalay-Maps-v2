import { faker } from '@faker-js/faker'
import { format } from 'timeago.js'
export const users = Array.from({ length: 20 }, () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    username: faker.internet.username(firstName, lastName).toLocaleLowerCase(),
    email: faker.internet.email(firstName).toLocaleLowerCase(),
    phoneNumber: faker.phone.number(),
    status: faker.helpers.arrayElement([
      'active',
      'inactive',
      'invited',
      'suspended',
    ]),
    role: faker.helpers.arrayElement([
      'superadmin',
      'admin',
      'developer',
      'uiux',
    ]),
    createdAt: format(faker.date.past()),
    updatedAt: format(faker.date.recent()),
  }
})
