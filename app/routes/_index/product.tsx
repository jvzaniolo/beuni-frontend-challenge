import { StarIcon } from '@heroicons/react/20/solid'
import { classNames } from '~/utils'

export function Product({ product }) {
  return (
    <li className="rounded-xl p-4 transition-colors hover:bg-zinc-100">
      {product.image.map((img) => (
        <img
          key={img.id}
          width={160}
          height={160}
          src={img.url}
          alt=""
          className="mx-auto"
        />
      ))}
      <p>
        <span>{product.name}</span>
        <span className="flex">
          {[0, 1, 2, 3, 4].map((rating) => (
            <StarIcon
              key={rating}
              className={classNames(
                product.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                'h-5 w-5 flex-shrink-0',
              )}
              aria-hidden="true"
            />
          ))}
        </span>
      </p>
      <p className="truncate">{product.description}</p>
      {product.hasFreeShipping ? <p>Frete grátis</p> : null}
      <p>
        {new Intl.NumberFormat('pt', {
          style: 'currency',
          currency: 'BRL',
        }).format(product.price)}
      </p>
    </li>
  )
}
