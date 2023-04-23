import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

type ProductsToBy = {
  priceId: string
  quantity: number
}

type LineItem = {
  price: string
  quantity: number
}


// AÇÃO RELAIZADA APÓS O CLICK NO BOTÃO COMPRAR  (ROTA SERVER SIDE ACESSADA)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Recupoerando o param enviado no corpo da requisição 
  const { procuts } = req.body;

  /* -> Devido ao fato do Next não diferenciar rotas HTTP e para evitar que o
        usuário tente acessar essas rotas com os métodos errados via url eu posso 
        fazer a segunte tratativa para evitar essa ação:
     -> Vai cair no catch */
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  /* -> Para evitar possíveis erros -> Caso a rota seja enviada sem o param 
        que ela precisa posso enviar uma mensagem de erro para a aplicação
     -> Vai cair no catch */
  if (!procuts || procuts?.lenght <= 0) {
    return res.status(400).json({ error: 'Products not found.' });
  }

  // session_id={CHECKOUT_SESSION_ID} é o parâmetro q/ é enviado p/ página de sucesso com o uso do stripe
  //Isso faz com que a url da página de sucesso receba um session_id como parametro
  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;

  const cancelUrl = `${process.env.NEXT_URL}/`;

  //Array de produtos para comprar pelo Stripe
  const lineItems: LineItem[] = procuts?.map((item: ProductsToBy) => {
    return {
      price: item?.priceId, //Id do preço do produto
      quantity: item?.quantity, // Quantidade de produtos
    }
  })

  // Criando uma sessão no stripe
  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl, //Redireciona para uma página de success após pagamento com sucesso 
    cancel_url: cancelUrl, //Volta para a página anterior
    mode: 'payment',
    line_items: lineItems,
  })

  return res.status(201).json({ //201 - Created
    checkoutUrl: checkoutSession.url //Redireciona para uma página do stripe p/ realizar pagamento
  })
}