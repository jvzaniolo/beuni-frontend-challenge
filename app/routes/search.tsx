import { Combobox } from '@headlessui/react'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useFetcher, useNavigate } from '@remix-run/react'
import { Input } from '~/components/input'
import { getProducts, type Product } from '~/products'

export async function loader({ request }: LoaderFunctionArgs) {
  const searchParams = new URL(request.url).searchParams
  const query = searchParams.get('q')
  if (!query) return json({ products: [] })
  searchParams.set('perPage', '10')
  const data = await getProducts(searchParams)
  return json(data)
}

export function Search() {
  const navigate = useNavigate()
  const fetcher = useFetcher<typeof loader>()

  return (
    <fetcher.Form method="get" action="/search">
      <Combobox
        as="div"
        className="relative"
        onChange={(product: Product) => navigate(`/product/${product.id}`)}
        nullable
      >
        <Combobox.Input
          as={Input}
          name="q"
          type="search"
          placeholder='Pesquise por "camiseta" ou "mochila"'
          onChange={(e) => fetcher.submit(e.currentTarget.form)}
        />

        {fetcher.data ? (
          <Combobox.Options className="absolute z-10 mt-1.5 max-h-60 w-full divide-y divide-zinc-200 overflow-y-auto rounded-lg bg-white py-1 shadow-xl focus:outline-none">
            {fetcher.data.products.length > 0 ? (
              fetcher.data.products.map((product) => (
                <Combobox.Option
                  key={product?.id}
                  value={product}
                  className="group grid cursor-default select-none grid-flow-col gap-3 overflow-hidden p-3 text-sm data-[headlessui-state=active]:bg-zinc-100/70"
                >
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded bg-zinc-100">
                    <img
                      src={product?.image[0].url}
                      alt={product?.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="grid">
                    <p>{product?.name}</p>
                    <p className="truncate text-sm text-zinc-600">
                      {product?.description}
                    </p>
                  </div>
                </Combobox.Option>
              ))
            ) : (
              <Combobox.Option
                value=""
                disabled
                className="p-3 text-center text-sm text-zinc-600"
              >
                Nenhum produto encontrado.
              </Combobox.Option>
            )}
          </Combobox.Options>
        ) : null}
      </Combobox>
    </fetcher.Form>
  )
}
