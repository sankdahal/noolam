export type SilkType =
  | 'Kanjivaram'
  | 'Banarasi'
  | 'Koorai Check'
  | 'Palace Tissue'
  | 'Tussar Silk'
  | 'Silk Blouse';

export type OccasionType =
  | 'Bridal'
  | 'Wedding'
  | 'Festive'
  | 'Temple'
  | 'Reception'
  | 'Tailored';

export type AvailabilityStatus = 'In Stock' | 'Limited Run' | 'Bespoke';

export interface Product {
  id: string;
  slug: string;
  name: string;
  silkType: SilkType;
  collection: string;
  occasion: OccasionType;
  color: string;
  colorHex: string;
  price: number;
  originalPrice?: number;
  availability: AvailabilityStatus;
  isNewArrival?: boolean;
  images: string[];
  shortDescription: string;
  description: string;
  fabricDetails: string;
  zariDetails: string;
  lengthDetails: string;
  origin: string;
  weaveHours: number;
  careNote: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  mood: string;
  image: string;
  sareeId: string;
  blouseNote: string;
  jewelleryNote: string;
  drapeStyle: string;
}

export interface SilkVariety {
  id: string;
  name: string;
  filterSilk: SilkType;
  tagline: string;
  origin: string;
  accentBg: string;
  image: string;
}

