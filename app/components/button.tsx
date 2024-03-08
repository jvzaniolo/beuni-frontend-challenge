export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="w-full rounded-lg border border-orange-500 bg-orange-400 py-1.5 px-3 text-sm font-semibold text-white shadow focus:outline focus:outline-2 focus:outline-offset-2"
      {...props}
    />
  )
}
