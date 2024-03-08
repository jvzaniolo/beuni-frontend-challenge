export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className="appearance-none rounded-lg border border-zinc-300 py-1.5 px-3 text-sm shadow-sm"
      {...props}
    />
  )
}
