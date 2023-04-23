import React, { ReactElement, useEffect, useState } from 'react';

import Image from 'next/image'

import { Header } from '../Header';
import { CartItemCard } from '../CartItemCard';

import deleteX from "../../assets/deleteX.svg"
import { Product, useCart } from '@/hooks/useCart';

import { Container, ShoppingCartMenuContainer, ShoppingCartMenuList, ShoppingCartMenuFooter, ShoppingCartMenuEmptyContainer } from './styles';
import { useRouter } from 'next/router';
import axios from 'axios';
import { emptyShoppingCartWhenTimeExpires } from '@/helpers/cartHelper';

type LayoutProps = {
    children: ReactElement;
    hasShoppingCart?: boolean;
}

type ProductsToBy = {
  priceId: string
  quantity: number
}

const Layout: React.FC<LayoutProps> = ({ children, hasShoppingCart = true }) => {
  const { replace } = useRouter();
  const { cartProducts, cartAmountInCurrencyFormat, quantityProductsInCart, incrementInCart, decrementInCart, deleteToCart } = useCart();

  const [showShoppingCartSideBar, setShowShoppingCartSideBar] = useState(false);
  
  /* Como o REDIRECT demora um pouco de ocorrer uma BOA PRÁTICA é criar um estado
  para mostrar para o usuário que a ação de checkout está em progresso */
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

  const isCartEmpty = cartProducts?.length <= 0;

  useEffect(() => {
    emptyShoppingCartWhenTimeExpires()
  }, []);


  async function handleBuyButton() {
    try {
      setIsCreatingCheckoutSession(true);

      // CRIANDO CHECKOUT SESSSION
      /* Como a api (nesse caso o stripe) roda no mesmo endereço front-end 
        (tanto a api quanto o front end então rodando no localhost:3000 basta 
        colocar o camiho da rota ex: /api/checkout → pasta/arquivo só tirando 
        o localhost:3000 → tirando a parte do domínio que a aplicação vai 
        conseguir se comunicar porque ele usa da mesma base de endereço/mesma 
        base de url do front) */
      const productsToBy: ProductsToBy[] = cartProducts?.map(item => {
        return {
          priceId: item?.defaultPriceId,
          quantity: item?.quantity
        }
      });
      const response = await axios.post('/api/checkout', {
        procuts: productsToBy //params que quero enviar p/ rota /api/checkout
      })

      /* checkoutUrl -> é a prop devolvida pela rota /api/checkout quando o status 
        code for 201, ou seja, quando der sucesso */
      const { checkoutUrl } = response.data;

      /* -> Redireciona o usuário para a "checkoutUrl" -> Rota externa devolvida 
            quando da sucesso na requisição. É uma rota externa porque o "stripe" não é uma aplicação
            nossa e por isso eu uso o object "window".
        ->  Caso eu quisesse redirecionar o usuário para uma rota interna de nossa aplicação
            eu posso usar o hook do next chamado useRouter() chamando o router.push("/checkout")
            por exemplo para realizar tal ação.
        */
      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);

      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <Container>
        <Header 
          hasShoppingCart={hasShoppingCart} 
          onLogoPress={() => replace('/')}
          onShoppingCartPress={() => setShowShoppingCartSideBar(true)} 
        />

        <main>{children}</main>

          <ShoppingCartMenuContainer className={showShoppingCartSideBar ? 'active' : 'exit'}>
            <button onClick={() => setShowShoppingCartSideBar(false)}>
              <Image src={deleteX} alt="Close shopping cart menu" />  
            </button>

            {isCartEmpty && (
              <ShoppingCartMenuEmptyContainer>
                <span>Ainda não existem produtos adicionados ao carrinho.</span>
              </ShoppingCartMenuEmptyContainer>
            )}

            {!isCartEmpty && (
              <>
                <h3>Sacola de Compras</h3>

                <ShoppingCartMenuList>
                  {cartProducts?.map((item: Product) => (
                    <CartItemCard  
                      key={item?.id}
                      image={item?.imageUrl}
                      name={item?.name}
                      price={item?.priceUnitInCurrencyFormat}
                      amount={item?.quantity}
                      onIncrement={() => incrementInCart(item?.id)}
                      onDecrement={() => decrementInCart(item?.id)}
                      onRemove={() => deleteToCart(item)}
                    />
                  ))}
                </ShoppingCartMenuList>

                <ShoppingCartMenuFooter>
                  <div>
                    <span>Quantidade</span>
                    <span>{quantityProductsInCart} itens</span>
                  </div>

                  <div>
                    <span>Valor total</span>
                    <span>{cartAmountInCurrencyFormat}</span>
                  </div>

                  <button disabled={isCreatingCheckoutSession} onClick={handleBuyButton}>
                    Finalizar compra
                  </button>
                </ShoppingCartMenuFooter>
              </>
            )}
          </ShoppingCartMenuContainer>
    </Container>
  );
}

export {Layout};