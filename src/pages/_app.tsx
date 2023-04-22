import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"
import { CartProvider } from "@/hooks/useCart"

globalStyles()

function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default App