export interface WeaveSwatch {
  id: string;
  name: string;
  silkType: string;
  colorHex: string;
  zariHex: string;
  priceAddon: number;
  note: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'noolam-01',
    slug: 'sindoor-temple-korvai-kanjivaram',
    name: 'Sindoor Temple Korvai Kanjivaram',
    silkType: 'Kanjivaram',
    collection: 'Temple Heritage',
    occasion: 'Bridal',
    color: 'Sindoor Crimson',
    colorHex: '#9E1B24',
    price: 48500,
    originalPrice: 54000,
    availability: 'In Stock',
    isNewArrival: true,
    images: [
      '/images/look-crimson-temple.jpg',
      '/images/bridal-sindoor.jpg',
      '/images/weave-handloom.jpg',
    ],
    shortDescription: 'Three-shuttle korvai crimson Kanjivaram with pure silver-gold temple borders.',
    description:
      'Woven across eleven days on a traditional Kanchipuram pit loom, the Sindoor Temple Korvai pairs luminous vermilion-crimson body silk with an interlocked rani-pink and 2G pure zari temple border. Gold chakra buttis dot the drape with quiet auspicious symmetry.',
    fabricDetails: '100% Pure 3-Ply Twisted Mulberry Silk (Silk Mark Certified)',
    zariDetails: 'Pure Silver Thread Electroplated with 24K Gold (2G Tested Zari)',
    lengthDetails: '6.25 metres total (including 0.90m unstitched contrast blouse piece)',
    origin: 'Kanchipuram, Tamil Nadu',
    weaveHours: 88,
    careNote: 'Dry clean only. Store wrapped in unbleached muslin cloth away from direct light.',
  },
  {
    id: 'noolam-02',
    slug: 'chandrika-ivory-zari-check',
    name: 'Chandrika Ivory Zari Check',
    silkType: 'Kanjivaram',
    collection: 'Six Moods',
    occasion: 'Temple',
    color: 'Warm Ivory',
    colorHex: '#EDE4D3',
    price: 39800,
    availability: 'In Stock',
    isNewArrival: true,
    images: [
      '/images/look-ivory-gold.jpg',
      '/images/silk-palace-gold.jpg',
      '/images/weave-handloom.jpg',
    ],
    shortDescription: 'Luminous kora-ivory Kanjivaram woven with fine gold katam checks and yali border.',
    description:
      'Inspired by dawn rituals at Ekambareswarar temple, the Chandrika weaves delicate pure zari katam checks across unbleached ivory mulberry silk. Finished with a wide paisley-and-peacock korvai border and hand-knotted kuchu tassels.',
    fabricDetails: '100% Pure Handspun Mulberry Silk',
    zariDetails: 'Pure Silver-Gold Zari Weft & Border',
    lengthDetails: '6.20 metres total (including 0.85m matching ivory zari blouse piece)',
    origin: 'Kanchipuram, Tamil Nadu',
    weaveHours: 72,
    careNote: 'Dry clean only. Refold along alternate creases every three months.',
  },
  {
    id: 'noolam-03',
    slug: 'mayura-peacock-teal-kanjivaram',
    name: 'Mayura Peacock Teal Kanjivaram',
    silkType: 'Kanjivaram',
    collection: 'Six Moods',
    occasion: 'Reception',
    color: 'Peacock Teal',
    colorHex: '#0F5260',
    price: 44200,
    originalPrice: 47500,
    availability: 'In Stock',
    images: [
      '/images/look-peacock-teal.jpg',
      '/images/editorial-six-moods.jpg',
      '/images/weave-handloom.jpg',
    ],
    shortDescription: 'Shot-silk peacock teal body paired with antique-toned floral zari border.',
    description:
      'Dyed using dual warp-and-weft yarns to achieve the shifting iridescence of monsoon plumage, Mayura carries a restrained antique-gold border etched with lotus creepers and classic rudraksham edging.',
    fabricDetails: '100% Pure Mulberry Shot Silk (Dhoop-Chaon Weave)',
    zariDetails: 'Antique Matte Finish Pure Zari',
    lengthDetails: '6.25 metres total (including 0.90m teal zari-sleeved blouse piece)',
    origin: 'Kanchipuram, Tamil Nadu',
    weaveHours: 76,
    careNote: 'Dry clean only. Steam lightly on reverse side with cotton barrier.',
  },
  {
    id: 'noolam-04',
    slug: 'rajasi-royal-plum-brocade',
    name: 'Rajasi Royal Plum Kanjivaram',
    silkType: 'Kanjivaram',
    collection: 'The Muse',
    occasion: 'Wedding',
    color: 'Royal Plum',
    colorHex: '#4E183F',
    price: 52000,
    availability: 'Limited Run',
    isNewArrival: true,
    images: [
      '/images/look-royal-plum.jpg',
      '/images/muse-editorial.jpg',
      '/images/silk-banarasi-brocade.jpg',
    ],
    shortDescription: 'Deep aubergine mulberry silk framed by a copper-gold floral medallion border.',
    description:
      'Crafted for evening sangeets and intimate wedding receptions, Rajasi balances a regal plum field with warm copper-gold floral medallions along the drape and grand pallu.',
    fabricDetails: '100% Heavyweight Kanchipuram Mulberry Silk',
    zariDetails: 'Warm Rose-Copper & Gold Zari Border',
    lengthDetails: '6.25 metres total (including 0.90m aubergine blouse piece)',
    origin: 'Kanchipuram, Tamil Nadu',
    weaveHours: 94,
    careNote: 'Dry clean only. Store flat in breathable cotton pouch.',
  },
  {
    id: 'noolam-05',
    slug: 'koorai-madurai-mudra-check',
    name: 'Koorai Heritage Mudra Check',
    silkType: 'Koorai Check',
    collection: 'Temple Heritage',
    occasion: 'Bridal',
    color: 'Vermilion & Ochre',
    colorHex: '#B6491E',
    price: 37350,
    availability: 'In Stock',
    images: [
      '/images/silk-koorai-check.jpg',
      '/images/look-crimson-temple.jpg',
      '/images/weave-handloom.jpg',
    ],
    shortDescription: 'Auspicious South Indian bridal Koorai check in vermilion, turmeric ochre, and forest green.',
    description:
      'A revered heirloom traditionally gifted at South Indian weddings. Bold hand-dyed checks of kumkum red, turmeric ochre, and temple green intersect cleanly under a broad pure gold border adorned with swan (annapakshi) motifs.',
    fabricDetails: '100% Pure Korvai Mulberry Silk',
    zariDetails: 'Pure Gold Zari Annapakshi & Kalasam Border',
    lengthDetails: '6.25 metres total (including 0.90m solid crimson blouse piece)',
    origin: 'Koorainadu & Kanchipuram, Tamil Nadu',
    weaveHours: 68,
    careNote: 'Dry clean only.',
  },
  {
    id: 'noolam-06',
    slug: 'kashi-wine-jangla-banarasi',
    name: 'Kashi Wine Jangla Banarasi',
    silkType: 'Banarasi',
    collection: 'The Muse',
    occasion: 'Reception',
    color: 'Deep Burgundy',
    colorHex: '#5C0F1C',
    price: 58900,
    originalPrice: 64000,
    availability: 'Limited Run',
    isNewArrival: true,
    images: [
      '/images/silk-banarasi-brocade.jpg',
      '/images/muse-editorial.jpg',
      '/images/look-royal-plum.jpg',
    ],
    shortDescription: 'Handloom Banarasi katan silk woven with continuous kadhua floral jangla vines.',
    description:
      'Individually brocaded without floating back threads using the centuries-old kadhua technique in Varanasi. Rich wine-burgundy katan silk blooms with antique gold floral vines and a paisley-framed rich pallu.',
    fabricDetails: '100% Pure Katan Mulberry Silk',
    zariDetails: 'Tested Antique Gold Kadhua Zari',
    lengthDetails: '6.20 metres total (including 0.90m brocade border blouse piece)',
    origin: 'Madanpura, Varanasi',
    weaveHours: 140,
    careNote: 'Dry clean only. Do not spray perfume directly onto zari work.',
  },
  {
    id: 'noolam-07',
    slug: 'swarna-palace-tissue-kanjivaram',
    name: 'Swarna Palace Tissue Kanjivaram',
    silkType: 'Palace Tissue',
    collection: 'Bridal Archive',
    occasion: 'Bridal',
    color: 'Champagne Gold',
    colorHex: '#CBB17D',
    price: 64500,
    availability: 'Bespoke',
    images: [
      '/images/silk-palace-gold.jpg',
      '/images/look-ivory-gold.jpg',
      '/images/bridal-sindoor.jpg',
    ],
    shortDescription: 'Luminous spun-gold tissue Kanjivaram framed by a deep rosewood maroon border.',
    description:
      'Woven by pairing fine silk warp with gilded weft yarn, Swarna catches candlelight like liquid gold. Anchored by an opulent rosewood-burgundy border woven with floral medallions and peacock motifs.',
    fabricDetails: 'Pure Mulberry Silk Warp with Tissue Zari Weft',
    zariDetails: 'Pure Silver-Gold Tissue & Korvai Border',
    lengthDetails: '6.25 metres total (including 0.90m rosewood silk blouse piece)',
    origin: 'Kanchipuram, Tamil Nadu',
    weaveHours: 112,
    careNote: 'Dry clean only. Wrap carefully in tissue paper and muslin.',
  },
  {
    id: 'noolam-08',
    slug: 'maharani-sindoor-bridal-heirloom',
    name: 'Maharani Sindoor Bridal Heirloom',
    silkType: 'Kanjivaram',
    collection: 'Bridal Archive',
    occasion: 'Bridal',
    color: 'Bridal Sindoor',
    colorHex: '#A61920',
    price: 78000,
    availability: 'Limited Run',
    images: [
      '/images/bridal-sindoor.jpg',
      '/images/look-crimson-temple.jpg',
      '/images/weave-handloom.jpg',
    ],
    shortDescription: 'Full-brocade bridal Kanjivaram crafted in auspicious sindoor red and 2G gold zari.',
    description:
      'Designed specifically for the Muhurtham hour. Across six yards of heirloom sindoor silk, dense floral and temple-pillar brocade gleams in pure zari, yielding a drape of unmistakable ceremonial weight.',
    fabricDetails: '100% Extra-Heavyweight 3-Ply Kanchipuram Silk',
    zariDetails: 'Pure 2G Silver-Gold Zari Brocade Throughout',
    lengthDetails: '6.30 metres total (including 0.95m brocade bridal blouse piece)',
    origin: 'Kanchipuram, Tamil Nadu',
    weaveHours: 165,
    careNote: 'Specialist silk dry clean only.',
  },
  {
    id: 'noolam-09',
    slug: 'kaveri-emerald-temple-border',
    name: 'Kaveri Emerald Temple Border',
    silkType: 'Kanjivaram',
    collection: 'Six Moods',
    occasion: 'Festive',
    color: 'Temple Emerald',
    colorHex: '#0E563B',
    price: 46800,
    originalPrice: 51000,
    availability: 'In Stock',
    images: [
      '/images/editorial-six-moods.jpg',
      '/images/look-peacock-teal.jpg',
      '/images/silk-koorai-check.jpg',
    ],
    shortDescription: 'Forest emerald Kanjivaram silk adorned with gold coin buttis and wide zari pallu.',
    description:
      'Reminiscent of lush Kaveri riverbanks, this deep emerald silk carries spaced circular coin buttis and a richly detailed temple border finished with hand-twisted tassels.',
    fabricDetails: '100% Pure Mulberry Silk',
    zariDetails: 'Pure Gold Zari Border & Butti',
    lengthDetails: '6.25 metres total (including 0.90m matching emerald blouse piece)',
    origin: 'Kanchipuram, Tamil Nadu',
    weaveHours: 78,
    careNote: 'Dry clean only.',
  },
  {
    id: 'noolam-10',
    slug: 'nandini-rosewood-heirloom',
    name: 'Nandini Rosewood & Gold Zari',
    silkType: 'Kanjivaram',
    collection: 'The Muse',
    occasion: 'Wedding',
    color: 'Rosewood Wine',
    colorHex: '#591624',
    price: 41000,
    availability: 'In Stock',
    images: [
      '/images/muse-editorial.jpg',
      '/images/silk-banarasi-brocade.jpg',
      '/images/look-royal-plum.jpg',
    ],
    shortDescription: 'Quietly opulent rosewood wine silk with classic diamond buttis and antique border.',
    description:
      'An understated heirloom piece designed for discerning collectors. Deep rosewood wine silk meets subtle antique gold diamond motifs and a finely bordered pallu that drapes with effortless poise.',
    fabricDetails: '100% Pure Mulberry Silk',
    zariDetails: 'Antique Gold Pure Zari',
    lengthDetails: '6.20 metres total (including 0.85m matching blouse piece)',
    origin: 'Kanchipuram, Tamil Nadu',
    weaveHours: 70,
    careNote: 'Dry clean only.',
  },
  {
    id: 'noolam-11',
    slug: 'vanya-ochre-handloom-tussar',
    name: 'Vanya Ochre Handloom Silk',
    silkType: 'Tussar Silk',
    collection: 'Daylight Looms',
    occasion: 'Festive',
    color: 'Turmeric Ochre',
    colorHex: '#C57B24',
    price: 28400,
    availability: 'In Stock',
    images: [
      '/images/silk-koorai-check.jpg',
      '/images/look-ivory-gold.jpg',
    ],
    shortDescription: 'Light, crisp handloom tussar-mulberry silk in sun-warmed ochre and temple red.',
    description:
      'Airy enough for daytime pujas and summer weddings, Vanya combines raw tussar slub character with smooth mulberry sheen and an auspicious vermilion border.',
    fabricDetails: 'Pure Tussar-Mulberry Handloom Silk',
    zariDetails: 'Handwoven Temple Zari Edge',
    lengthDetails: '6.20 metres total (including 0.85m contrast crimson blouse piece)',
    origin: 'Arni & Bhagalpur Heritage Cluster',
    weaveHours: 48,
    careNote: 'Dry clean only.',
  },
  {
    id: 'noolam-12',
    slug: 'korvai-border-ruby-silk-blouse',
    name: 'Korvai Border Handloom Silk Blouse',
    silkType: 'Silk Blouse',
    collection: 'Tailored Pairings',
    occasion: 'Tailored',
    color: 'Deep Ruby',
    colorHex: '#6F1421',
    price: 6800,
    availability: 'In Stock',
    images: [
      '/images/look-royal-plum.jpg',
      '/images/muse-editorial.jpg',
    ],
    shortDescription: 'Tailored elbow-sleeve Kanjivaram silk blouse finished with pure zari sleeve borders.',
    description:
      'Pre-tailored in pure Kanchipuram mulberry silk with soft cotton lining, boat-scoop neckline, and authentic zari sleeve cuff. Designed to pair effortlessly across ivory, gold, and crimson drapes.',
    fabricDetails: '100% Pure Kanjivaram Silk with Mulmul Cotton Lining',
    zariDetails: 'Woven Korvai Zari Sleeve Cuff',
    lengthDetails: 'Ready-to-wear sizes 32–42 (with 2-inch internal tailoring margin)',
    origin: 'Chennai Atelier',
    weaveHours: 14,
    careNote: 'Dry clean only.',
  },
];

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: 'look-1',
    title: 'Ivory Elephant & Gold Check',
    mood: 'Morning Temple Grace',
    image: '/images/look-ivory-gold.jpg',
    sareeId: 'noolam-02',
    blouseNote: 'Ivory Kora Silk Blouse with Zari Cuff',
    jewelleryNote: 'Antique Kemp & Gold Lakshmi Haram',
    drapeStyle: 'Classic Pleated Nivi Drape',
  },
  {
    id: 'look-2',
    title: 'Rani & Sindoor Temple',
    mood: 'Festive Dawn Offering',
    image: '/images/look-crimson-temple.jpg',
    sareeId: 'noolam-01',
    blouseNote: 'Contrast Indigo Zari-Embroidered Blouse',
    jewelleryNote: '22K Temple Jhumkas & Gold Bangles',
    drapeStyle: 'Floating Pallu Ceremonial Drape',
  },
  {
    id: 'look-3',
    title: 'Mayura Monsoon Teal',
    mood: 'Twilight Reception',
    image: '/images/look-peacock-teal.jpg',
    sareeId: 'noolam-03',
    blouseNote: 'Monochrome Teal Elbow-Sleeve Silk Blouse',
    jewelleryNote: 'Filigree Choker & Fresh Jasmine Veni',
    drapeStyle: 'Sculpted Narrow-Pleat Drape',
  },
  {
    id: 'look-4',
    title: 'Rajasi Aubergine Brocade',
    mood: 'Evening Heirloom',
    image: '/images/look-royal-plum.jpg',
    sareeId: 'noolam-04',
    blouseNote: 'Wine Maroon Zardosi-Trimmed Blouse',
    jewelleryNote: 'Ruby Polki Choker & Pearl Drops',
    drapeStyle: 'Open Pallu Evening Drape',
  },
  {
    id: 'look-5',
    title: 'Nandini Rosewood Study',
    mood: 'Heritage Intimacy',
    image: '/images/muse-editorial.jpg',
    sareeId: 'noolam-10',
    blouseNote: 'Tailored Rosewood Velvet-Edged Blouse',
    jewelleryNote: 'Heirloom Temple Collar Necklace',
    drapeStyle: 'Soft Shoulder-Pinned Drape',
  },
  {
    id: 'look-6',
    title: 'Maharani Muhurtham',
    mood: 'Sacred Bridal Hour',
    image: '/images/bridal-sindoor.jpg',
    sareeId: 'noolam-08',
    blouseNote: 'Brocade Sindoor Bridal Silk Blouse',
    jewelleryNote: 'Layered Manga Mala & Oddiyanam',
    drapeStyle: 'Traditional Bridal Kanchipuram Drape',
  },
];

