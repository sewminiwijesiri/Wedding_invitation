export const weddingData = {
  couple: {
    bride: "Sanduni",
    groom: "Yasas",
    brideSi: "සඳුනි",
    groomSi: "යසස්",
    initials: "Y & S",
    monogram: "Y&S",
    hashtag: "#YasasAndSanduni2026",
    quote: {
      en: "Two souls with but a single thought, two hearts that beat as one.",
      si: "එක් සිතුවිල්ලකින් බැඳුණු ආත්ම දෙකක්, එකට ගැහෙන හදවත් දෙකක්."
    },
    parentBlessing: {
      en: "With the blessing of God and our beloved parents, we cordially invite you to celebrate our Wedding.",
      si: "දෙමාපියන්ගේ ආශිර්වාදයෙන් යුතුව, අපගේ විවාහ මංගල්‍යය වෙනුවෙන් ඔබ සැමට ගෞරවයෙන් ආරාධනා කරමු."
    },
    heroImage: "/images/couple_hero.jpg"
  },
  date: {
    target: "2026-10-16T16:30:00",
    day: "16",
    month: "October",
    monthEn: "October",
    monthSi: "ඔක්තෝබර්",
    year: "2026",
    dayName: "Friday",
    dayNameEn: "Friday",
    dayNameSi: "සිකුරාදා",
    fullDate: {
      en: "Friday, October 16, 2026",
      si: "2026 ඔක්තෝබර් 16 සිකුරාදා"
    }
  },
  music: {
    title: "A Thousand Years & Golden Melodies",
    artist: "The Wedding Symphony Orchestra",
    subtitle: {
      en: "Play our favorite song",
      si: "අපගේ ආදර ගීතයට සවන් දෙන්න"
    }
  },
  events: [
    {
      id: "ceremony",
      type: "religious",
      title: {
        en: "Wedding Ceremony",
        si: "මංගල චාරිත්‍ර හා ආශිර්වාදය"
      },
      time: "4:30 PM",
      timeSi: "පස්වරු 4:30",
      venue: "St. Francis Cathedral & Gardens",
      venueSi: "ශාන්ත ෆ්‍රැන්සිස් දේවස්ථානය හා උද්‍යානය",
      address: "140 Rose Garden Avenue, Historic District",
      addressSi: "අංක 140, රෝස මාවත, ඓතිහාසික නගරය",
      mapQuery: "St Francis Cathedral",
      mapUrl: "https://maps.google.com/?q=St+Francis+Cathedral",
      note: {
        en: "Please arrive 15 minutes before the ceremony commences",
        si: "කරුණාකර චාරිත්‍ර ආරම්භ වීමට විනාඩි 15කට පෙර පැමිණෙන්න"
      }
    },
    {
      id: "reception",
      type: "party",
      title: {
        en: "Reception & Gala Dinner",
        si: "මංගල සාදය සහ රාත්‍රී භෝජන සංග්‍රහය"
      },
      time: "6:00 PM",
      timeSi: "පස්වරු 6:00",
      venue: "Villa Vendimia & Cascade Terrace",
      venueSi: "විලා වෙන්ඩිමියා ප්‍රසංග ශාලාව",
      address: "45 Royal Vineyard Way, Golden Valley",
      addressSi: "අංක 45, රෝයල් විනයාඩ් මාවත, ගෝල්ඩන් වැලි",
      mapQuery: "Villa Vendimia",
      mapUrl: "https://maps.google.com/?q=Villa+Vendimia",
      note: {
        en: "Welcome cocktail followed by dinner, toasts & dancing",
        si: "පිළිගැනීමේ සංග්‍රහය, රාත්‍රී භෝජනය, සුබපැතුම් සහ ප්‍රීතිමත් නැටුම්"
      }
    }
  ],
  itinerary: [
    {
      time: "4:30 PM",
      timeSi: "ප.ව. 4:30",
      icon: "church",
      title: { en: "Wedding Ceremony", si: "මංගල චාරිත්‍ර" },
      desc: { en: "Sacred union of love & vows", si: "ආදරයේ සදාතනික එක්වීම හා පොරොන්දු" }
    },
    {
      time: "5:45 PM",
      timeSi: "ප.ව. 5:45",
      icon: "cocktail",
      title: { en: "Welcome Cocktail", si: "පිළිගැනීමේ සංග්‍රහය" },
      desc: { en: "Champagne, hors d'oeuvres & acoustic music", si: "ෂැම්පේන්, රසවත් කෙටි ආහාර හා මියුරු සංගීතය" }
    },
    {
      time: "7:00 PM",
      timeSi: "ප.ව. 7:00",
      icon: "dance",
      title: { en: "Grand Entrance & First Dance", si: "යුවලගේ ප්‍රවේශය හා පළමු නැටුම" },
      desc: { en: "Toast with the newlyweds", si: "අභිනව යුවල පිළිගැනීම සහ ප්‍රීතිමත් සුබපැතුම්" }
    },
    {
      time: "8:00 PM",
      timeSi: "ප.ව. 8:00",
      icon: "dinner",
      title: { en: "Gala Dinner", si: "රාත්‍රී භෝජන සංග්‍රහය" },
      desc: { en: "Four-course gourmet banquet", si: "විශේෂිත රසවත් මංගල භෝජන සංග්‍රහය" }
    },
    {
      time: "9:30 PM",
      timeSi: "ප.ව. 9:30",
      icon: "party",
      title: { en: "Party & Dancing", si: "සංගීතය සහ විනෝදය" },
      desc: { en: "Live band, DJ and open bar", si: "සජීවී සංගීතය, ඩී.ජේ සහ ප්‍රීතිමත් නර්තනය" }
    },
    {
      time: "2:00 AM",
      timeSi: "පෙ.ව. 2:00",
      icon: "sparkler",
      title: { en: "Sparkler Farewell", si: "ආදරණීය සමුගැනීම" },
      desc: { en: "Send-off with sparklers of love", si: "දීප්තිමත් ආශිර්වාද මැද සමුගැනීම" }
    }
  ],
  dressCode: {
    title: { en: "Dress Code", si: "ඇඳුම් විලාසිතාව" },
    type: { en: "Black Tie / Elegant Formal", si: "නිල සහ අලංකාර ඇඳුම් විලාසිතාව" },
    women: {
      en: "Floor-length evening gown or elegant formal attire.",
      si: "කාන්තාවන් සඳහා සම්ප්‍රදායික ඔසරිය/සාරිය හෝ අලංකාර දිගු ගවුම්."
    },
    men: {
      en: "Formal suit or tuxedo with tie or bow-tie.",
      si: "පිරිමින් සඳහා සම්පූර්ණ නිල ඇඳුම් කට්ටලය හෝ ජාතික ඇඳුම."
    },
    note: {
      en: "Kindly reserve pure white and ivory exclusively for the bride.",
      si: "සුදු සහ ක්‍රීම් පැහැයන් මනාලිය වෙනුවෙන් වෙන් කර ඇති බව කරුණාවෙන් සලකන්න."
    },
    palette: [
      { name: "Champagne Gold", hex: "#D4AF37", border: "#B5942B" },
      { name: "Warm Beige", hex: "#DFD5C6", border: "#C8BCAB" },
      { name: "Taupe Velvet", hex: "#8A7968", border: "#6D5E4F" },
      { name: "Velvet Charcoal", hex: "#222222", border: "#111111" }
    ]
  },
  giftRegistry: {
    title: { en: "Gift Registry & Wishes", si: "සුබපැතුම් සහ තිළිණ" },
    message: {
      en: "The greatest gift is having you with us on our special day. However, if you wish to honor us with a gift or contribute to our honeymoon, here are the options:",
      si: "අපගේ විශේෂ දිනයට ඔබගේ පැමිණීම අපට ලැබෙන උතුම්ම ත්‍යාගයයි. ඔබ අප වෙනුවෙන් තිළිණයක් පිරිනැමීමට හෝ සුබපැතුම් එක් කිරීමට කැමති නම්:"
    },
    bankDetails: {
      bank: "Commercial Bank / Bank of Ceylon",
      holder: "Yasas & Sanduni",
      clabe: "012 180 0154897214 90",
      account: "6550 4932 8109",
      concept: "Wedding Y&S"
    },
    digitalWallet: {
      type: "Online Transfer / Digital Gift",
      handle: "yasas.sanduni.wedding@gmail.com"
    }
  },
  recommendations: [
    {
      icon: "heart",
      title: { en: "Punctuality", si: "වේලාවට පැමිණීම" },
      desc: {
        en: "Please follow coordinator guidelines and arrive early to cherish every moment.",
        si: "මංගල උත්සවයේ සියලු සුන්දර අවස්ථාවන් භුක්ති විඳීමට නියමිත වේලාවට පෙර පැමිණෙන්න."
      }
    },
    {
      icon: "child",
      title: { en: "Adults Only", si: "වැඩිහිටියන් පමණයි" },
      desc: {
        en: "An adults-only celebration. While we adore your little ones, we hope you enjoy a wonderful night out.",
        si: "මෙය වැඩිහිටියන් වෙනුවෙන් වෙන් වූ රාත්‍රියකි. ඔබ සැමට ප්‍රීතිමත් නිදහස් රාත්‍රියක් ගත කිරීමට ආරාධනා කරමු."
      }
    },
    {
      icon: "clock",
      title: { en: "Timely RSVP", si: "කලින් තහවුරු කිරීම" },
      desc: {
        en: "Please confirm your attendance before October 1st to reserve your seats.",
        si: "ඔබගේ ආසන වෙන් කරවා ගැනීම සඳහා ඔක්තෝබර් 01 වන දිනට පෙර පැමිණීම තහවුරු කරන්න."
      }
    }
  ],
  gallery: [
    {
      src: "/images/couple_hero.jpg",
      caption: { en: "Yasas & Sanduni", si: "යසස් සහ සඳුනි" },
      tag: "Pre-shoot"
    },
    {
      src: "/images/couple_walk.jpg",
      caption: { en: "A Love Story", si: "ආදරණීය මතකයන්" },
      tag: "Together"
    },
    {
      src: "/images/couple_intimate.jpg",
      caption: { en: "Forever Begins Here", si: "සදාතනික ආදරයේ ඇරඹුම" },
      tag: "Forever"
    }
  ]
};
