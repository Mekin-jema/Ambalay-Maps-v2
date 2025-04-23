import {
  IconEye,
  IconCopy,
  IconTrash,
} from '@tabler/icons-react'
import { UserStatus } from './schema'
import type { ComponentType } from 'react'

// Define a type for the client action objects
interface ClientAction {
  label: string
  value: string
  icon: ComponentType<{ size?: number, className?: string }>
}

// Define a map for client types with proper typings
export const clientTypes = new Map<UserStatus, string>([
  ['Active', 'bg-green-100/40 text-green-800 dark:text-green-200 border-green-300'],
  ['Inactive', 'bg-neutral-300/40 text-neutral-700 dark:text-neutral-200 border-neutral-300'],
])

// Define client actions with the correct types for each field
export const clientActions: ClientAction[] = [
  {
    label: 'View',
    value: 'view',
    icon: IconEye,
  },
  {
    label: 'Copy',
    value: 'copy',
    icon: IconCopy,
  },
  {
    label: 'Delete',
    value: 'delete',
    icon: IconTrash,
  },
]