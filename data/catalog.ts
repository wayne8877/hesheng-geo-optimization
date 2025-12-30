import { Product } from '../types';

// --- 主打产品 (Featured) - 使用特色系列图片 f1-f10 ---
export const FEATURED_PRODUCTS: Product[] = [
  { id: 'HS-101', title: 'Horn Texture Premium', category: 'Executive Suit', image: '/images/products/f1-horn.webp', tags: ['Artistic'], isNew: true },
  { id: 'HS-102', title: 'Pearl Luster Crystal', category: 'Elegant Knitwear', image: '/images/products/f2-pearl.webp', tags: ['Refined'], isHot: true },
  { id: 'HS-103', title: 'Shell Pattern Classic', category: 'Classic Suit & Trench', image: '/images/products/f3-shell.webp', tags: ['Durable'] },
  { id: 'HS-104', title: 'Laser Engraved Precision', category: 'Woolen Coat Series', image: '/images/products/f4-laser.webp', tags: ['Heritage'] },
  { id: 'HS-105', title: 'Matte Finish Elegance', category: 'Silk Shirt & Knit', image: '/images/products/f5-matte.webp', tags: ['Organic'] },
  { id: 'HS-106', title: 'Tortoise Pattern Vintage', category: 'Italian Vintage Jacket', image: '/images/products/f6-tortoise.webp', tags: ['Retro'], isHot: true },
  { id: 'HS-107', title: 'Pure White Minimalist', category: 'Minimalist Shirt & Knit', image: '/images/products/f7-white.webp', tags: ['Pure'] },
  { id: 'HS-108', title: 'Clear Crystal Transparent', category: 'Trench & Coat', image: '/images/products/f8-clear.webp', tags: ['Standard'] },
  { id: 'HS-109', title: 'Eco-Friendly Bio Resin', category: 'Sustainable Fashion', image: '/images/products/f9-eco.webp', tags: ['Modern'], isNew: true },
  { id: 'HS-110', title: 'Gold Metallic Luxury', category: 'Premium Collection', image: '/images/products/f10-gold.webp', tags: ['Premium'] },
];

