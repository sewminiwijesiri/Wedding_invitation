export const weddingData = {
  couple: {
    bride: "Fernanda",
    groom: "Gustavo",
    initials: "F & G",
    monogram: "F&G",
    hashtag: "#FernandaAndGustavo2026",
    quote: {
      en: "Two souls with but a single thought, two hearts that beat as one.",
      es: "Dos almas con un solo pensamiento, dos corazones que laten como uno solo."
    },
    parentBlessing: {
      en: "With the blessing of God and our beloved parents, we cordially invite you to celebrate our Wedding.",
      es: "Con la bendición de Dios y de nuestros queridos padres, tenemos el honor de invitarles a nuestra Boda."
    }
  },
  date: {
    target: "2026-11-14T16:30:00",
    day: "14",
    month: "November",
    monthEn: "November",
    monthEs: "Noviembre",
    year: "2026",
    dayName: "Saturday",
    dayNameEn: "Saturday",
    dayNameEs: "Sábado",
    fullDate: {
      en: "Saturday, November 14, 2026",
      es: "Sábado, 14 de Noviembre de 2026"
    }
  },
  music: {
    title: "A Thousand Years & Golden Melodies",
    artist: "The Wedding Symphony Orchestra",
    subtitle: {
      en: "Play our favorite song",
      es: "Dale play a nuestra canción"
    }
  },
  events: [
    {
      id: "ceremony",
      type: "religious",
      title: {
        en: "Wedding Ceremony",
        es: "Ceremonia Religiosa"
      },
      time: "4:30 PM",
      venue: "St. Francis Cathedral & Gardens",
      address: "140 Rose Garden Avenue, Historic District",
      mapQuery: "St Francis Cathedral",
      mapUrl: "https://maps.google.com/?q=St+Francis+Cathedral",
      note: {
        en: "Please arrive 15 minutes before the ceremony commences",
        es: "Por favor llegar 15 minutos antes de iniciar"
      }
    },
    {
      id: "reception",
      type: "party",
      title: {
        en: "Reception & Gala Dinner",
        es: "Recepción y Fiesta"
      },
      time: "6:00 PM",
      venue: "Villa Vendimia & Cascade Terrace",
      address: "45 Royal Vineyard Way, Golden Valley",
      mapQuery: "Villa Vendimia",
      mapUrl: "https://maps.google.com/?q=Villa+Vendimia",
      note: {
        en: "Welcome cocktail followed by dinner, toasts & dancing",
        es: "Cóctel de bienvenida seguido de la cena y fiesta"
      }
    }
  ],
  itinerary: [
    {
      time: "4:30 PM",
      icon: "church",
      title: { es: "Ceremonia Religiosa", en: "Wedding Ceremony" },
      desc: { es: "Encuentro sagrado de amor", en: "Sacred union of love" }
    },
    {
      time: "5:45 PM",
      icon: "cocktail",
      title: { es: "Cóctel de Bienvenida", en: "Welcome Cocktail" },
      desc: { es: "Champagne, aperitivos y música acústica", en: "Champagne, hors d'oeuvres & acoustic music" }
    },
    {
      time: "7:00 PM",
      icon: "dance",
      title: { es: "Entrada & Primer Baile", en: "Grand Entrance & First Dance" },
      desc: { es: "Brindis con los recién casados", en: "Toast with the newlyweds" }
    },
    {
      time: "8:00 PM",
      icon: "dinner",
      title: { es: "Cena de Gala", en: "Gala Dinner" },
      desc: { es: "Banquete gourmet de 4 tiempos", en: "Four-course gourmet banquet" }
    },
    {
      time: "9:30 PM",
      icon: "party",
      title: { es: "Fiesta y Celebración", en: "Party & Dancing" },
      desc: { es: "Música en vivo, DJ y barra libre", en: "Live band, DJ and open bar" }
    },
    {
      time: "2:00 AM",
      icon: "sparkler",
      title: { es: "Fin de la Velada", en: "Sparkler Farewell" },
      desc: { es: "Despedida con destellos de amor", en: "Send-off with sparklers of love" }
    }
  ],
  dressCode: {
    title: { es: "Código de Vestimenta", en: "Dress Code" },
    type: { es: "Rigurosa Etiqueta / Elegante", en: "Black Tie / Elegant Formal" },
    women: {
      es: "Vestido largo de noche o gala en tonos elegantes.",
      en: "Floor-length evening gown in elegant shades."
    },
    men: {
      es: "Traje formal o smoking con corbata o corbatín.",
      en: "Formal suit or tuxedo with tie or bow-tie."
    },
    note: {
      es: "Agradecemos reservar los tonos blanco y marfil exclusivamente para la novia.",
      en: "Kindly reserve pure white and ivory exclusively for the bride."
    },
    palette: [
      { name: "Champagne Gold", hex: "#D4AF37", border: "#B5942B" },
      { name: "Warm Beige", hex: "#DFD5C6", border: "#C8BCAB" },
      { name: "Taupe Velvet", hex: "#8A7968", border: "#6D5E4F" },
      { name: "Velvet Charcoal", hex: "#222222", border: "#111111" }
    ]
  },
  giftRegistry: {
    title: { es: "Sugerencia de Regalo", en: "Gift Registry" },
    message: {
      es: "El mejor regalo es su presencia en este día tan especial. Pero si desean hacernos un detalle o contribuir a nuestra luna de miel, les dejamos las siguientes opciones:",
      en: "The greatest gift is having you with us on our special day. However, if you wish to honor us with a gift or contribute to our honeymoon, here are the options:"
    },
    bankDetails: {
      bank: "Banco Santander",
      holder: "Fernanda & Gustavo",
      clabe: "012 180 0154897214 90",
      account: "6550 4932 8109",
      concept: "Boda F&G"
    },
    digitalWallet: {
      type: "Zelle / Venmo",
      handle: "fernanda.gustavo.boda@gmail.com"
    }
  },
  recommendations: [
    {
      icon: "heart",
      title: { es: "Puntualidad", en: "Punctuality" },
      desc: {
        es: "Seguir las indicaciones del personal y llegar con anticipación para disfrutar cada momento.",
        en: "Please follow coordinator guidelines and arrive early to cherish every moment."
      }
    },
    {
      icon: "child",
      title: { es: "Solo Adultos", en: "Adults Only" },
      desc: {
        es: "Un respiro para adultos. Aunque adoramos a los pequeños, deseamos que todos puedan relajarse y disfrutar la fiesta.",
        en: "An adults-only celebration. While we adore your little ones, we hope you enjoy a wonderful night out."
      }
    },
    {
      icon: "clock",
      title: { es: "Confirmación Oportuna", en: "Timely RSVP" },
      desc: {
        es: "Favor de confirmar su asistencia antes del 01 de Noviembre para reservar sus lugares.",
        en: "Please confirm your attendance before November 1st to reserve your seats."
      }
    }
  ],
  gallery: [
    {
      src: "/images/couple_hero.jpg",
      caption: { es: "Jardín de Villa Cascada", en: "Villa Cascada Terrace" },
      tag: "Golden Hour"
    },
    {
      src: "/images/couple_walk.jpg",
      caption: { es: "Paseo entre viñedos", en: "Walk Through The Vineyards" },
      tag: "Candid Love"
    },
    {
      src: "/images/couple_intimate.jpg",
      caption: { es: "Risas y promesas eternas", en: "Laughter & Forever Promises" },
      tag: "Intimate Joy"
    }
  ]
};
