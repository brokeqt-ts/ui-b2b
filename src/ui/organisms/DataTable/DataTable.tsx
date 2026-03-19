import { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import { Pagination } from '@/ui/molecules/Pagination'
import { EmptyState } from '@/ui/molecules/EmptyState'
import styles from './DataTable.module.css'

export interface DataTableProps<T> {
  data: T[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[]
  pageSize?: number
  searchValue?: string
  onRowClick?: (row: T) => void
}

export function DataTable<T>({
  data,
  columns,
  pageSize = 10,
  searchValue = '',
  onRowClick,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter: searchValue },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: { pageSize },
    },
  })

  const pageCount = table.getPageCount()
  const currentPage = table.getState().pagination.pageIndex + 1

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={styles.th}
                    onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                    data-sortable={header.column.getCanSort() || undefined}
                  >
                    <span className={styles.thContent}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          {header.column.getIsSorted() === 'asc'
                            ? <path d="M6 9V3M3 5l3-3 3 3" />
                            : <path d="M6 3v6M3 7l3 3 3-3" />}
                        </svg>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={styles.tr}
                data-clickable={onRowClick ? true : undefined}
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={styles.td}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {table.getRowModel().rows.length === 0 && (
        <EmptyState
          title="Нет данных"
          description="Попробуйте изменить параметры фильтрации"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          }
        />
      )}

      {pageCount > 1 && (
        <div className={styles.footer}>
          <span className={styles.info}>
            Показано {table.getRowModel().rows.length} из {table.getFilteredRowModel().rows.length}
          </span>
          <Pagination
            page={currentPage}
            pageCount={pageCount}
            onPageChange={(p) => table.setPageIndex(p - 1)}
          />
        </div>
      )}
    </div>
  )
}
