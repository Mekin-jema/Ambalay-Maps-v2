import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useDataTableState } from './layout/hooks/use-data-table-state'

export function DataTableColumnHeader({ column, title, className }) {
  const { sort, updateSort } = useDataTableState()

  if (!column.getCanSort()) {
    return <div className={cn(className, 'text-xs')}>{title}</div>
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu className="bg-white dark:bg-slate-300">
        <DropdownMenuTrigger asChild>
          <Button variant="outline"
      
            size="sm"
            className="data-[state=open]:bg-accent -ml-3 h-8"
          >
            <span>{title}</span>
            {column.id === sort.sort_by && sort.sort_order === 'desc' ? (
              <ArrowDownIcon className="h-4 w-4" />
            ) : column.id === sort.sort_by && sort.sort_order === 'asc' ? (
              <ArrowUpIcon className="h-4 w-4" />
            ) : (
              <CaretSortIcon className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="top" className="dark:bg-slate-700 dark:text-white">
          <DropdownMenuItem
            onClick={() =>
              updateSort({
                sort_by: column.id,
                sort_order: 'asc',
              })
            }
          >
            <ArrowUpIcon className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              updateSort({
                sort_by: column.id,
                sort_order: 'desc',
              })
            }
          >
            <ArrowDownIcon className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeNoneIcon className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
