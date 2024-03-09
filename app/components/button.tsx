import { Link } from '@remix-run/react'

export function Button(
  props:
    | React.ButtonHTMLAttributes<HTMLButtonElement>
    | React.ComponentProps<typeof Link>,
) {
  return 'to' in props ? (
    <Link
      className="inline-flex items-center gap-2 rounded-lg border border-orange-500 bg-orange-400 px-3 py-2 font-semibold tabular-nums text-white shadow focus:outline focus:outline-2 focus:outline-offset-2 md:text-sm"
      {...props}
    />
  ) : (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-lg border border-orange-500 bg-orange-400 px-3 py-2 font-semibold tabular-nums text-white shadow focus:outline focus:outline-2 focus:outline-offset-2 md:text-sm"
      {...props}
    />
  )
}
