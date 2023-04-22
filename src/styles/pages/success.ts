import { styled } from "..";

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  margin: '0 auto',
  height: 'calc(100vh - 190px)',

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4,
  },

  a: {
    display: 'block',
    marginTop: '5rem',
    fontSize: '$lg',
    color: '$green500',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      color: '$green300',
    }
  }
});

export const ImageListContainer = styled('ul', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  marginTop: '4rem',

  'li + li': {
    marginLeft: '-20%'
  },
});

export const ImageContainer = styled('li', {
  width: '100%',
  maxWidth: 140,
  height: 145,
  padding: '0.25rem',

  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 70,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  boxShadow: '-3px 0 10px 0 rgba(0, 0, 0, .4)',

  img: {
    objectFit: 'cover',
  }
});
