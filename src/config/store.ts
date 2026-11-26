import { Product } from '../types';

/**
 * ============================================================================
 * MATI & MADHU — OWNER CONFIGURATION FILE
 * ============================================================================
 * You can update your WhatsApp Business number, bKash option, delivery
 * charges, product prices, descriptions, and stock availability right here.
 *
 * IMPORTANT FOR WHATSAPP NUMBER:
 * - Use international format WITHOUT the "+" sign or spaces.
 * - Example for Bangladesh (+880 1711-000000): "8801711000000"
 * ============================================================================
 */

export const STORE_CONFIG = {
  brandName: 'MATI & MADHU',
  tagline: "Nature's Finest, Delivered Honestly.",
  announcementText: 'Fresh from Satkhira | Bringing Nature Closer to You',
  location: 'Satkhira, Bangladesh',

  // Change this to your active WhatsApp Business number (no "+" sign, no spaces)
  whatsappNumber: '8801611986850',

  // Display phone number shown on Contact page & footer
  displayPhone: '+880 1611-986850',

  // Your Facebook Page link (customers can follow updates & seasonal harvests)
  facebookPageUrl: 'https://www.facebook.com/share/1d9HEFBu2K/',
  facebookHandle: 'Mati & Madhu Satkhira',

  // Optional Manual bKash configuration (no automatic gateway)
  enableManualBkash: true,
  bkashPersonalNumber: '01611-986850',
  bkashNote:
    'If you choose Manual bKash, please do not send money now. We will confirm stock & total on WhatsApp first, then share our bKash details.',

  // Delivery charges in BDT (৳). Set to 0 if you want free delivery above a threshold.
  delivery: {
    insideSatkhiraCharge: 60,
    dhakaDistrictCharge: 130,
    outsideSatkhiraCharge: 150,
    freeDeliveryAbove: 3500, // Set to 0 to disable free delivery threshold
    note: 'Delivery charges are always confirmed with you on WhatsApp before dispatch.',
  },
} as const;

export const HERO_IMAGE = '/src/assets/images/hero_satkhira_mangoes_1795593014805.jpg';
export const ORCHARD_STORY_IMAGE = '/src/assets/images/story_satkhira_orchard_1795593019425.jpg';

/**
 * ============================================================================
 * PRODUCT CATALOG
 * Edit prices (in BDT), optional compareAtPrice (crossed-out regular price),
 * availability ('In Stock', 'Limited Harvest', 'Out of Stock'),
 * descriptions, or weight/jar options below.
 * ============================================================================
 */
