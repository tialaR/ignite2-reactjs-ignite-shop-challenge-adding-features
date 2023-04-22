import { styled } from "../../styles";

export const CartItemCardContainer = styled('li', {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    paddingRight: '1rem',

    img: {
        width: '6.25rem',
        height: '5.813rem',

        background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',

        objectFit: 'contain',

        borderRadius: 8,
        overflow: 'hidden',
    }
})

export const CartItemCardContainerDescription = styled('div', {
    marginLeft: '1.25rem',
    marginRight: 'auto',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',

    div: {
        display: 'flex',
        flexDirection: 'column',
    },

    span: {
        color: '$gray300',
        fontSize: '$md',
    },

    'span + span': {
        marginTop: '0.5rem',

        fontWeight: 700,
    },

    button: {
        display: 'block',
        marginTop: '1rem',

        border: 0,
        color: '$green500',

        fontSize: '$sm',
        fontWeight: 700,
    }
})

export const SumOrDecreaseContainer = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: '5.5rem',
    height: '2rem',
    padding: '0.5rem',

    backgroundColor: '$green300',

    borderRadius: 8,

    span: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '0.125rem',
        paddingRight: '0.125rem',
    },

    button: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',

        fontSize: '$lg',
        fontWeight: 600,
        textAlign: 'center',

        color: '$gray100',
    }
})