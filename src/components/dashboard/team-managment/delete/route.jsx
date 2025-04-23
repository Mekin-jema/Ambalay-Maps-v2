// import { setTimeout as sleep } from 'node:timers/promises'
import { useState } from 'react'
import { data, useNavigate, useSearchParams } from 'react-router'
import { redirectWithSuccess } from 'remix-toast'
import { users } from '../shared/data/users'
import { UsersDeleteDialog } from './components/users-delete-dialog'

export const loader = ({ params }) => {
  const user = users.find((user) => user.id === params.user)
  if (!user) {
    throw data(null, { status: 404 })
  }
  return { user }
}

export const action = async ({ request, params }) => {
  const url = new URL(request.url)
  const user = users.find((user) => user.id === params.user)
  if (!user) {
    throw data(null, { status: 404 })
  }

  // await sleep(1000)
  // remove the user from the list
  const updatedUsers = users.filter((u) => u.id !== user.id)
  users.length = 0
  users.push(...updatedUsers)

  return redirectWithSuccess(`/dashboard/users?${url.searchParams.toString()}`, {
    message: 'User deleted successfully!',
    description: `The user ${user.email} has been removed.`,
  })
}

export default function UserDelete({ loaderData }) {
  const { user } = loaderData
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  return (
    <UsersDeleteDialog
      key={`user-delete-${user.id}`}
      user={user}
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          setOpen(false)
          // wait for the drawer to close
          setTimeout(() => {
            navigate(`/dashboard/users?${searchParams.toString()}`)
          }, 300) // the duration of the modal close animation
        }
      }}
    />
  )
}
