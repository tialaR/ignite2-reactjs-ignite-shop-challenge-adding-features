import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, SuccessContainer, ImageListContainer } from "../styles/pages/success";
import Head from 'next/head'

import { Layout } from "@/components/Layout"
import { useCart } from "@/hooks/useCart";
import { useEffect } from "react";

interface Product {
  name: string;
  imageUrl: string;
}

interface SuccessProps {
    costumerName: string;
    products: Product[]
  }

export default function Success({ costumerName, products }: SuccessProps) {
    const { resetCart } = useCart();

    const productsAmout = products?.length

    useEffect(() => {
      resetCart();
    }, [])

    const renderDescription = () => {
      if (productsAmout > 1) {
        return (
          <p>
              Uhuul <strong>{costumerName}</strong>, sua compra de <strong>{productsAmout}</strong> camisetas já está a caminho da sua casa.
          </p>
        )
      }

      return (
        <p>
              Uhuul <strong>{costumerName}</strong>, sua compra de <strong>{productsAmout}</strong> camiseta já está a caminho da sua casa.
        </p>
      )
    }

    return (
      <>
        <Head>
          <title>Compra efetuada | Ignite Shop</title>

          <meta name="robots" content="noindex" />
        </Head>

        <Layout hasShoppingCart={false}>
          <SuccessContainer>
            <h1>Compra efetuada!</h1>
      
            <ImageListContainer>
              {products?.map(item => (
                <>
                  <ImageContainer>
                    <Image src={item?.imageUrl} width={120} height={110} alt="" />
                  </ImageContainer>
                </>
              ))}
            </ImageListContainer>
      
            {renderDescription()}
      
            <Link href="/">
              Voltar ao catálogo
            </Link>
          </SuccessContainer>
        </Layout>
        
      </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    //Redirecionamento realizado caso nenhum parâmetro seja enviado na url
    if (!query.session_id) {
        return {
          redirect: {
            destination: '/',
            permanent: false, /* 301 ou 302 */
          }
        }
      }

    //Recuperando query enviado via parametro da rota de sucesso
    const sessionId = String(query.session_id);
  
    //Recuperando o produto desejado no stripe através do sessio_id
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product']
    });
  
    const costumerName = session.customer_details?.name;
    const products = session.line_items?.data?.map((item: Stripe.LineItem) => item?.price?.product) as Stripe.Product[];
    const productsAux = products?.map(item => {
      return {
        name: item?.name,
        imageUrl: item?.images[0]
      }
    })
  
    //Informações enviadas para o componente Success para montar a página de sucesso
    return {
      props: {
        costumerName,
        products: productsAux
      }
    }
  }