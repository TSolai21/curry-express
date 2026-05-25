'use server';

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';

async function saveImage(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null;
  
  const filenameParts = file.name.split('.');
  const ext = filenameParts.length > 1 ? `.${filenameParts.pop()}` : '.jpg';
  const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}${ext}`;
  
  const supabase = await createClient();
  
  const { data, error } = await supabase.storage
    .from('images')
    .upload(filename, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Error uploading image:', error);
    return null;
  }

  const { data: urlData } = supabase.storage
    .from('images')
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}

export async function getReviews() {
  const supabase = await createClient();
  const { data } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
  return data || [];
}

export async function addReview(formData: FormData) {
  const imageFile = formData.get('imageFile') as File | null;
  const imagePath = await saveImage(imageFile);

  const supabase = await createClient();

  const newReview = {
    text: formData.get('text') as string,
    author: formData.get('author') as string,
    source: formData.get('source') as string || 'Website',
    image: imagePath,
    image_pos_x: parseFloat(formData.get('imagePosX') as string || '50'),
    image_pos_y: parseFloat(formData.get('imagePosY') as string || '50'),
  };

  const { error } = await supabase.from('reviews').insert([newReview]);
  
  if (error) {
    console.error('Error adding review:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

export async function getOffers() {
  const supabase = await createClient();
  const { data } = await supabase.from('offers').select('*').order('created_at', { ascending: true });
  if (!data) return [];
  
  return data.map(offer => ({
    ...offer,
    badgeColor: offer.badge_color,
    originalPrice: offer.original_price,
    colSpan: offer.col_span,
    rowSpan: offer.row_span,
  }));
}

export async function addOffer(formData: FormData) {
  const imageFile = formData.get('imageFile') as File | null;
  const imagePath = await saveImage(imageFile);

  const supabase = await createClient();

  const newOffer = {
    title: formData.get('title') as string,
    badge: formData.get('badge') as string,
    badge_color: formData.get('badgeColor') as string,
    subtitle: formData.get('subtitle') as string,
    description: formData.get('description') as string,
    price: formData.get('price') as string,
    original_price: formData.get('originalPrice') as string,
    active: formData.has('active'),
    image: imagePath,
    col_span: parseInt(formData.get('colSpan') as string || '1'),
    row_span: parseInt(formData.get('rowSpan') as string || '1'),
    image_pos_x: parseFloat(formData.get('imagePosX') as string || '50'),
    image_pos_y: parseFloat(formData.get('imagePosY') as string || '50'),
  };

  const { error } = await supabase.from('offers').insert([newOffer]);

  if (error) {
    console.error('Error adding offer:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/');
  revalidatePath('/admin');
  return { success: true };
}

export async function deleteReview(id: string) {
  const supabase = await createClient();
  await supabase.from('reviews').delete().eq('id', id);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function updateReview(id: string, formData: FormData) {
  const imageFile = formData.get('imageFile') as File | null;
  const newImagePath = await saveImage(imageFile);

  const supabase = await createClient();

  const updates: any = {
    text: formData.get('text') as string,
    author: formData.get('author') as string,
    source: formData.get('source') as string,
    image_pos_x: parseFloat(formData.get('imagePosX') as string || '50'),
    image_pos_y: parseFloat(formData.get('imagePosY') as string || '50'),
  };

  const removeImage = formData.get('removeImage') === 'true';

  if (newImagePath) {
    updates.image = newImagePath;
  } else if (removeImage) {
    updates.image = null;
  }

  await supabase.from('reviews').update(updates).eq('id', id);

  revalidatePath('/');
  revalidatePath('/admin');
}

export async function deleteOffer(id: string) {
  const supabase = await createClient();
  await supabase.from('offers').delete().eq('id', id);
  revalidatePath('/');
  revalidatePath('/admin');
}

export async function updateOffer(id: string, formData: FormData) {
  const imageFile = formData.get('imageFile') as File | null;
  const newImagePath = await saveImage(imageFile);

  const supabase = await createClient();

  const updates: any = {
    title: formData.get('title') as string,
    badge: formData.get('badge') as string,
    badge_color: formData.get('badgeColor') as string,
    subtitle: formData.get('subtitle') as string,
    description: formData.get('description') as string,
    price: formData.get('price') as string,
    original_price: formData.get('originalPrice') as string,
    active: formData.has('active'),
    image_pos_x: parseFloat(formData.get('imagePosX') as string || '50'),
    image_pos_y: parseFloat(formData.get('imagePosY') as string || '50'),
    col_span: parseInt(formData.get('colSpan') as string || '1'),
    row_span: parseInt(formData.get('rowSpan') as string || '1'),
  };

  const removeImage = formData.get('removeImage') === 'true';

  if (newImagePath) {
    updates.image = newImagePath;
  } else if (removeImage) {
    updates.image = null;
  }

  await supabase.from('offers').update(updates).eq('id', id);

  revalidatePath('/');
  revalidatePath('/admin');
}

export async function toggleOfferStatus(id: string, active: boolean) {
  const supabase = await createClient();
  await supabase.from('offers').update({ active }).eq('id', id);
  revalidatePath('/');
  revalidatePath('/admin');
}