export const SILK_VARIETIES: SilkVariety[] = [
  {
    id: 'silk-koorai',
    name: 'Koorai Check',
    filterSilk: 'Koorai Check',
    tagline: 'Auspicious geometric checks & temple borders',
    origin: 'Koorainadu · Tamil Nadu',
    accentBg: '#9F2B1D',
    image: '/images/silk-koorai-check.jpg',
  },
  {
    id: 'silk-kanjivaram',
    name: 'Kanjivaram Korvai',
    filterSilk: 'Kanjivaram',
    tagline: 'Three-shuttle interlocked pure mulberry silk',
    origin: 'Kanchipuram · Tamil Nadu',
    accentBg: '#5C0F1C',
    image: '/images/look-crimson-temple.jpg',
  },
  {
    id: 'silk-banarasi',
    name: 'Banarasi Katan',
    filterSilk: 'Banarasi',
    tagline: 'Hand-brocaded kadhua floral jangla weaves',
    origin: 'Varanasi · Uttar Pradesh',
    accentBg: '#461220',
    image: '/images/silk-banarasi-brocade.jpg',
  },
  {
    id: 'silk-tissue',
    name: 'Palace Tissue',
    filterSilk: 'Palace Tissue',
    tagline: 'Luminous spun-gold zari woven with silk',
    origin: 'Kanchipuram · Tamil Nadu',
    accentBg: '#8B6A32',
    image: '/images/silk-palace-gold.jpg',
  },
  {
    id: 'silk-mayura',
    name: 'Dhoop-Chaon Silk',
    filterSilk: 'Kanjivaram',
    tagline: 'Iridescent dual-tone shot silk drapes',
    origin: 'Kanchipuram · Tamil Nadu',
    accentBg: '#0F4D59',
    image: '/images/look-peacock-teal.jpg',
  },
  {
    id: 'silk-tussar',
    name: 'Daylight Tussar',
    filterSilk: 'Tussar Silk',
    tagline: 'Breathable textural wild silk for morning rituals',
    origin: 'Arni & Bhagalpur',
    accentBg: '#A45A1C',
    image: '/images/look-ivory-gold.jpg',
  },
];

