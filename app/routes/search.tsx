import { Combobox } from '@headlessui/react'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useFetcher, useNavigate } from '@remix-run/react'
import { Input } from '~/components/input'
import { getProducts, type Product } from '~/products'

const emptySearch = { products: [], total: 0 }

export async function loader({ request }: LoaderFunctionArgs) {
  const searchParams = new URL(request.url).searchParams
  const query = searchParams.get('q')
  if (!query) return json(emptySearch)
  searchParams.set('perPage', '10')
  const data = await getProducts(searchParams)
  return json(data)
}

export function Search() {
  const navigate = useNavigate()
  const fetcher = useFetcher<typeof loader>()

  const isLoading = fetcher.state === 'loading' && fetcher.formData?.has('q')

  return (
    <fetcher.Form method="get" action="/search">
      <Combobox
        as="div"
        className="relative"
        onChange={(product: Product | null) => {
          product && navigate(`/product/${product.id}`)
          fetcher.data = emptySearch
        }}
        nullable
      >
        <Combobox.Input
          as={Input}
          name="q"
          type="search"
          placeholder='Pesquise por "camiseta" ou "mochila"'
          onChange={(e) => fetcher.submit(e.currentTarget.form)}
        />

        <ComboboxOptions data={fetcher.data} isLoading={isLoading} />
      </Combobox>
    </fetcher.Form>
  )
}

function ComboboxOptions({
  data,
  isLoading,
}: {
  data: { products: Product[]; total: number } | undefined
  isLoading: boolean | undefined
}) {
  if (isLoading) {
    return (
      <Combobox.Options className="absolute z-10 mt-1.5 max-h-60 w-full divide-y divide-zinc-200 overflow-y-auto rounded-lg bg-white py-1 shadow-xl focus:outline-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <Combobox.Option
            key={i}
            value={null}
            className="flex animate-pulse gap-3 p-3 text-center text-sm text-zinc-600"
            disabled
          >
            <span className="block h-10 w-10 shrink-0 animate-pulse rounded-lg bg-zinc-200" />
            <span className="block h-10 w-full animate-pulse rounded-lg bg-zinc-200" />
          </Combobox.Option>
        ))}
      </Combobox.Options>
    )
  }

  if (!data) return null

  return data.products.length > 0 ? (
    <Combobox.Options className="absolute z-10 mt-1.5 max-h-60 w-full divide-y divide-zinc-200 overflow-y-auto rounded-lg bg-white py-1 shadow-xl focus:outline-none">
      {data.products.map((product) => (
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
      ))}
    </Combobox.Options>
  ) : (
    <Combobox.Options className="absolute z-10 mt-1.5 max-h-60 w-full divide-y divide-zinc-200 overflow-y-auto rounded-lg bg-white py-1 shadow-xl focus:outline-none">
      <Combobox.Option
        value=""
        disabled
        className="p-3 text-center text-sm text-zinc-600"
      >
        Nenhum produto encontrado.
      </Combobox.Option>
    </Combobox.Options>
  )
}
