/**
 * WEB VERSION ONLY — dummy colour photographs that replace the grey placeholder
 * boxes on the landing page. Data (constants.ts) is untouched; Mobile view and all
 * inner pages keep their existing images. Swap any URL here for real photography later.
 */
// All images are self-hosted web copies (public/vogue = client Vogue shoot, public/stock = former Unsplash dummies).
// Originals: OneDrive "IHG DUMP/VOGUE IMAGES". Go back = tag checkpoint-before-image-optimise

export const DUMMY_ABOUT = [
  { src: '/vogue/about-bg.jpg', caption: 'Ceremonial Sacredness' },    // client DSC00255 — collage large photo
  { src: '/vogue/about-inset.jpg', caption: 'Timeless Vows' },         // client DSC00286 — collage 3:4 inset
  { src: '/destinations/jaipur.jpg', caption: 'Historic Citadels' }
];
// Mobile About frame is 16:9 — landscape crop of the same client photo
export const ABOUT_WIDE = '/vogue/about-wide.jpg';

// Discover by Destination — fallback only (if a destination photo fails to load)
export const DUMMY_DESTINATIONS = [
  '/destinations/goa.jpg', '/destinations/thailand.jpg', '/destinations/jaipur.jpg', '/destinations/d4.jpg', '/destinations/d5.jpg'
];

// Hotels carousel — one per card, in carousel order (1-3 client Vogue photos, 4-8 self-hosted stock)
export const DUMMY_HOTELS = [
  '/vogue/hotel-card-1.jpg',  // client DSC00134
  '/vogue/hotel-card-2.jpg',  // client DSC00633
  '/vogue/hotel-card-3.jpg',  // client DSC09699
  '/stock/hotel-card-4.jpg',
  '/stock/hotel-card-5.jpg',
  '/stock/hotel-card-6.jpg',
  '/stock/hotel-card-7.jpg',
  '/stock/hotel-card-8.jpg'
];

// Hotels page 16:9 banner — client DSC00633
export const HOTELS_HERO = '/vogue/hotels-hero.jpg';

// Real Wedding stories — one per visible card
// Real Weddings — ceremony moments (Unsplash, free licence; dummy until client photography):
// 1 garland ritual at the sacred fire, 2 sindoor/varmala moment on the mandap, 3 couple at the reception.
export const DUMMY_STORIES = [
  '/stories/story-1.jpg',
  '/stories/story-2.jpg',
  '/stories/story-3.jpg'
];

export const pick = (list: string[], i: number) => list[((i % list.length) + list.length) % list.length];
