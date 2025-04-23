import { parseWithZod } from '@conform-to/zod'
// import { setTimeout as sleep } from 'node:timers/promises'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { redirectWithSuccess } from 'remix-toast'
import { z } from 'zod'
import { UsersInviteDialog } from './components/users-invite-dialog'

export const formSchema = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .email({ message: 'Email is invalid.' }),
  role: z.string({ required_error: 'Role is required.' }),
  desc: z.string().optional(),
})

export const action = async ({ request }) => {
  const url = new URL(request.url)
  const submission = parseWithZod(await request.formData(), {
    schema: formSchema,
  })
  if (submission.status !== 'success') {
    return { lastResult: submission.reply() }
  }

  // await sleep(1000)

  return redirectWithSuccess(`dashboard/users?${url.searchParams.toString()}`, {
    message: 'User invited successfully!',
    description: JSON.stringify(submission.value),
  })
}

export default function UserInvite() {
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  return (
    <UsersInviteDialog
      key="user-invite"
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
