import { styled } from "../../styles";

//Estilização da página toda
export const Container = styled('div', {
  position:'relative',
//   justifyContent: 'center',
   /* Faz com que a página ocupe a tela toda, como
  sae fosse um Full Screen */

  main: {
    marginTop: '5rem',
  }
})

export const ShoppingCartMenuContainer = styled('nav', {
    position: 'fixed',
    top: 0,
    right: 0,

    height: '100vh',
    width: '30rem',

    display: 'flex',
    flexDirection: 'column',

    paddingTop: '1.5rem',
    paddingRight: '3rem',
    paddingLeft: '3rem',
    paddingBottom: '3rem',

    backgroundColor: '$gray800',
    
    '&.active': {
      zIndex: 10,
      transform: 'translateX(0%)',
      transition: 'transform .4s ease',
    },

    '&.exit': {
      transform: 'translateX(100%)',
      transition: 'transform .4s ease',
    },
    
    button: {
      marginLeft: 'auto',

      border: 0,
      backgroundColor: 'transparent',
      cursor: 'pointer',

      transition: 'opacity 0.1s',

      '&:hover': {
        opacity: 0.8,
      }
    },

    h3: {
      color: '$gray100',
      fontWeight: 700,
      fontSize: '$lg',

      marginTop: '1.5rem'
    },
})

export const ShoppingCartMenuList = styled('ul', {
  marginTop: '2rem',

  maxHeight: 'calc(100vh - 250px)',
  overflowY: 'auto',

  li: {
    marginTop: '1.5rem'
  }
})

export const ShoppingCartMenuFooter = styled('footer', {
  display: 'flex',
  flexDirection: 'column',

  marginTop: 'auto',
  paddingTop: '1rem',

  div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    color: '$gray100',
    fontSize: '$sm'
  },

  'div + div': {
    marginTop: '0.5rem',

    fontWeight: 700,
    fontSize: '$lg'
  },

  button: {
    marginTop: '3.563rem',

    borderRadius: 8,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',
    height: '4.313rem',

    backgroundColor: '$green500',
    color: '$white',

    fontSize: '$lg',
    fontWeight: 700,
  }
})

export const ShoppingCartMenuEmptyContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  flex: 1,

  padding: '2rem',
  marginBottom: '4rem',

  span: {
    color: '$gray300',
    fontSize: '$md',

    textAlign: 'center'
  }
})