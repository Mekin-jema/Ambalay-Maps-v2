import { parseWithZod } from '@conform-to/zod'
// import { setTimeout as sleep } from 'timers/promises'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { redirectWithSuccess } from 'remix-toast'
import {
  UsersActionDialog,
  createSchema as formSchema,
} from '../shared/components/users-action-dialog'
import { users } from '../shared/data/users'

export const action = async ({ request }) => {
  const url = new URL(request.url)
  const submission = parseWithZod(await request.formData(), {
    schema: formSchema,
  })
  if (submission.status !== 'success') {
    return { lastResult: submission.reply() }
  }

  // Create a new task
  // await sleep(1000)
  const newUser = {
    ...submission.value,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: crypto.randomUUID(),
    status: 'active',
  }
  users.unshift(newUser)

  return redirectWithSuccess(`/dashboard/users?${url.searchParams.toString()}`, {
    message: 'User added successfully',
    description: JSON.stringify(newUser),
  })
}

export default function UserAdd() {
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  return (
    <UsersActionDialog
      key="user-add"
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          setOpen(false)
          // wait for the modal to close
          setTimeout(() => {
            navigate(`/dashboard/users?${searchParams.toString()}`)
          }, 300) // the duration of the modal close animation
        }
      }}
    />
  )
}
