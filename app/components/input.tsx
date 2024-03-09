export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="rounded-lg border border-zinc-200 shadow-sm md:text-sm"
      {...props}
    />
  )
}
