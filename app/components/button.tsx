export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="rounded-lg border border-orange-500 bg-orange-400 px-3 py-2 font-semibold text-white shadow focus:outline focus:outline-2 focus:outline-offset-2 md:text-sm"
      {...props}
    />
  )
}
