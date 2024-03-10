import { Link } from '@remix-run/react'

export function Pagination({
  total,
  currentPage,
  searchParams,
}: {
  total: number
  currentPage: number
  searchParams: URLSearchParams
}) {
  const { shouldGoBackwards, shouldGoForward, pageNumbers } = getPageNumbers({
    currentPage,
    total,
  })

  return (
    <div className="flex items-center gap-2">
      <Link
        to={{
          search: `?${changePage(searchParams, currentPage - 1)}`,
        }}
        prefetch="intent"
        preventScrollReset
        aria-disabled={!shouldGoBackwards}
        className="aria-disabled:pointer-events-none aria-disabled:opacity-60"
      >
        Anterior
      </Link>
      {pageNumbers.map((pageNumber) => (
        <Link
          key={pageNumber}
          to={{
            search: `?${changePage(searchParams, pageNumber)}`,
          }}
          prefetch="intent"
          preventScrollReset
          aria-current={currentPage === pageNumber ? 'page' : undefined}
          aria-disabled={currentPage === pageNumber}
          className="aria-disabled:pointer-events-none aria-[current=page]:font-bold aria-[current=page]:text-orange-500"
        >
          {pageNumber}
        </Link>
      ))}
      <Link
        to={{
          search: `?${changePage(searchParams, currentPage + 1)}`,
        }}
        prefetch="intent"
        preventScrollReset
        aria-disabled={!shouldGoForward}
        className="aria-disabled:pointer-events-none aria-disabled:opacity-60"
      >
        Próximo
      </Link>
    </div>
  )
}

function changePage(searchParams: URLSearchParams, page: number) {
  const currentParams = new URLSearchParams(searchParams)
  currentParams.set('page', String(page))
  return currentParams
}

function getPageNumbers({
  currentPage,
  total,
}: {
  currentPage: number
  total: number
}) {
  const perPage = 12

  const totalPages = Math.ceil(total / perPage)
  const maxPages = 3
  const halfMaxPages = Math.floor(maxPages / 2)

  const shouldGoBackwards = currentPage > 1
  const shouldGoForward = total > currentPage * perPage

  const pageNumbers = [] as Array<number>

  if (totalPages <= maxPages) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
  } else {
    let startPage = currentPage - halfMaxPages
    let endPage = currentPage + halfMaxPages
    if (startPage < 1) {
      endPage += Math.abs(startPage) + 1
      startPage = 1
    }
    if (endPage > totalPages) {
      startPage -= endPage - totalPages
      endPage = totalPages
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }
  }

  return { shouldGoBackwards, shouldGoForward, pageNumbers }
}
