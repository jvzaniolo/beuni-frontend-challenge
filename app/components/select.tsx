export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className="rounded-lg border border-zinc-200 shadow-sm md:text-sm"
      {...props}
    />
  )
}
