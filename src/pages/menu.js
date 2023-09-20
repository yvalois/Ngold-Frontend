const menus = [
    {
         id: 1,
         name: 'Inicio Home',
         links: '/',
     },
    {
        id: 2,
        name: 'Comprar-Buy Golden ELF',
        links: 'mint'
    },
    {
        id: 4,
        name: 'Comprar-Buy NGOLD',
        links: '/swap'
    },
    {
        id: 4,
        name: 'Staking NGOLD',
        links: '/Pool'
    },
    {
        id: 5,
        name: 'Inventario My NFTs',
        links: '/coleccion',
    },
    {
        id: 6,
        name: 'Tienda Store',
        links: 'tienda'
    },
     {
         id: 7,
         name: 'Cuenta Account',
         links: '#',
         namesub: [
            {
                id: 1,
                sub: 'Sign In / SignUp',
                links: '/sesion'
            }

        ]
     },
     {
        id: 8,
        name: 'Cuenta Account',
        links: '#',
        namesub: [
           {
               id: 1,
               sub: 'LogOut',
               links: ''
           },
           {
            id: 2,
            sub: 'Car - Carrito',
            links: '/carro-compras'
        },
           {
               id: 3,
               sub: 'Ordenes - Orders',
               links: '/ordenes'
           },
           {
            id: 4,
            sub: 'Pagos - Paids',
            links: '/retiro'
        },
        {
            id: 5,
            sub: 'Admin',
            links: '/admin',
        }

       ]
    },
    
]

export default menus;