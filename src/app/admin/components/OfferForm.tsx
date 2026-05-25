"use client";

import { useRef, useState } from 'react';
import { addOffer } from '@/app/actions';
import toast from 'react-hot-toast';

export const OfferForm = () => {
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
    const res = await addOffer(formData);
    if (res?.success === false) {
      toast.error(res.error || 'Failed to add offer');
    } else {
      toast.success('Offer added successfully');
      ref.current?.reset();
      setPreview(null);
      setIsOpen(false);
    }
    setLoading(false);
  }

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-saffron text-black px-4 py-2 rounded font-bold text-sm hover:bg-saffron-light transition-colors"
      >
        + Add Offer
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-surface w-full max-w-2xl rounded-xl border border-brand-border p-6 md:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button type="button" onClick={() => setIsOpen(false)} className="absolute top-5 right-5 text-brand-text-dim hover:text-white text-xl leading-none">✕</button>
            <h2 className="text-2xl font-display font-bold text-saffron mb-6 border-b border-brand-border pb-2">Add Offer</h2>
            <form ref={ref} onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-cream mb-1">Offer Title</label>
                <input name="title" required className="w-full bg-surface-2 border border-brand-border rounded p-2 text-sm text-cream" placeholder="e.g. Family Feast Combo" />
              </div>
              <div className="mb-4 flex items-center gap-3 bg-surface-2 p-4 rounded-lg border border-brand-border">
                <input type="checkbox" id="active" name="active" defaultChecked className="w-5 h-5 accent-saffron cursor-pointer" />
                <label htmlFor="active" className="text-sm font-bold text-cream cursor-pointer">Offer is Active (visible on website)</label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-cream mb-1">Discount Price</label>
                  <input name="price" required className="w-full bg-surface-2 border border-brand-border rounded p-2 text-sm text-cream" placeholder="$36.99" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-cream mb-1">Original Price</label>
                  <input name="originalPrice" required className="w-full bg-surface-2 border border-brand-border rounded p-2 text-sm text-cream" placeholder="$54.00" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-cream mb-1">Badge Text</label>
                  <input name="badge" className="w-full bg-surface-2 border border-brand-border rounded p-2 text-sm text-cream" placeholder="e.g. Most Popular" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-cream mb-1">Badge Color</label>
                  <select name="badgeColor" className="w-full bg-surface-2 border border-brand-border rounded p-2 text-sm text-cream">
                    <option value="saffron">Saffron (Yellow)</option>
                    <option value="crimson">Crimson (Red)</option>
                    <option value="transparent">Transparent (Outline)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-cream mb-1">Upload Image</label>
                {preview && (
                  <div className="mb-4 relative group">
                    <img src={preview} alt="Preview" className="w-full h-56 rounded-lg object-cover border border-brand-border" />
                    <button
                      type="button"
                      onClick={() => {
                        setPreview(null);
                        const fileInput = document.querySelector('input[name="imageFile"]') as HTMLInputElement;
                        if (fileInput) fileInput.value = '';
                      }}
                      className="absolute top-3 right-3 bg-red-600/90 text-white px-3 py-1.5 text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 shadow-xl"
                    >
                      Clear Selection
                    </button>
                  </div>
                )}
                <input type="file" name="imageFile" accept="image/*" onChange={handleImageChange} className="w-full bg-surface-2 border border-brand-border rounded p-2 text-sm text-cream file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-saffron file:text-black hover:file:bg-saffron/90 cursor-pointer" />
              </div>
              <div>
                <label className="block text-sm font-bold text-cream mb-1">Description / Items</label>
                <textarea name="description" required rows={2} className="w-full bg-surface-2 border border-brand-border rounded p-2 text-sm text-cream" placeholder="2 Curries · 1 Biryani..." />
              </div>
              <button type="submit" disabled={loading} className="bg-saffron text-black px-4 py-2 rounded font-bold text-sm w-full hover:bg-saffron-light disabled:opacity-50 transition-colors">
                {loading ? 'Adding...' : 'Add Offer'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
