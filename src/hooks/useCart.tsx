import { formatValueToCurrencyInReal } from '@/helpers/currency';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';

export type Product = {
  id: string
  name: string
  description: string
  imageUrl: string
  defaultPriceId: string;
  priceUnit: number
  priceUnitInCurrencyFormat: string
  priceAmount: number;
  quantity: number;
}

type CartContext = {
  cartProducts: Product[];
  cartAmountInCurrencyFormat: string;
  deliveryPrice: number;
  quantityProductsInCart: number;
  addToCart(product: Omit<Product, 'priceAmount'| 'quantity'>): void;
  deleteToCart(item: Product): void;
  incrementInCart(id: string): void;
  decrementInCart(id: string): void;
  resetCart(): void;
}

type CartProviderProps = {
  children: ReactNode;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [cartAmount, setCartAmount] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [quantityProductsInCart, setQuantityProductsInCart] = useState(0);

  //Buscando produtos armazenados no AsyncStorage do carrinho (os dados são mantidos no reload)
  useEffect(() => {
    async function loadCartProducts(): Promise<void> {
      try {
        const cartProducts = localStorage.getItem("@CoffeeDelivery:cartProducts")
  
        if (cartProducts) {
          setCartProducts([...JSON.parse(cartProducts)]);
        }
      } catch (err: any) {
        console.log(err);
      }
    }

    loadCartProducts();
  }, []);

  useEffect(() => {
    const cartProductsAux = [...cartProducts];

    //Soma do preço dos produtos no carrinho
    const sum = cartProductsAux.reduce((partialSum, item) => {
      return partialSum + item.priceAmount
    }, 0);
    setCartAmount(sum);

    //Quantidade de items no carrinho
    const quantity = cartProductsAux.reduce((partialSum, item) => partialSum + Number(item.quantity), 0);
    setQuantityProductsInCart(quantity);

    setDeliveryPrice(sum > 0 ? 3.5 : 0);
  }, [cartProducts])

  const addToCart = useCallback(
    async (product: Omit<Product, 'priceAmount'>) => {
      // Verificando se o produto já existe
      const productExists = cartProducts.find(p => p.id === product.id);

      const cartProductsAux = [...cartProducts];

      // Lista de produtos para gravar no AsyncStorage;
      let cartProductsAsyncStorage: Product[] = []; 

      if (productExists) {
        // Incrementando quantidade e preço de um produto caso ele já exista na lista
        const updatedCartProducts = cartProductsAux?.map(p =>
          p.id === product.id 
          ? { 
              ...product, 
              quantity: p.quantity + 1,
              priceAmount: Number(p.priceUnit) * (p.quantity + 1) //Multiplica preço unitário do produto com a quantidade dele no carrinho
            } 
          : p,
        );

        setCartProducts(updatedCartProducts);
        cartProductsAsyncStorage = updatedCartProducts;
      } else {
        // Inserindo a nova prop priceAmount e quantity no objeto de produto
        // Inserindo produto no carrinho com o preço e quantidade dele caso ele não exista
        const updatedCartProducts = [...cartProductsAux, {...product, quantity: 1, priceAmount: Number(product?.priceUnit)} ];
        setCartProducts(updatedCartProducts);
        cartProductsAsyncStorage = updatedCartProducts;
      }

    alert('Produto adicionado com sucesso!');

    localStorage.setItem(
        '@CoffeeDelivery:cartProducts',
        JSON.stringify(cartProductsAsyncStorage),
      );
    },
    [cartProducts],
  );

  const deleteToCart = useCallback(
    async (product: Product) => {
      // Buscando produto para deletar
      const productToDeleteIndex = cartProducts.indexOf(product);

      // Removendo produto do carrinho
        const cartProductsAux =  [...cartProducts];
        cartProductsAux.splice(productToDeleteIndex, 1);
        setCartProducts(cartProductsAux);
    

      localStorage.setItem(
        '@CoffeeDelivery:cartProducts',
        JSON.stringify(cartProductsAux),
      );
    },
    [cartProducts],
  );

  const incrementInCart = useCallback(
    async (id: string) => {
      const newProducts = cartProducts.map(p =>
        p.id === id 
        ? { 
            ...p, 
            quantity: p.quantity + 1, 
            priceAmount: p.priceUnit * (p.quantity + 1) 
          } 
        : p,
      );

      setCartProducts(newProducts);

      localStorage.setItem(
        '@CoffeeDelivery:cartProducts',
        JSON.stringify(newProducts),
      );
    },
    [cartProducts],
  );    
  

  const decrementInCart = useCallback(
    async (id: string) => {
      const newProducts = cartProducts.map(p =>
        p.id === id 
        ? { 
            ...p, 
            quantity: p.quantity <= 1 ? p.quantity : p.quantity - 1, 
            priceAmount: p.quantity > 1 ? p.priceAmount - p.priceUnit : p.priceAmount,
          } 
        : p,
      );

      setCartProducts(newProducts);

      localStorage.setItem(
        '@CoffeeDelivery:cartProducts',
        JSON.stringify(newProducts),
      );
    },
    [cartProducts],
  );

  //Resetar carrinho
  const resetCart = useCallback(async() => {
    setCartProducts([]);
    setCartAmount(0);
    setDeliveryPrice(0);
    setQuantityProductsInCart(0);

    localStorage.setItem(
      '@CoffeeDelivery:cartProducts',
      JSON.stringify([]),
    );
  }, [])

  const value = React.useMemo(
    () => ({ 
      addToCart, 
      deleteToCart, 
      incrementInCart, 
      decrementInCart, 
      resetCart, 
      cartProducts, 
      cartAmountInCurrencyFormat: formatValueToCurrencyInReal(cartAmount), 
      deliveryPrice, 
      quantityProductsInCart 
    }),
    [ 
      cartProducts, 
      cartAmount, 
      deliveryPrice, 
      quantityProductsInCart, 
      addToCart, 
      deleteToCart,
      incrementInCart, 
      decrementInCart, 
      resetCart
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };