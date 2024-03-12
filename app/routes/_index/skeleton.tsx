export function Skeleton() {
  return (
    <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <li key={i} className="animate-pulse rounded-xl p-4">
          <div className="h-52 w-full rounded-lg bg-zinc-200" />
          <div className="px-3 pb-3 pt-4">
            <div className="h-7 w-3/4 rounded-lg bg-zinc-200" />
            <div className="mt-2 h-5 w-1/3 rounded-lg bg-zinc-200" />
            <div className="mt-4 h-12 w-full rounded-lg bg-zinc-200" />
            <div className="mt-4 h-7 w-full rounded-lg bg-zinc-200" />
          </div>
        </li>
      ))}
    </ul>
  )
}