export const PRODUCTS: Product[] = [
  // MANGOES
  {
    id: 'mango-himsagar',
    slug: 'himsagar-mango',
    name: 'Himsagar Mango',
    category: 'mangoes',
    categoryLabel: 'Satkhira Orchard',
    bestseller: true,
    shortDescription:
      'Satkhira’s prized fibreless mango with deep honeyed sweetness and creamy golden flesh.',
    description:
      'Hand-picked from our family trees in Satkhira only when naturally mature on the branch. Himsagar is treasured across Bangladesh for its fibreless pulp, rich aroma, and balanced sweetness without any chemical ripening.',
    harvestSeason: 'May – June',
    origin: 'Own Family Garden, Satkhira',
    packaging: 'Ventilated food-grade carton crate lined with natural cushioning',
    deliveryNote:
      'Packed fresh after morning harvest and dispatched via courier across Bangladesh where service is available.',
    availability: 'In Stock',
    image: '/src/assets/images/mango_himsagar_1795593015552.jpg',
    imageAlt: 'Fresh ripe golden Himsagar mangoes with leaves on stone surface',
    minOrderQuantity: 10,
    quantityStep: 10,
    unitLabel: 'KG',
    variants: [{ id: 'himsagar-kg', label: 'Per KG', price: 120, compareAtPrice: 140 }],
  },
  {
    id: 'mango-langra',
    slug: 'langra-mango',
    name: 'Langra Mango',
    category: 'mangoes',
    categoryLabel: 'Satkhira Orchard',
    bestseller: true,
    shortDescription:
      'Thin-skinned, deeply aromatic mango with juicy saffron flesh and a delicate citrus finish.',
    description:
      'Grown in alluvial Satkhira soil, our Langra mangoes retain their signature olive-green skin even when fully ripe inside. Every fruit is sorted by hand and packed naturally without carbide or artificial wax.',
    harvestSeason: 'June – July',
    origin: 'Own Family Garden, Satkhira',
    packaging: 'Sturdy breathable fruit box to prevent bruising in transit',
    deliveryNote:
      'Delivered firm-mature so mangoes reach optimal ripeness naturally at your home.',
    availability: 'In Stock',
    image: '/src/assets/images/mango_langra_1795593015652.jpg',
    imageAlt: 'Greenish-gold Langra mangoes with freshly sliced golden mango flesh',
    minOrderQuantity: 10,
    quantityStep: 10,
    unitLabel: 'KG',
    variants: [{ id: 'langra-kg', label: 'Per KG', price: 120, compareAtPrice: 130 }],
  },
  {
    id: 'mango-gopalbhog',
    slug: 'gopalbhog-mango',
    name: 'Gopalbhog Mango',
    category: 'mangoes',
    categoryLabel: 'Satkhira Orchard',
    bestseller: false,
    shortDescription:
      'Early-harvest orchard favourite known for concentrated sweetness and classic Bengali aroma.',
    description:
      'One of the earliest mangoes to welcome summer in Satkhira. Gopalbhog brings a nostalgic fragrance and dense, sweet pulp that families wait all year for. Available in small orchard batches.',
    harvestSeason: 'May – Early June',
    origin: 'Own Family Garden, Satkhira',
    packaging: 'Ventilated corrugated basket crate with straw padding',
    deliveryNote:
      'Harvested in small batches; courier tracking shared via WhatsApp after dispatch.',
    availability: 'Limited Harvest',
    image: '/src/assets/images/mango_gopalbhog_1795593016883.jpg',
    imageAlt: 'Ripe saffron-gold Gopalbhog mangoes in a terracotta bowl on linen',
    minOrderQuantity: 10,
    quantityStep: 10,
    unitLabel: 'KG',
    variants: [{ id: 'gopalbhog-kg', label: 'Per KG', price: 150, compareAtPrice: 165 }],
  },
  {
    id: 'mango-govindabhog',
    slug: 'govindabhog-mango',
    name: 'Govindabhog Mango',
    category: 'mangoes',
    categoryLabel: 'Satkhira Orchard',
    bestseller: false,
    shortDescription:
      'Fragrant heritage mango of southwest Bengal with rich, smooth pulp and natural sweetness.',
    description:
      'Especially cherished in Satkhira, Govindabhog ripens early with an unmistakable sweet scent. We pick only mature mangoes directly from our garden trees for honest farm-to-home freshness.',
    harvestSeason: 'May',
    origin: 'Own Family Garden, Satkhira',
    packaging: 'Carefully cushioned breathable mango crate',
    deliveryNote:
      'Shipped across Bangladesh where courier service is available; charges confirmed before dispatch.',
    availability: 'In Stock',
    image: '/src/assets/images/mango_govindabhog_1795593017253.jpg',
    imageAlt: 'Aromatic ripe Govindabhog mangoes arranged in a woven cane tray',
    minOrderQuantity: 10,
    quantityStep: 10,
    unitLabel: 'KG',
    variants: [{ id: 'govindabhog-kg', label: 'Per KG', price: 150, compareAtPrice: 170 }],
  },

  // HONEY
  {
    id: 'honey-sundarban',
    slug: 'original-sundarban-honey',
    name: 'Original Sundarban Honey',
    category: 'honey',
    categoryLabel: 'Authentic Honey',
    bestseller: true,
    shortDescription:
      'Raw wild forest honey collected by trusted local Mouwalis near Satkhira’s Sundarbans.',
    description:
      'Sourced responsibly through trusted local collectors bordering the Satkhira Sundarbans. Rich, dark amber with natural mangrove floral notes (Khalisha & Goran blossoms). Unheated and strained cleanly without sugar syrup.',
    harvestSeason: 'April – May (Wild Collection)',
    origin: 'Satkhira Sundarbans Border',
    packaging: 'Sealed food-grade glass jar wrapped in protective foam & box',
    deliveryNote:
      'Double-cushioned glass jar packaging for safe nationwide courier delivery.',
    availability: 'In Stock',
    image: '/src/assets/images/honey_sundarban_1795593017730.jpg',
    imageAlt: 'Glass jar of rich dark amber raw Sundarban honey with wooden dipper',
    variants: [
      { id: 'sundarban-250g', label: '250g', price: 520, compareAtPrice: 550 },
      { id: 'sundarban-500g', label: '500g', price: 980, compareAtPrice: 1050 },
      { id: 'sundarban-1kg', label: '1 KG', price: 1880, compareAtPrice: 2000 },
    ],
  },
  {
    id: 'honey-mustard',
    slug: 'mustard-flower-honey',
    name: 'Mustard Flower Honey',
    category: 'honey',
    categoryLabel: 'Authentic Honey',
    bestseller: false,
    shortDescription:
      'Smooth, golden-amber winter honey harvested from blooming mustard fields around Satkhira.',
    description:
      'Collected from healthy apiaries placed beside vibrant winter mustard fields. Pure mustard flower honey naturally thickens and crystallizes slightly in cool weather—a genuine sign of raw, unprocessed nectar.',
    harvestSeason: 'December – February',
    origin: 'Local Apiaries, Satkhira Region',
    packaging: 'Airtight food-grade jar with tamper seal and bubble wrap',
    deliveryNote:
      'Available year-round in limited stored batches while seasonal harvest lasts.',
    availability: 'In Stock',
    image: '/src/assets/images/honey_mustard_1795593017999.jpg',
    imageAlt: 'Glass jar of golden Mustard Flower honey with fresh yellow mustard blossoms',
    variants: [
      { id: 'mustard-250g', label: '250g', price: 320, compareAtPrice: 350 },
      { id: 'mustard-500g', label: '500g', price: 590, compareAtPrice: 640 },
      { id: 'mustard-1kg', label: '1 KG', price: 1120, compareAtPrice: 1200 },
    ],
  },
  {
    id: 'honey-litchi',
    slug: 'litchi-flower-honey',
    name: 'Litchi Flower Honey',
    category: 'honey',
    categoryLabel: 'Authentic Honey',
    bestseller: true,
    shortDescription:
      'Light, delicately fragrant spring honey with crisp floral sweetness and luminous gold clarity.',
    description:
      'Harvested during the brief spring litchi bloom. Loved by children and tea drinkers for its gentle aroma, clean finish, and light amber colour without heaviness.',
    harvestSeason: 'March – April',
    origin: 'Trusted Partner Orchards, Bangladesh',
    packaging: 'Sealed glass jar cushioned inside sturdy outer parcel box',
    deliveryNote:
      'Packed carefully in protective sleeve; courier tracking shared on WhatsApp.',
    availability: 'In Stock',
    image: '/src/assets/images/honey_litchi_1795593018729.jpg',
    imageAlt: 'Clear glass jar of luminous pale-gold Litchi Flower honey on stone',
    variants: [
      { id: 'litchi-250g', label: '250g', price: 380, compareAtPrice: 410 },
      { id: 'litchi-500g', label: '500g', price: 720, compareAtPrice: 780 },
      { id: 'litchi-1kg', label: '1 KG', price: 1380, compareAtPrice: 1480 },
    ],
  },
  {
    id: 'honey-sunflower',
    slug: 'sunflower-flower-honey',
    name: 'Sunflower Flower Honey',
    category: 'honey',
    categoryLabel: 'Authentic Honey',
    bestseller: false,
    shortDescription:
      'Bright golden nectar from coastal sunflower fields with a warm, mellow everyday sweetness.',
    description:
      'Coastal Satkhira’s golden sunflower fields produce a vivid amber honey with a pleasant nutty-floral balance. Raw, unblended, and packed directly in clean jars for daily family use.',
    harvestSeason: 'February – March',
    origin: 'Satkhira Coastal Farms',
    packaging: 'Sealed glass jar in protective cushioned carton',
    deliveryNote:
      'Ready for dispatch across Bangladesh; delivery fee confirmed prior to shipping.',
    availability: 'In Stock',
    image: '/src/assets/images/honey_sunflower_1795593020185.jpg',
    imageAlt: 'Bright golden Sunflower honey jar on natural linen and warm stone',
    variants: [
      { id: 'sunflower-250g', label: '250g', price: 360, compareAtPrice: 390 },
      { id: 'sunflower-500g', label: '500g', price: 680, compareAtPrice: 730 },
      { id: 'sunflower-1kg', label: '1 KG', price: 1300, compareAtPrice: 1400 },
    ],
  },
];

