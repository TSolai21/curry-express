"use client";

import { useRef, useState } from 'react';
import { addReview } from '@/app/actions';

export const ReviewForm = () => {
  const ref = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await addReview(formData);
    ref.current?.reset();
    setPreview(null);
    setLoading(false);
    setIsOpen(false);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-saffron text-black px-4 py-2 rounded font-bold text-sm hover:bg-saffron-light transition-colors"
      >
        + Add Review
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-surface w-full max-w-lg rounded-xl border border-brand-border p-6 md:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button type="button" onClick={() => setIsOpen(false)} className="absolute top-5 right-5 text-brand-text-dim hover:text-white text-xl leading-none">✕</button>
            <h2 className="text-2xl font-display font-bold text-saffron mb-6 border-b border-brand-border pb-2">Add Review</h2>
            <form ref={ref} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-cream mb-1">Customer Name</label>
                <input name="author" required className="w-full bg-surface-2 border border-brand-border rounded p-2 text-sm text-cream" placeholder="e.g. John D." />
              </div>
              <div>
                <label className="block text-sm font-bold text-cream mb-1">Source (e.g. DoorDash, Yelp)</label>
                <input name="source" defaultValue="DoorDash" required className="w-full bg-surface-2 border border-brand-border rounded p-2 text-sm text-cream" />
              </div>

              <div>
                <label className="block text-sm font-bold text-cream mb-1">Customer Image (Optional)</label>
                <div className="flex items-center gap-4">
                  {preview && (
                    <img src={preview} alt="Preview" className="w-12 h-12 rounded-full object-cover border border-brand-border shrink-0" />
                  )}
                  <input type="file" name="imageFile" accept="image/*" onChange={handleImageChange} className="w-full bg-surface-2 border border-brand-border rounded p-2 text-sm text-cream file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-saffron file:text-black hover:file:bg-saffron/90 cursor-pointer" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-cream mb-1">Review Text</label>
                <textarea name="text" required rows={4} className="w-full bg-surface-2 border border-brand-border rounded p-2 text-sm text-cream" placeholder="Write the review here..." />
              </div>
              <button type="submit" disabled={loading} className="bg-saffron text-black px-4 py-2 rounded font-bold text-sm w-full hover:bg-saffron-light disabled:opacity-50 transition-colors">
                {loading ? 'Adding...' : 'Add Review'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
