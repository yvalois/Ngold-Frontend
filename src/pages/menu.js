const menus = [
    // {
    //     id: 1,
    //     name: 'Inicio',
    //     links: '/',
    // },
    {
        id: 2,
        name: 'Comprar Golden ELF',
        links: 'mint'
    },
    {
        id: 4,
        name: 'Swap',
        links: '/swap'
    },
    {
        id: 4,
        name: 'Pools',
        links: '/Pool'
    },
    {
        id: 5,
        name: 'Inventario',
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
            }

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
               links: ''
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
        {
            id: 5,
            sub: 'Admin',
            links: '/admin',
        }

       ]
    },
    
]

export default menus;