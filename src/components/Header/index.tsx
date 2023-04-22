import React from 'react';

import logoImg from "../../assets/logo.svg"
import bagImg from "../../assets/bag.svg"

import Image from 'next/image'

import { HeaderContainer } from './styles';
import { useCart } from '@/hooks/useCart';

type HeaderProps = {
    hasShoppingCart?: boolean;
    onShoppingCartPress?: () => void;
    onLogoPress: () => void;
}

const Header: React.FC<HeaderProps> = ({ hasShoppingCart, onShoppingCartPress = undefined, onLogoPress }) => {
  const { quantityProductsInCart } = useCart();
  const hasProductsInCart = quantityProductsInCart > 0;

  return (
    <HeaderContainer>
        <Image src={logoImg} alt="" onClick={onLogoPress} />

        {hasShoppingCart && 
          <button onClick={onShoppingCartPress}>
            {hasProductsInCart && <span>{quantityProductsInCart}</span>}
            <Image src={bagImg} alt="shopping cart image" />  
          </button>
        }
    </HeaderContainer>
  );
}

export {Header};