export const BRIDAL_SHOWCASE = [
  {
    id: 'bridal-1',
    title: 'Sindoor Muhurtham Pattu',
    subtitle: 'Pure 2G Gold Zari Brocade',
    image: '/images/bridal-sindoor.jpg',
    slug: 'maharani-sindoor-bridal-heirloom',
  },
  {
    id: 'bridal-2',
    title: 'Koorai Mudra Heirloom',
    subtitle: 'Traditional Nine-Yard & Six-Yard Checks',
    image: '/images/silk-koorai-check.jpg',
    slug: 'koorai-madurai-mudra-check',
  },
  {
    id: 'bridal-3',
    title: 'Swarna Palace Reception',
    subtitle: 'Champagne Tissue & Rosewood Border',
    image: '/images/silk-palace-gold.jpg',
    slug: 'swarna-palace-tissue-kanjivaram',
  },
  {
    id: 'bridal-4',
    title: 'Kashi Wine Sangeet',
    subtitle: 'Kadhua Floral Banarasi Katan',
    image: '/images/silk-banarasi-brocade.jpg',
    slug: 'kashi-wine-jangla-banarasi',
  },
];

export const WEAVE_SWATCHES: WeaveSwatch[] = [
  {
    id: 'sw-muga',
    name: 'Kora Ivory Silk',
    silkType: '3-Ply Unbleached Mulberry',
    colorHex: '#EFE6D5',
    zariHex: '#C9A45C',
    priceAddon: 14500,
    note: 'Soft luminous ivory warp foundation',
  },
  {
    id: 'sw-sindoor',
    name: 'Sindoor Crimson',
    silkType: 'Kanchipuram Korvai',
    colorHex: '#9E1B24',
    zariHex: '#D8B467',
    priceAddon: 18500,
    note: 'Auspicious vermilion body & temple border',
  },
  {
    id: 'sw-koorai',
    name: 'Koorai Mudra Check',
    silkType: 'Traditional Check Weave',
    colorHex: '#B6491E',
    zariHex: '#E0BC6F',
    priceAddon: 16800,
    note: 'Crisp ochre, green, and crimson geometry',
  },
  {
    id: 'sw-peacock',
    name: 'Mayura Peacock Teal',
    silkType: 'Dhoop-Chaon Shot Silk',
    colorHex: '#0F5260',
    zariHex: '#C5A059',
    priceAddon: 17200,
    note: 'Iridescent teal warp with antique gold weft',
  },
  {
    id: 'sw-plum',
    name: 'Rajasi Aubergine',
    silkType: 'Heavyweight Brocade',
    colorHex: '#4E183F',
    zariHex: '#CF966A',
    priceAddon: 19400,
    note: 'Deep plum field with copper-gold motifs',
  },
  {
    id: 'sw-emerald',
    name: 'Kaveri Emerald',
    silkType: 'Temple Korvai Silk',
    colorHex: '#0E563B',
    zariHex: '#D4B06A',
    priceAddon: 16900,
    note: 'Lush forest green with gold coin buttis',
  },
  {
    id: 'sw-tissue',
    name: 'Swarna Palace Zari',
    silkType: '2G Pure Silver-Gold Tissue',
    colorHex: '#CBB17D',
    zariHex: '#F0D79A',
    priceAddon: 22500,
    note: 'Spun gold shimmer woven into pallu',
  },
  {
    id: 'sw-burgundy',
    name: 'Kashi Wine Katan',
    silkType: 'Banarasi Jangla',
    colorHex: '#5C0F1C',
    zariHex: '#D1A857',
    priceAddon: 21000,
    note: 'Hand-brocaded wine silk with floral vines',
  },
];

export const STORE_LOCATIONS = [
  {
    city: 'Chennai — Flagship Atelier',
    address: '18 Luz Church Road, Mylapore, Chennai 600004',
    hours: 'Tuesday – Sunday · 10:30 AM – 8:00 PM',
    phone: '+91 44 2498 6120',
    note: 'Private bridal trousseau lounge available by appointment.',
  },
  {
    city: 'Kanchipuram — Weaving Heritage House',
    address: '42 Sannadhi Street, Pillaiyarpalayam, Kanchipuram 631501',
    hours: 'Wednesday – Sunday · 10:00 AM – 6:30 PM',
    phone: '+91 44 2722 4890',
    note: 'Experience live pit-loom demonstrations with master weavers.',
  },
];

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