// --- 扩展产品 (Extensions) - 使用实际的 1-73 编号图片 ---
const ARCHIVE_EXTENSIONS: Product[] = [
  // Suiting 系列 (1-15)
  { id: 'HS-201', title: 'Classic Charcoal Button', category: 'Suiting', image: '/images/products/1.webp', tags: ['Premium'] },
  { id: 'HS-202', title: 'Navy Pinstripe Resin', category: 'Suiting', image: '/images/products/2.webp', tags: ['Classic'] },
  { id: 'HS-203', title: 'Grey Granite Pattern', category: 'Suiting', image: '/images/products/3.webp', tags: ['Textured'] },
  { id: 'HS-204', title: 'Black Wool Blend', category: 'Suiting', image: '/images/products/4.webp', tags: ['Heritage'] },
  { id: 'HS-205', title: 'Brown Herringbone', category: 'Suiting', image: '/images/products/5.webp', tags: ['Executive'] },

  // Ladies 系列 (16-30)
  { id: 'HS-301', title: 'Pastel Pink Elegance', category: 'Ladies', image: '/images/products/16.webp', tags: ['Spring'] },
  { id: 'HS-302', title: 'Rose Quartz Finish', category: 'Ladies', image: '/images/products/17.webp', tags: ['Trend'] },
  { id: 'HS-303', title: 'Lavender Pearl', category: 'Ladies', image: '/images/products/18.webp', tags: ['Luxury'] },
  { id: 'HS-304', title: 'Coral Sunset', category: 'Ladies', image: '/images/products/19.webp', tags: ['Special'] },
  { id: 'HS-305', title: 'Mint Green Pastel', category: 'Ladies', image: '/images/products/20.webp', tags: ['Fresh'] },

  // Shirt 系列 (31-45)
  { id: 'HS-401', title: 'White Classic 4-Hole', category: 'Shirt', image: '/images/products/31.webp', tags: ['Basic'] },
  { id: 'HS-402', title: 'Ivory Pearl Finish', category: 'Shirt', image: '/images/products/32.webp', tags: ['Refined'] },
  { id: 'HS-403', title: 'Smoke Grey Minimal', category: 'Shirt', image: '/images/products/33.webp', tags: ['Modern'] },
  { id: 'HS-404', title: 'Crystal Clear Resin', category: 'Shirt', image: '/images/products/34.webp', tags: ['Premium'] },
  { id: 'HS-405', title: 'Bone White Matte', category: 'Shirt', image: '/images/products/35.webp', tags: ['Natural'] },

  // Coat 系列 (46-58)
  { id: 'HS-501', title: 'Military Olive Drab', category: 'Coat', image: '/images/products/46.webp', tags: ['Tough'] },
  { id: 'HS-502', title: 'Oversized Camel', category: 'Coat', image: '/images/products/47.webp', tags: ['Trend'] },
  { id: 'HS-503', title: 'Navy Peacoat Style', category: 'Coat', image: '/images/products/48.webp', tags: ['Classic'] },
  { id: 'HS-504', title: 'Burgundy Vintage', category: 'Coat', image: '/images/products/49.webp', tags: ['Heritage'] },
  { id: 'HS-505', title: 'Forest Green Wool', category: 'Coat', image: '/images/products/50.webp', tags: ['Winter'] },

  // Eco 环保系列 (59-65)
  { id: 'HS-601', title: 'Bio-Based Natural', category: 'Eco', image: '/images/products/59.webp', tags: ['Biodegradable'] },
  { id: 'HS-602', title: 'Recycled Ocean Blue', category: 'Eco', image: '/images/products/60.webp', tags: ['GRS'] },
  { id: 'HS-603', title: 'Coffee Grounds Resin', category: 'Eco', image: '/images/products/61.webp', tags: ['Upcycled'] },
  { id: 'HS-604', title: 'Hemp Fiber Blend', category: 'Eco', image: '/images/products/62.webp', tags: ['Sustainable'] },
  { id: 'HS-605', title: 'Bamboo Composite', category: 'Eco', image: '/images/products/63.webp', tags: ['Eco-Friendly'] },

  // Fashion 时尚系列 (66-73)
  { id: 'HS-701', title: 'Neon Cyber Accent', category: 'Fashion', image: '/images/products/66.webp', tags: ['Streetwear'] },
  { id: 'HS-702', title: 'Gold Metallic Shine', category: 'Fashion', image: '/images/products/67.webp', tags: ['Luxury'] },
  { id: 'HS-703', title: 'Holographic Rainbow', category: 'Fashion', image: '/images/products/68.webp', tags: ['Statement'] },
  { id: 'HS-704', title: 'Matte Black Designer', category: 'Fashion', image: '/images/products/69.webp', tags: ['Minimal'] },
  { id: 'HS-705', title: 'Rose Gold Shimmer', category: 'Fashion', image: '/images/products/70.webp', tags: ['Trend'] },

  // Classic 经典系列 (71-73)
  { id: 'HS-801', title: 'Marble Blue Swirl', category: 'Classic', image: '/images/products/71.webp', tags: ['Timeless'] },
  { id: 'HS-802', title: 'Tortoise Shell Pattern', category: 'Classic', image: '/images/products/72.webp', tags: ['Vintage'] },
  { id: 'HS-803', title: 'Horn Effect Resin', category: 'Classic', image: '/images/products/73.webp', tags: ['Traditional'] },
];

// 为生成的产品使用剩余的编号图片，避免重复
const categories = ['Suiting', 'Ladies', 'Shirt', 'Coat', 'Eco', 'Classic', 'Fashion'];
const adjectives = ['Deep', 'Soft', 'Pure', 'Retro', 'Modern', 'Luxe', 'Urban', 'Wild', 'Opal', 'Shadow', 'Frost', 'Gilded'];
const materials = ['Resin', 'Horn', 'Pearl', 'Matte', 'Clear', 'Glossy', 'Twill', 'Marble'];

// 使用剩余的图片编号 (6-15, 21-30, 36-45, 51-58, 64-65) 共35张
const remainingImages = [
  6, 7, 8, 9, 10, 11, 12, 13, 14, 15,        // Suiting 系列剩余
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30,   // Ladies 系列剩余
  36, 37, 38, 39, 40, 41, 42, 43, 44, 45,   // Shirt 系列剩余
  51, 52, 53, 54, 55, 56, 57, 58,           // Coat 系列剩余
  64, 65                                     // Eco 系列剩余
];

const GENERATED_ARCHIVE: Product[] = remainingImages.map((imgNum, i) => {
  const cat = categories[i % categories.length];
  const adj = adjectives[i % adjectives.length];
  const mat = materials[i % materials.length];
  return {
    id: `HS-9${(i + 1).toString().padStart(2, '0')}`,
    title: `${adj} ${mat} Collection`,
    category: cat,
    image: `/images/products/${imgNum}.webp`,
    tags: ['Archive']
  };
});

export const FULL_CATALOG: Product[] = [...FEATURED_PRODUCTS, ...ARCHIVE_EXTENSIONS, ...GENERATED_ARCHIVE];