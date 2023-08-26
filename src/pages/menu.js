const menus = [
    {
        id: 1,
        name: 'Inicio',
        links: '/',
    },
    {
        id: 2,
        name: 'Mint',
        links: 'mint'
    },
    {
        id: 4,
        name: 'Swap',
        links: '/swap'
    },
    {
        id: 5,
        name: 'Coleccion',
        links: '/coleccion',
    },
    {
        id: 6,
        name: 'Tienda',
        links: 'tienda'
    },
     {
         id: 7,
         name: 'Cuenta',
         links: '#',
         namesub: [
            {
                id: 1,
                sub: 'Sign In / SignUp',
                links: '/sesion'
            },

            {
                id: 2,
                sub: 'Orders',
                links: '/ordenes'
            },
            {
                id: 3,
                sub: 'Pagos',
                links: '/explore-v3'
            },

        ]
     },
     {
        id: 8,
        name: 'Cuenta',
        links: '#',
        namesub: [
           {
               id: 1,
               sub: 'LogOut',
               links: '#'
           },
           {
            id: 2,
            sub: 'Carrito',
            links: '/carro-compras'
        },
           {
               id: 3,
               sub: 'Orders',
               links: '/ordenes'
           },
           {
            id: 4,
            sub: 'Pagos',
            links: '/retiro'
        },

       ]
    },
    {
        id: 9,
        name: 'Admin',
        links: '/admin',
    },
    
]

export default menus;