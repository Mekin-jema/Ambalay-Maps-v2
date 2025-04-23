import { Cross2Icon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { clientTypes } from '../../shared/data/data'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DataTableViewOptions } from './data-table-view-options'
import { SearchInput } from './search-input'
import { useDataTableState } from '../hooks/use-data-table-state'

export function DataTableToolbar({ table, facetedCounts }) {
  const {
    queries,
    updateQueries,
    isFiltered,
    resetFilters,
  } = useDataTableState()

  return (
    <div className="flex flex-col gap-y-3 sm:flex-row sm:items-center sm:justify-between ">
      <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:gap-x-3 gap-y-2">
        <SearchInput
          key={queries.username}
          autoFocus
          placeholder="Filter Keys..."
          defaultValue={queries.username}
          onSearch={(value) => updateQueries({ username: value })}
        />

        <div className="flex flex-wrap items-center gap-2  ">
          {table.getColumn('status') && (
            <DataTableFacetedFilter
              filterKey="status"
              title="Status"
              options={[
                { label: 'Active', value: 'active', count: facetedCounts?.client?.active },
                { label: 'Inactive', value: 'inactive', count: facetedCounts?.client?.inactive },
                 ]}
            />
          )}

     

          {isFiltered && (
            <Button
              variant="ghost"
              onClick={resetFilters}
              className="h-8 px-2 lg:px-3 bg-[#D19EDB]"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
