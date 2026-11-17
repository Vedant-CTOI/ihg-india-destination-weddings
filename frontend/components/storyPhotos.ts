// Real Weddings — the 3 case studies shown on the site, and the photos each one uses.
// Cover photo = the same homepage hero photo used on the homepage story card (same crop focus).
import { REAL_WEDDINGS_DATA } from '../constants';

export const FEATURED_STORIES = REAL_WEDDINGS_DATA.slice(0, 3);

type Photo = { src: string; focus: string };

export const STORY_PHOTOS: Record<string, { cover: Photo; pair: [Photo, Photo]; gallery: [Photo, Photo, Photo] }> = {
  [REAL_WEDDINGS_DATA[0].id]: {
    cover: { src: '/hero/hero-1-photo.jpg', focus: '62% 28%' },
    pair: [{ src: '/hero/hero-4-photo.jpg', focus: '55% 30%' }, { src: '/destinations/hero.jpg', focus: '50% 50%' }],
    gallery: [{ src: '/hero/hero-5-photo.jpg', focus: '42% 38%' }, { src: '/destinations/goa.jpg', focus: '50% 50%' }, { src: '/destinations/d4.jpg', focus: '50% 50%' }]
  },
  [REAL_WEDDINGS_DATA[1].id]: {
    cover: { src: '/hero/hero-2-photo.jpg', focus: '35% 25%' },
    pair: [{ src: '/destinations/d7.jpg', focus: '50% 40%' }, { src: '/destinations/jaipur.jpg', focus: '50% 50%' }],
    gallery: [{ src: '/destinations/d6.jpg', focus: '50% 50%' }, { src: '/destinations/d5.jpg', focus: '50% 50%' }, { src: '/destinations/d8.jpg', focus: '50% 50%' }]
  },
  [REAL_WEDDINGS_DATA[2].id]: {
    cover: { src: '/hero/hero-3-photo.jpg', focus: '50% 40%' },
    pair: [{ src: '/hero/hero-5-photo.jpg', focus: '42% 38%' }, { src: '/destinations/goa.jpg', focus: '50% 50%' }],
    gallery: [{ src: '/hero/hero-4-photo.jpg', focus: '55% 30%' }, { src: '/destinations/hero.jpg', focus: '50% 50%' }, { src: '/destinations/thailand.jpg', focus: '50% 50%' }]
  }
};

export const photosFor = (id: string) => STORY_PHOTOS[id] || STORY_PHOTOS[REAL_WEDDINGS_DATA[0].id];
