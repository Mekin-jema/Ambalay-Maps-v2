import { Badge } from '@/components/ui/badge'
import type { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { clientTypes, clientActions } from '../../shared/data/data'
import { DataTableColumnHeader } from './data-table-column-header'
import LongText from '@/components/dashboard/utils/long-text'
import { User } from '../../shared/data/schema'


export const columns: ColumnDef<User>[] = [
  {
    id: 'select',
    header: ({ table }:any) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    meta: {
      className: cn(
        'sticky md:table-cell left-0 z-10 rounded-tl',
        'transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
      ),
    },
    cell: ({ row }:any) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'apiKey',
    header: ({ column }:any) => (
      <DataTableColumnHeader column={column} title="API Key" />
    ),
    cell: ({ row }:any) => (
      <div className="font-sora text-sm">{row.getValue('apiKey')}</div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'user',
    header: ({ column }:any) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
    cell: ({ row }:any) => (
      <LongText className="max-w-36">{row.getValue('user')}</LongText>
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'realm',
    header: ({ column }:any) => (
      <DataTableColumnHeader column={column} title="Realm" />
    ),
    cell: ({ row }:any) => <div>{row.getValue('realm')}</div>,
  },
  {
    accessorKey: 'status',
    header: ({ column }:any) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }:any) => {
      const status = row.getValue('status') as string
      const badgeColor = clientTypes.get(status as any) // Type assertion if clientTypes keys don't match exactly
      return (
        <div className="flex space-x-2">
          {badgeColor && (
            <Badge variant="outline" className={cn('capitalize', badgeColor)}>
              {status}
            </Badge>
          )}
        </div>
      )
    },
    filterFn: 'weakEquals',
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }:any) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }:any) => (
      <span className="text-sm text-muted-foreground">
        {row.getValue('createdAt')}
      </span>
    ),
    enableSorting: false,
  },
  {
    id: 'actions',
    header: ({ column }:any) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }:any) => {
      const actions = row.original.actions
      return (
        <div className="flex gap-2">
          {actions.map((actionKey:any) => {
            const action = clientActions.find((a) => a.value === actionKey)
            if (!action) return null
            const Icon = action.icon
            return (
              <Icon
                key={action.value}
                size={16}
                className="text-muted-foreground hover:text-primary cursor-pointer"
              />
            )
          })}
        </div>
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
]