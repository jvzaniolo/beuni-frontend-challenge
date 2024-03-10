export type Product = {
  id: string
  name: string
  description: string
  price: number
  total_stock: number
  rating: number
  minimumQuantity: number
  hasFreeShipping: boolean
  image: { id: string; url: string }[]
}

export async function getProducts(searchParams: URLSearchParams) {
  const res = await fetch(
    `https://api.beuni.com.br/atlas/brands/v2/products?${searchParams}`,
  )
  if (!res.ok) {
    throw new Response('Falha ao carregar produtos.', { status: 500 })
  }
  const data: { products: Product[]; total: number } = await res.json()
  return data
}

export async function getProductById(id: string) {
  const res = await fetch(
    `https://api.beuni.com.br/atlas/brands/v2/products/${id}`,
  )
  if (!res.ok) {
    throw new Response(`Falha ao carregar produto com id: ${id}`, {
      status: 500,
    })
  }
  const data: { product: Product } = await res.json()
  return data
}
