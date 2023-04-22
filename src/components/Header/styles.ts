import { styled } from "../../styles";

//Estilização do Header
export const HeaderContainer = styled('header', {
    padding: '2rem 0',
    width: '100%',
    maxWidth: 1180,
    margin: '0 auto',

    display: 'flex',
    justifyContent: 'space-between',

    '>img': {
      cursor: 'pointer',

      paddingLeft: '0.5rem',

      transition: 'opacity 0.1s',

      '&:hover': {
        opacity: 0.8,
      }
    },

    button: {
      position: 'relative',

      border: 0,
      borderRadius: 6,
      padding: '0.75rem',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      cursor: 'pointer',

      transition: 'opacity 0.1s',

      backgroundColor: '$gray800',

      span: {
        position: 'absolute',
        top: -8,
        right: -8,

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        width: '1.5rem',
        height: '1.5rem',

        backgroundColor: '$green300',
        color: '$white',

        fontWeight: 700,

        borderRadius: 24,
      },

      '&:hover': {
        opacity: 0.8,
      }
    }
  })
