import {
  ShoppingCartIcon,
  StarIcon,
  TruckIcon,
} from '@heroicons/react/20/solid'
import { type LoaderFunctionArgs, type MetaFunction } from '@remix-run/node'
import {
  isRouteErrorResponse,
  json,
  useLoaderData,
  useRouteError,
} from '@remix-run/react'
import { toast } from 'sonner'
import { Button } from '~/components/button'
import { getProductById } from '~/products'
import { classNames, getErrorMessage, invariantResponse } from '~/utils'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: `${data?.product.name} | BeUni`,
    },
    {
      name: 'description',
      content: data?.product.description,
    },
  ]
}

export async function loader({ params }: LoaderFunctionArgs) {
  invariantResponse(params.id, 'Parâmetro `id` é obrigatório')
  const data = await getProductById(params.id)
  return json(data, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

export default function ProductPage() {
  const data = useLoaderData<typeof loader>()

  return (
    <div className="container mx-auto px-8 pb-16 pt-2">
      <section className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:gap-12">
        <div className="flex max-h-96 items-center justify-center overflow-hidden rounded-lg bg-zinc-200 md:max-h-[35rem]">
          <img
            src={data.product.image[0].url}
            alt={data.product.name}
            className="h-full w-full object-cover"
            style={{
              viewTransitionName: `product-image-${data.product.id}`,
            }}
          />
        </div>

        <div className="max-w-lg">
          <h1 className="mb-3 text-pretty text-2xl font-semibold lg:text-3xl">
            {data.product.name}
          </h1>
          <p className="mb-3 text-2xl lg:text-3xl">
            <span className="sr-only">Preço</span>
            <span>
              {new Intl.NumberFormat('pt-br', {
                style: 'currency',
                currency: 'BRL',
              }).format(data.product.price)}
            </span>
          </p>
          <p className="mb-5 flex">
            <span className="sr-only">Review</span>
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={classNames(
                  data.product.rating > rating
                    ? 'text-yellow-400'
                    : 'text-gray-200',
                  'h-4 w-4 flex-shrink-0 md:h-5 md:w-5',
                )}
                aria-hidden="true"
              />
            ))}
          </p>

          <p className="text-zinc-700">{data.product.description}</p>
          <p className="mt-2 text-zinc-700">
            Quantidade mínima: {data.product.minimumQuantity}
          </p>

          <div className="mt-12 flex flex-col-reverse gap-4 md:flex-row md:items-center">
            <Button
              onClick={() =>
                toast.success('Item adicionado ao carrinho!', {
                  duration: 3000,
                })
              }
            >
              <ShoppingCartIcon className="h-5 w-5" />
              Adicionar ao carrinho
            </Button>

            {data.product.hasFreeShipping ? (
              <p className="flex items-center gap-2 text-orange-500">
                <TruckIcon className="h-5 w-5" />
                Frete grátis
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()

  const errorMessage = isRouteErrorResponse(error)
    ? error.data
    : getErrorMessage(error)

  return (
    <div className="container mx-auto px-8 pb-8 pt-2">
      <h1 className="mb-2 text-2xl font-semibold md:text-3xl">
        Algo deu errado :/
      </h1>
      <p>{errorMessage}</p>
      <div className="mt-8">
        <Button to="/">Voltar para a página inicial</Button>
      </div>
    </div>
  )
}
