import { StarIcon } from '@heroicons/react/20/solid'
import { Link } from '@remix-run/react'
import { type Product } from '~/products'
import { classNames } from '~/utils'

export function Product({ product }: { product: Product }) {
  function prefetchImage() {
    const img = new Image()
    img.src = product.image[0].url
  }

  return (
    <li className="group rounded-xl p-4 transition-colors hover:bg-zinc-50">
      <Link
        to={`/product/${product.id}`}
        prefetch="intent"
        onFocus={prefetchImage}
        onMouseEnter={prefetchImage}
        unstable_viewTransition
        className="flex h-full flex-col"
      >
        <div className="overflow-hidden rounded-lg bg-zinc-100">
          <img
            key={product.image[0].id}
            width={160}
            height={160}
            src={product.image[0].url}
            alt=""
            className="h-52 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            style={{
              viewTransitionName: `product-image-${product.id}`,
            }}
          />
        </div>

        <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
          <p className="mb-2 text-base font-medium md:text-lg">
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

          <p
            className="mb-4 line-clamp-2 overflow-hidden"
            title={product.description}
          >
            {product.description}
          </p>

          <footer className="mt-auto flex items-end justify-between">
            <div className="flex flex-col gap-1">
              {product.hasFreeShipping ? (
                <span className="text-xs text-orange-500 md:text-sm">
                  Frete grátis
                </span>
              ) : null}

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
