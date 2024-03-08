export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className="px-3 py-1.5 shadow-sm rounded-lg border border-zinc-300 text-sm appearance-none"
      {...props}
    />
  )
}