export const BANGLADESH_DISTRICTS: string[] = [
  'Satkhira',
  'Dhaka',
  'Chattogram',
  'Khulna',
  'Rajshahi',
  'Sylhet',
  'Rangpur',
  'Barishal',
  'Mymensingh',
  'Bagerhat',
  'Bandarban',
  'Barguna',
  'Bhola',
  'Bogura',
  'Brahmanbaria',
  'Chandpur',
  'Chapainawabganj',
  'Chuadanga',
  'Comilla',
  "Cox's Bazar",
  'Dinajpur',
  'Faridpur',
  'Feni',
  'Gaibandha',
  'Gazipur',
  'Gopalganj',
  'Habiganj',
  'Jamalpur',
  'Jashore',
  'Jhalokati',
  'Jhenaidah',
  'Joypurhat',
  'Khagrachhari',
  'Kishoreganj',
  'Kurigram',
  'Kushtia',
  'Lakshmipur',
  'Lalmonirhat',
  'Madaripur',
  'Magura',
  'Manikganj',
  'Meherpur',
  'Moulvibazar',
  'Munshiganj',
  'Naogaon',
  'Narail',
  'Narayanganj',
  'Narsingdi',
  'Natore',
  'Netrokona',
  'Nilphamari',
  'Noakhali',
  'Pabna',
  'Panchagarh',
  'Patuakhali',
  'Pirojpur',
  'Rajbari',
  'Rangamati',
  'Shariatpur',
  'Sherpur',
  'Sirajganj',
  'Sunamganj',
  'Tangail',
  'Thakurgaon',
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How do I place an order on MATI & MADHU?',
    answer:
      'Add your preferred mangoes or honey jars to your cart, open Checkout, fill in your Bangladeshi delivery address, and tap "Place Order on WhatsApp". Your order details will open directly inside WhatsApp ready to send to us.',
  },
  {
    question: 'Are your mangoes naturally ripened without chemicals?',
    answer:
      'Yes. All mangoes come directly from our own family garden in Satkhira. We harvest only when mangoes mature naturally on the tree and never use carbide, formalin, or artificial ripening sprays.',
  },
  {
    question: 'How can I be sure the honey is authentic?',
    answer:
      'We source our Sundarban and seasonal floral honey only from trusted local collectors and small apiaries we know personally around Satkhira. Every batch is raw, unheated, and packed without sugar syrup or artificial flavouring.',
  },
  {
    question: 'Why does Mustard Flower Honey sometimes thicken or crystallize?',
    answer:
      'Natural crystallization is a normal property of pure, raw mustard flower honey in cool temperatures due to its natural glucose-to-fructose balance. You can enjoy it creamy as-is or place the jar gently in warm water.',
  },
  {
    question: 'How do delivery charges and courier tracking work?',
    answer:
      'We deliver throughout Bangladesh wherever courier service reaches. Estimated delivery charges are shown at checkout based on your district, and we always confirm the exact courier charge with you on WhatsApp before dispatch. Once shipped, we send your tracking details directly on WhatsApp.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We primarily accept Cash on Delivery (COD). If you prefer manual bKash payment, you can select that option at checkout and we will share our number on WhatsApp only after confirming your order availability.',
  },
  {
    question: 'What if a mango parcel or honey jar is damaged in transit?',
    answer:
      'Please take a clear photo or short video right when opening the parcel and send it to our WhatsApp Business number within 24 hours of delivery. We will fairly review and arrange a replacement or adjustment.',
  },
];
