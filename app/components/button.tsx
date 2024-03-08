export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="text-sm font-semibold rounded-lg px-3 py-1.5 bg-orange-400 text-white border border-orange-500 focus:outline-offset-2 shadow focus:outline-2 focus:outline"
      {...props}
    />
  )
}
