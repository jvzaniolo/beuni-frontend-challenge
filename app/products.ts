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
  const data = await res.json()

  return {
    total: data.total,
    products: data.products.map((product: Product) => ({
      name: product.name,
      id: product.id,
      price: product.price,
      description: product.description,
      total_stock: product.total_stock,
      rating: product.rating,
      minimumQuantity: product.minimumQuantity,
      hasFreeShipping: product.hasFreeShipping,
      image: product.image,
    })),
  } as { products: Product[]; total: number }
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
  const data = await res.json()
  return {
    product: {
      name: data.product.name,
      id: data.product.id,
      price: data.product.price,
      description: data.product.description,
      total_stock: data.product.total_stock,
      rating: data.product.rating,
      minimumQuantity: data.product.minimumQuantity,
      hasFreeShipping: data.product.hasFreeShipping,
      image: data.product.image,
    },
  } as { product: Product }
}
