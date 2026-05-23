'use server';

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

const getFilePath = (filename: string) => path.join(process.cwd(), 'src', 'data', filename);

function ensureDataDir() {
  const dir = path.join(process.cwd(), 'src', 'data');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function saveImage(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = path.extname(file.name) || '.jpg';
  const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}${ext}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(uploadDir, filename), buffer);
  return `/uploads/${filename}`;
}

export async function getReviews() {
  const filePath = getFilePath('reviews.json');
  if (!fs.existsSync(filePath)) return [];
  const fileData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileData);
}

export async function addReview(formData: FormData) {
  const imageFile = formData.get('imageFile') as File | null;
  const imagePath = await saveImage(imageFile);

  const newReview = {
    id: Date.now().toString(),
    text: formData.get('text') as string,
    author: formData.get('author') as string,
    source: formData.get('source') as string || 'Website',
    rating: parseInt(formData.get('rating') as string || '5'),
    image: imagePath
  };

  const reviews = await getReviews();
  reviews.unshift(newReview); // Add to beginning

  ensureDataDir();
  fs.writeFileSync(getFilePath('reviews.json'), JSON.stringify(reviews, null, 2));
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

export async function getOffers() {
  const filePath = getFilePath('offers.json');
  if (!fs.existsSync(filePath)) return [];
  const fileData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileData);
}

export async function addOffer(formData: FormData) {
  const imageFile = formData.get('imageFile') as File | null;
  const imagePath = await saveImage(imageFile);

  const newOffer = {
    id: Date.now().toString(),
    title: formData.get('title') as string,
    badge: formData.get('badge') as string,
    badgeColor: formData.get('badgeColor') as string,
    subtitle: formData.get('subtitle') as string,
    description: formData.get('description') as string,
    price: formData.get('price') as string,
    originalPrice: formData.get('originalPrice') as string,
    image: imagePath || formData.get('image') as string,
    colSpan: parseInt(formData.get('colSpan') as string || '1'),
    rowSpan: parseInt(formData.get('rowSpan') as string || '1')
  };

  const offers = await getOffers();
  offers.push(newOffer);

  ensureDataDir();
  fs.writeFileSync(getFilePath('offers.json'), JSON.stringify(offers, null, 2));
  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteReview(id: string) {
  const reviews = await getReviews();
  const updated = reviews.filter((r: any) => r.id !== id);
  ensureDataDir();
  fs.writeFileSync(getFilePath('reviews.json'), JSON.stringify(updated, null, 2));
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function updateReview(id: string, formData: FormData) {
  const reviews = await getReviews();
  const imageFile = formData.get('imageFile') as File | null;
  const newImagePath = await saveImage(imageFile);

  const updated = reviews.map((r: any) =>
    r.id === id ? {
      ...r,
      text: formData.get('text') as string,
      author: formData.get('author') as string,
      source: formData.get('source') as string,
      rating: parseInt(formData.get('rating') as string || String(r.rating ?? 5)),
      image: newImagePath || r.image,
    } : r
  );
  ensureDataDir();
  fs.writeFileSync(getFilePath('reviews.json'), JSON.stringify(updated, null, 2));
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function deleteOffer(id: string) {
  const offers = await getOffers();
  const updated = offers.filter((o: any) => o.id !== id);
  ensureDataDir();
  fs.writeFileSync(getFilePath('offers.json'), JSON.stringify(updated, null, 2));
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function updateOffer(id: string, formData: FormData) {
  const offers = await getOffers();
  const imageFile = formData.get('imageFile') as File | null;
  const newImagePath = await saveImage(imageFile);

  const updated = offers.map((o: any) =>
    o.id === id ? {
      ...o,
      title: formData.get('title') as string,
      badge: formData.get('badge') as string,
      badgeColor: formData.get('badgeColor') as string,
      description: formData.get('description') as string,
      price: formData.get('price') as string,
      originalPrice: formData.get('originalPrice') as string,
      image: newImagePath || (formData.get('image') as string) || o.image,
    } : o
  );
  ensureDataDir();
  fs.writeFileSync(getFilePath('offers.json'), JSON.stringify(updated, null, 2));
  revalidatePath('/');
  revalidatePath('/admin');
}
