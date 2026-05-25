"use client";
import { useState } from 'react';
import { deleteOffer, updateOffer } from '@/app/actions';
import toast from 'react-hot-toast';

export const OfferActions = ({ offer }: { offer: any }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await deleteOffer(offer.id);
    toast.success('Offer deleted');
    setLoading(false);
    setConfirming(false);
  }

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await updateOffer(offer.id, formData);
    toast.success('Offer updated successfully');
    setLoading(false);
    setEditOpen(false);
  }

  return (
    <>
      <div className="flex gap-2">
        <button
          onClick={() => setEditOpen(true)}
          className="px-3 py-1 text-xs font-bold rounded bg-surface-2 border border-brand-border text-cream hover:border-saffron hover:text-saffron transition-colors"
        >
          Edit
        </button>
        {confirming ? (
          <div className="flex gap-1 items-center">
            <button onClick={handleDelete} disabled={loading} className="px-3 py-1 text-xs font-bold rounded bg-red-600 text-white hover:bg-red-500 transition-colors disabled:opacity-50">
              {loading ? '...' : 'Confirm'}
            </button>
            <button onClick={() => setConfirming(false)} className="px-2 py-1 text-xs text-brand-text-dim hover:text-cream transition-colors">
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirming(true)}
            className="px-3 py-1 text-xs font-bold rounded bg-surface-2 border border-brand-border text-red-400 hover:border-red-500 hover:bg-red-500/10 transition-colors"
          >
            Delete
          </button>
        )}
      </div>

      {editOpen && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-surface w-full max-w-2xl rounded-xl border border-brand-border p-6 md:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button type="button" onClick={() => setEditOpen(false)} className="absolute top-5 right-5 text-brand-text-dim hover:text-white text-xl leading-none">✕</button>
            <h2 className="text-2xl font-display font-bold text-saffron mb-6 border-b border-brand-border pb-2">Edit Offer</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-cream mb-1">Offer Title</label>
                <input name="title" required defaultValue={offer.title} className="w-full bg-surface-2 border border-brand-border rounded p-2 text-sm text-cream" />
              </div>
              <div className="mb-4 flex items-center gap-3 bg-surface-2 p-4 rounded-lg border border-brand-border">
                <input type="checkbox" id="active" name="active" defaultChecked={offer.active !== false} className="w-5 h-5 accent-saffron cursor-pointer" />
                <label htmlFor="active" className="text-sm font-bold text-cream cursor-pointer">Offer is Active (visible on website)</label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-cream mb-1">Discount Price</label>
                  <input name="price" required defaultValue={offer.price} className="w-full bg-surface-2 border border-brand-border rounded p-2 text-sm text-cream" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-cream mb-1">Original Price</label>
                  <input name="originalPrice" required defaultValue={offer.originalPrice} className="w-full bg-surface-2 border border-brand-border rounded p-2 text-sm text-cream" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-cream mb-1">Badge Text</label>
                  <input name="badge" defaultValue={offer.badge} className="w-full bg-surface-2 border border-brand-border rounded p-2 text-sm text-cream" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-cream mb-1">Badge Color</label>
                  <select name="badgeColor" defaultValue={offer.badgeColor} className="w-full bg-surface-2 border border-brand-border rounded p-2 text-sm text-cream">
                    <option value="saffron">Saffron (Yellow)</option>
                    <option value="crimson">Crimson (Red)</option>
                    <option value="transparent">Transparent (Outline)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-cream mb-2">Image (Optional)</label>
                {!removeImage && (preview || offer.image) && (
                  <div className="mb-4 relative group">
                    <img src={preview || offer.image} alt="Preview" className="w-full h-56 rounded-lg object-cover border border-brand-border" />
                    <button
                      type="button"
                      onClick={() => { setPreview(null); setRemoveImage(true); }}
                      className="absolute top-3 right-3 bg-red-600/90 text-white px-3 py-1.5 text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 shadow-xl"
                    >
                      Remove Image
                    </button>
                  </div>
                )}
                <input type="file" name="imageFile" accept="image/*"
                  onChange={(e) => { const f = e.target.files?.[0]; setPreview(f ? URL.createObjectURL(f) : null); setRemoveImage(false); }}
                  className="w-full bg-surface-2 border border-brand-border rounded p-2 text-sm text-cream file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-saffron file:text-black cursor-pointer" />
                <input type="hidden" name="removeImage" value={removeImage.toString()} />
              </div>
              <div>
                <label className="block text-sm font-bold text-cream mb-1">Description / Items</label>
                <textarea name="description" rows={2} defaultValue={offer.description} className="w-full bg-surface-2 border border-brand-border rounded p-2 text-sm text-cream" />
              </div>
              <button type="submit" disabled={loading} className="bg-saffron text-black px-4 py-2 rounded font-bold text-sm w-full hover:bg-saffron-light disabled:opacity-50 transition-colors">
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
