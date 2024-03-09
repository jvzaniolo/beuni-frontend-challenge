import { Link } from '@remix-run/react'
import { StarIcon } from '@heroicons/react/20/solid'
import type { Product } from '~/types'
import { classNames } from '~/utils'

export function Product({ product }: { product: Product }) {
  return (
    <li className="group rounded-xl p-4 transition-colors hover:bg-zinc-50">
      <Link to={`/product/${product.id}`}>
        <div className="overflow-hidden rounded-lg bg-zinc-100">
          <img
            key={product.image[0].id}
            width={160}
            height={160}
            src={product.image[0].url}
            alt=""
            className="h-52 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>

        <div className="px-3 pb-3 pt-4">
          <p className="mb-2 text-base font-semibold md:text-lg">
            {product.name}
          </p>
          <p className="mb-4 flex">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={classNames(
                  product.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                  'h-4 w-4 flex-shrink-0 md:h-5 md:w-5',
                )}
                aria-hidden="true"
              />
            ))}
          </p>

          <p className="mb-4 line-clamp-2 overflow-hidden">
            {product.description}
          </p>

          <footer className="flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-light text-green-500 md:text-sm">
                {product.hasFreeShipping ? 'Frete grátis' : null}
              </span>

              <span className="text-lg font-medium md:text-xl">
                {new Intl.NumberFormat('pt', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(product.price)}
              </span>
            </div>

            <div>
              <span className="text-sm font-light text-gray-500">
                {product.total_stock} disponíveis
              </span>
            </div>
          </footer>
        </div>
      </Link>
    </li>
  )
}
