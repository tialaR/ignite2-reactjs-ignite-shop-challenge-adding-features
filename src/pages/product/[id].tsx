import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image";
import { useState } from "react";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"
import Head from 'next/head'

import { Layout } from "@/components/Layout"
import { useCart } from "@/hooks/useCart";
import { formatValueToCurrencyInReal } from "@/helpers/currency";

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    defaultPriceId: string
    priceUnit: number
    priceUnitInCurrencyFormat: string
    description: string
  }
}

export default function Product({ product }: ProductProps) {
  const { addToCart } = useCart();

  function handleBuyButton() {
    addToCart(product)
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <Layout>
        <ProductContainer>
          <ImageContainer>
            <Image src={product.imageUrl} width={520} height={480} alt="" />
          </ImageContainer>

          <ProductDetails>
            <h1>{product.name}</h1>
            <span>{product.priceUnitInCurrencyFormat}</span>

            <p>{product.description}</p>

            <button onClick={handleBuyButton}>
              Comprar agora
            </button>
          </ProductDetails>
        </ProductContainer>
      </Layout>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_NbQpMR5t5gu0sx' } },
    ],
    fallback: 'blocking',
  }
}

/*
  Diferente da página Home onde a mesma é uma  página estática onde não recebe 
  nenhum tipo de parâmetro, ou seja, ele é smepre igual.

  Na página de um produto específico, como é esse caso ela também é uma página estática
  mas que tem que mudar de acordo com o produto. Não adiantando gerar uma única 
  página estática porque eu preciso na verdade gerar uma página estática por produto.
*/
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  //Recuperando o id que foi passado por parâmetro via rota /product/:id

  if(!params) {
    return {
      notFound: true // Caso não exista parametros, retorna um 404
    }
  }
  
  const productId = params.id;

  /* Buscando dados do produto específico a partir do Id que foi 
    passado por parâmetro via rota /product/:id */
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        priceUnit: price.unit_amount ? price.unit_amount / 100 : 0,
        priceUnitInCurrencyFormat: formatValueToCurrencyInReal(price.unit_amount ? price.unit_amount / 100 : 0),
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1 // 1 hours
  }
}