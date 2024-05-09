const stock = [
    // Zapatillas
    {
        id: 1,
        tipo: 'zapatilla',
        marca: 'Adidas',
        modelo: 'Yezzy Boost 350 Oreo',
        precio: 100,
        img: "build/img/zapas-yeezy-oreo.webp",
        imagenesExtras: [
            "build/img/zapas-yeezy-oreo (2).webp",
            "build/img/zapas-yeezy-oreo (3).webp"
        ],
        talles: [42, 43, 44],
    },
    {
        id: 2,
        tipo: 'zapatilla',
        marca: 'Adidas',
        modelo: 'Yezzy Boost 350 Zebra',
        precio: 100,
        img: "build/img/zapas-yeezy-zebra.webp",
        imagenesExtras: [
            "build/img/zapas-yeezy-zebra (2).webp",
            "build/img/zapas-yeezy-zebra (3).webp"
        ],
        talles: [42, 43, 44],
    },
    {
        id: 3,
        tipo: 'zapatilla',
        marca: 'Adidas',
        modelo: 'Yezzy Boost 350 Black Red',
        precio: 100,
        img: "build/img/Adidas Yeezy Boost 350 V2 Black Red (3).webp",
        imagenesExtras: [
            "build/img/Adidas Yeezy Boost 350 V2 Black Red (1).webp",
            "build/img/Adidas Yeezy Boost 350 V2 Black Red (2).webp"
        ],
        talles: [42, 43, 44],
    },
    {
        id: 4,
        tipo: 'zapatilla',
        marca: 'Adidas',
        modelo: 'Adi2000',
        precio: 95,
        img: "build/img/adi2000 (2).webp",
        imagenesExtras: [
            "build/img/adi2000 (3).webp",
            "build/img/adi2000 (1).webp"
        ],
        talles: [42, 43, 44],
    },
    {
        id: 5,
        tipo: 'zapatilla',
        marca: 'Adidas',
        modelo: 'Forum Bad Bunny Blue',
        precio: 100,
        img: "build/img/Adidas Forum Low Bad Bunny Blue Tint (1).webp",
        imagenesExtras: [
            "build/img/Adidas Forum Low Bad Bunny Blue Tint (2).webp",
            "build/img/Adidas Forum Low Bad Bunny Blue Tint (3).webp"
        ],
        talles: [42, 43, 44],
    },
    {
        id: 6,
        tipo: 'zapatilla',
        marca: 'Adidas',
        modelo: 'Forum Bad Bunny Pink',
        precio: 100,
        img: "build/img/Adidas Forum Low Bad Bunny Pink (1).webp",
        imagenesExtras: [
            "build/img/Adidas Forum Low Bad Bunny Pink (2).webp",
            "build/img/Adidas Forum Low Bad Bunny Pink (3).webp"
        ],
        talles: [42, 43, 44],
    },
    {
        id: 7,
        tipo: 'zapatilla',
        marca: 'Nike',
        modelo: 'Jordan 4 Fear Retro',
        precio: 100,
        img: "build/img/Air Jordan 4 Fear Retro (2).webp",
        imagenesExtras: [
            "build/img/Air Jordan 4 Fear Retro (3).webp",
            "build/img/Air Jordan 4 Fear Retro (1).webp"
        ],
        talles: [42, 43, 44],
    },
    {
        id: 8,
        tipo: 'zapatilla',
        marca: 'Nike',
        modelo: 'Airforce 1 Supreme',
        precio: 95,
        img: "build/img/Airforce 1 supreme (2).webp",
        imagenesExtras: [
            "build/img/Airforce 1 supreme (1).webp",
            "build/img/Airforce 1 supreme (3).webp"
        ],
        talles: [42, 43, 44],
    },
    {
        id: 9,
        tipo: 'zapatilla',
        marca: 'Nike',
        modelo: 'Airforce 1 Double Air',
        precio: 95,
        img: "build/img/zapas-af1.webp",
        imagenesExtras: [
            "build/img/zapas-af1 (2).webp",
            "build/img/zapas-af1 (3).webp"
        ],
        talles: [42, 43, 44],
    },
    {
        id: 10,
        tipo: 'zapatilla',
        marca: 'Nike',
        modelo: 'Jordan 1 High Off-White Blue',
        precio: 100,
        img: "build/img/Nike Air Jordan 1 High Off-White University Blue (1).webp",
        imagenesExtras: [
            "build/img/Nike Air Jordan 1 High Off-White University Blue (2).webp",
            "build/img/Nike Air Jordan 1 High Off-White University Blue (3).webp"
        ],
        talles: [42, 43, 44],
    },
    {
        id: 11,
        tipo: 'zapatilla',
        marca: 'Nike',
        modelo: 'Jordan 1 Mid Orange',
        precio: 100,
        img: "build/img/Nike Air Jordan 1 Mid Barely Orange (1).webp",
        imagenesExtras: [
            "build/img/Nike Air Jordan 1 Mid Barely Orange (2).webp",
            "build/img/Nike Air Jordan 1 Mid Barely Orange (3).webp"
        ],
        talles: [42, 43, 44],
    },
    {
        id: 12,
        tipo: 'zapatilla',
        marca: 'Nike',
        modelo: 'Uptempo Black',
        precio: 100,
        img: "build/img/Nike Air Uptempo Black White (2).webp",
        imagenesExtras: [
            "build/img/Nike Air Uptempo Black White (1).webp",
            "build/img/Nike Air Uptempo Black White (3).webp"
        ],
        talles: [42, 43, 44],
    },
    {
        id: 13,
        tipo: 'zapatilla',
        marca: 'Nike',
        modelo: 'Dunk Low Lilac',
        precio: 95,
        img: "build/img/Nike Dunk Low Lilac (3).webp",
        imagenesExtras: [
            "build/img/Nike Dunk Low Lilac (2).webp",
            "build/img/Nike Dunk Low Lilac (1).webp"
        ],
        talles: [42, 43, 44],
    },
    {
        id: 14,
        tipo: 'zapatilla',
        marca: 'Nike',
        modelo: 'Dunk Low Off-White UNC',
        precio: 100,
        img: "build/img/Nike Dunk Low Off-White Futura UNC (2).webp",
        imagenesExtras: [
            "build/img/Nike Dunk Low Off-White Futura UNC (3).webp",
            "build/img/Nike Dunk Low Off-White Futura UNC (1).webp"
        ],
        talles: [42, 43, 44],
    },
    {
        id: 15,
        tipo: 'zapatilla',
        marca: 'Nike',
        modelo: 'Dunk Low Off-White Lot 1',
        precio: 100,
        img: "build/img/Nike Dunk Low Off-White Lot 1 (1).webp",
        imagenesExtras: [
            "build/img/Nike Dunk Low Off-White Lot 1 (2).webp",
            "build/img/Nike Dunk Low Off-White Lot 1 (3).webp"
        ],
        talles: [40],
    },
    {
        id: 16,
        tipo: 'zapatilla',
        marca: 'Nike',
        modelo: 'Dunk SB Travis Scott',
        precio: 100,
        img: "build/img/Nike SB Dunk Travis Scott (1).webp",
        imagenesExtras: [
            "build/img/Nike SB Dunk Travis Scott (2).webp",
            "build/img/Nike SB Dunk Travis Scott (3).webp"
        ],
        talles: [40],
    },
    // Buzos
    {
        id: 1,
        tipo: 'buzo',
        modelo: 'HOODIE GENETIC THEM - ORANGE',
        precio: 44,
        img: "build/img/1-ad.webp",
        imagenesExtras: [
            "build/img/1-at.webp",
            "build/img/logo.webp"
        ],
        talles: ["XXL"],
    },
    {
        id: 2,
        tipo: 'buzo',
        modelo: 'HOODIE BROTHERS BOND - BLACK',
        precio: 44,
        img: "build/img/2-ad.webp",
        imagenesExtras: [
            "build/img/2-at.webp",
            "build/img/logo.webp"
        ],
        talles: ["XXL"],
    },
    {
        id: 3,
        tipo: 'buzo',
        modelo: 'HOODIE COALLITION WHITE',
        precio: 44,
        img: "build/img/3-at.webp",
        imagenesExtras: [
            "build/img/3-ad.webp",
            "build/img/logo.webp"
        ],
        talles: ["XXL"],
    },
    {
        id: 4,
        tipo: 'buzo',
        modelo: 'HOODIE PHILOSOPHY - WHITE',
        precio: 44,
        img: "build/img/7-ad.webp",
        imagenesExtras: [
            "build/img/7-at.webp",
            "build/img/logo.webp"
        ],
        talles: ["XXL"],
    },
    {
        id: 5,
        tipo: 'buzo',
        modelo: 'HOODIE PHILOSOPHY - PINK',
        precio: 44,
        img: "build/img/8-at.webp",
        imagenesExtras: [
            "build/img/8-ad.webp",
            "build/img/logo.webp"
        ],
        talles: ["XXL"],
    },
    {
        id: 6,
        tipo: 'buzo',
        modelo: 'HOODIE PHILOSOPHY - GRAY',
        precio: 44,
        img: "build/img/9-ad.webp",
        imagenesExtras: [
            "build/img/9-at.webp",
            "build/img/logo.webp"
        ],
        talles: ["XXL"],
    },
    {
        id: 7,
        tipo: 'buzo',
        modelo: 'HOODIE PURPLE TEDDY',
        precio: 40,
        img: "build/img/10-at.webp",
        imagenesExtras: [
            "build/img/10-ad.webp",
            "build/img/logo.webp"
        ],
        talles: ["L"],
    },
    {
        id: 8,
        tipo: 'buzo',
        modelo: 'HOODIE HOLY',
        precio: 40,
        img: "build/img/11-at.webp",
        imagenesExtras: [
            "build/img/11-ad.webp",
            "build/img/logo.webp"
        ],
        talles: ["M"],
    },
    {
        id: 9,
        tipo: 'buzo',
        modelo: 'HOODIE UNIVERSITY',
        precio: 40,
        img: "build/img/12-at.webp",
        imagenesExtras: [
            "build/img/12-ad.webp",
            "build/img/logo.webp"
        ],
        talles: ["L"],
    },
    {
        id: 10,
        tipo: 'buzo',
        modelo: 'HOODIE DOLLAR',
        precio: 40,
        img: "build/img/13-at.webp",
        imagenesExtras: [
            "build/img/13-ad.webp",
            "build/img/logo.webp"
        ],
        talles: ["L"],
    },
    {
        id: 11,
        tipo: 'buzo',
        modelo: 'HOODIE LETAL',
        precio: 40,
        img: "build/img/14-at.webp",
        imagenesExtras: [
            "build/img/14-ad.webp",
            "build/img/logo.webp"
        ],
        talles: ["L"],
    },
    {
        id: 12,
        tipo: 'buzo',
        modelo: 'HOODIE LEBRON',
        precio: 40,
        img: "build/img/15-at.webp",
        imagenesExtras: [
            "build/img/15-ad.webp",
            "build/img/logo.webp"
        ],
        talles: ["M"],
    },
    {
        id: 13,
        tipo: 'buzo',
        modelo: 'HOODIE GEARS',
        precio: 40,
        img: "build/img/16-at.webp",
        imagenesExtras: [
            "build/img/16-ad.webp",
            "build/img/logo.webp"
        ],
        talles: ["XL"],
    },
    {
        id: 14,
        tipo: 'buzo',
        modelo: 'HOODIE RAINBOW',
        precio: 40,
        img: "build/img/17-at.webp",
        imagenesExtras: [
            "build/img/17-ad.webp",
            "build/img/logo.webp"
        ],
        talles: ["M"],
    },
    // Remeras
    {
        id: 1,
        tipo: 'remera',
        modelo: 'T-SHIRT WICKEDHEART - GRAY',
        precio: 21,
        img: "build/img/4-ad-r.webp",
        imagenesExtras: [
            "build/img/4-at-r.webp",
            "build/img/logo.webp"
        ],
        talles: ["M"],
    },
    {
        id: 2,
        tipo: 'remera',
        modelo: 'T-SHIRT BRO BE UNITED - BLACK',
        precio: 21,
        img: "build/img/rem-1-ad-r.webp",
        imagenesExtras: [
            "build/img/rem-1-at-r.webp",
            "build/img/logo.webp"
        ],
        talles: ["M"],
    },
    {
        id: 3,
        tipo: 'remera',
        modelo: 'T-SHIRT DARK SIDE',
        precio: 21,
        img: "build/img/5-at-r.webp",
        imagenesExtras: [
            "build/img/5-ad-r.webp",
            "build/img/logo.webp"
        ],
        talles: ["M"],
    },
    {
        id: 4,
        tipo: 'remera',
        modelo: 'LINE WHITE',
        precio: 21,
        img: "build/img/reme2-ad.webp",
        imagenesExtras: [
            "build/img/reme2-at.webp",
            "build/img/logo.webp"
        ],
        talles: ["M"],
    },
    {
        id: 4,
        tipo: 'remera',
        modelo: 'PAINTINGS BLACK',
        precio: 21,
        img: "build/img/reme1-ad.webp",
        imagenesExtras: [
            "build/img/reme1-at.webp",
            "build/img/logo.webp"
        ],
        talles: ["M"],
    },
];