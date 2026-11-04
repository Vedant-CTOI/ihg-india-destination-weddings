/**
 * WEB VERSION ONLY — dummy colour photographs that replace the grey placeholder
 * boxes on the landing page. Data (constants.ts) is untouched; Mobile view and all
 * inner pages keep their existing images. Swap any URL here for real photography later.
 */
const u = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const DUMMY_ABOUT = [
  { src: u('1754782915842-aa4fca6c203a', 2000), caption: 'Ceremonial Sacredness' }, // petal ritual
  { src: u('1744804298093-07e5cb188a5f', 2000), caption: 'Timeless Vows' },        // floral arch, couple at night
  { src: u('1784460843252-0957395d2888', 2000), caption: 'Historic Citadels' }     // palace courtyard through a doorway
];

// Discover by Destination — one per carousel slide (Royal, Beachside, Mountain, Temple, Backwater)
export const DUMMY_DESTINATIONS = [
  u('1545126178-862cdb469409', 2400),  // palace façade at night
  u('1723275763631-2f53c56ee251', 2400), // coastline from above
  u('1544735716-392fe2489ffa', 2400),  // Himalayan foothills
  u('1582510003544-4d00b7f74220', 2400), // temple at dusk
  u('1602216056096-3b40cc0c9944', 2400)  // backwater houseboat
];

// Hotels carousel — one per card, in carousel order
export const DUMMY_HOTELS = [
  u('1791233176122-eb6067a2cc51', 900),
  u('1784460843252-0957395d2888', 900),
  u('1560179406-1c6c60e0dc76', 900),
  u('1593620529462-619501b0f7f1', 900),
  u('1585229190075-5d94076e3c81', 900),
  u('1582510003544-4d00b7f74220', 900),
  u('1593693411515-c20261bcad6e', 900),
  u('1545126178-862cdb469409', 900)
];

// Real Wedding stories — one per visible card
// Real Weddings — ceremony moments (Unsplash, free licence; dummy until client photography):
// 1 garland ritual at the sacred fire, 2 sindoor/varmala moment on the mandap, 3 couple at the reception.
export const DUMMY_STORIES = [
  '/stories/story-1.jpg',
  '/stories/story-2.jpg',
  '/stories/story-3.jpg'
];

export const pick = (list: string[], i: number) => list[((i % list.length) + list.length) % list.length];
