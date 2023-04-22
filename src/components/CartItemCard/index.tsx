import Image, { StaticImageData } from 'next/image';

import { CartItemCardContainer, CartItemCardContainerDescription, SumOrDecreaseContainer } from './styles';

type CartItemCardProps = {
    image: string | StaticImageData;
    name: string;
    price: string;
    amount: number;
    onDecrement: () => void;
    onIncrement: () => void;
    onRemove: () => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
    image,
    name,
    price,
    amount,
    onDecrement,
    onIncrement,
    onRemove
}) => {
  return (
    <CartItemCardContainer>
        <Image src={image} width={100} height={93} alt="" />
        
        <CartItemCardContainerDescription>
            <div>
                <span>{name}</span>
                <span>{price}</span>
            </div>

            <div>
                <button onClick={onRemove}>Remover</button>
            </div>
        </CartItemCardContainerDescription>
        <SumOrDecreaseContainer>
                <button onClick={onDecrement}>
                    -
                </button>
                <span>{amount}</span>
                <button onClick={onIncrement}>
                        +
                </button>                    
        </SumOrDecreaseContainer>
    </CartItemCardContainer>
  );
}

export {CartItemCard};