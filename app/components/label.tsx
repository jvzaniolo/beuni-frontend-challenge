export function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  return <label className="mb-2 pl-0.5 md:mb-1.5 md:text-sm" {...props} />
}
