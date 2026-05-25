"use client";
import { useState, useEffect } from 'react';
import { deleteOffer, updateOffer } from '@/app/actions';
import toast from 'react-hot-toast';
import { OfferImageCropper } from './OfferImageCropper';
import Select from 'react-select';

const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    backgroundColor: '#141414',
    borderColor: state.isFocused ? '#ebb046' : '#222222',
    boxShadow: state.isFocused ? '0 0 0 1px #ebb046' : 'none',
    '&:hover': {
      borderColor: '#ebb046',
    },
    borderRadius: '0.375rem',
    minHeight: '38px',
    color: '#f5f5dc',
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: '#141414',
    border: '1px solid #222222',
    borderRadius: '0.375rem',
    zIndex: 9999,
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected 
      ? '#ebb046' 
      : state.isFocused 
        ? 'rgba(235, 176, 70, 0.15)' 
        : 'transparent',
    color: state.isSelected ? '#000000' : '#f5f5dc',
    cursor: 'pointer',
    '&:active': {
      backgroundColor: '#ebb046',
    },
  }),
  singleValue: (base: any) => ({
    ...base,
    color: '#f5f5dc',
  }),
  input: (base: any) => ({
    ...base,
    color: '#f5f5dc',
  }),
};

const badgeColorOptions = [
  { value: 'saffron', label: 'Saffron (Yellow)' },
  { value: 'crimson', label: 'Crimson (Red)' },
  { value: 'transparent', label: 'Transparent (Outline)' }
];

const cardSizeOptions = [
  { value: 1, label: 'Small Card' },
  { value: 2, label: 'Large Card' }
];

export const OfferActions = ({ offer }: { offer: any }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [title, setTitle] = useState(offer.title || '');
  const [price, setPrice] = useState(offer.price || '');
  const [originalPrice, setOriginalPrice] = useState(offer.originalPrice || '');
  const [badge, setBadge] = useState(offer.badge || '');
  const [description, setDescription] = useState(offer.description || '');
  const [imagePos, setImagePos] = useState({ x: offer.image_pos_x ?? 50, y: offer.image_pos_y ?? 50 });
  const [colSpan, setColSpan] = useState(offer.colSpan ?? 1);
  const [badgeColor, setBadgeColor] = useState(offer.badgeColor || 'saffron');

  useEffect(() => {
    if (editOpen) {
      setTitle(offer.title || '');
      setPrice(offer.price || '');
      setOriginalPrice(offer.originalPrice || '');
      setBadge(offer.badge || '');
      setDescription(offer.description || '');
      setImagePos({ x: offer.image_pos_x ?? 50, y: offer.image_pos_y ?? 50 });
      setColSpan(offer.colSpan ?? 1);
      setBadgeColor(offer.badgeColor || 'saffron');
    }
  }, [offer, editOpen]);

  function validate(formData: FormData, hasImage: boolean) {
    const errs: Record<string, string> = {};
    if (!formData.get('title')?.toString().trim()) errs.title = 'Title is required';
    if (!formData.get('price')?.toString().trim()) errs.price = 'Discount price is required';
    if (!formData.get('originalPrice')?.toString().trim()) errs.originalPrice = 'Original price is required';
    if (!formData.get('badge')?.toString().trim()) errs.badge = 'Badge text is required';
    if (!formData.get('description')?.toString().trim()) errs.description = 'Description is required';
    const imageFile = formData.get('imageFile') as File | null;
    const hasNewFile = imageFile && imageFile.size > 0;
    if (!hasNewFile && !hasImage) errs.image = 'An image is required';
    return errs;
  }

  async function handleDelete() {
    setLoading(true);
    await deleteOffer(offer.id);
    toast.success('Offer deleted');
    setLoading(false);
    setConfirming(false);
  }

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const hasImage = !removeImage && (!!preview || !!offer.image);
    const errs = validate(formData, hasImage);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
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
        <button
          onClick={() => setConfirming(true)}
          className="px-3 py-1 text-xs font-bold rounded bg-surface-2 border border-brand-border text-red-400 hover:border-red-500 hover:bg-red-500/10 transition-colors"
        >
          Delete
        </button>
      </div>

      {confirming && (
        <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-surface w-full max-w-sm rounded-xl border border-brand-border p-6 shadow-2xl">
            <h3 className="text-xl font-bold font-display text-cream mb-2">Delete Offer?</h3>
            <p className="text-sm text-brand-text-dim mb-6">This action cannot be undone. The offer will be permanently removed.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setConfirming(false)} disabled={loading} className="px-4 py-2 text-sm font-bold text-brand-text-dim hover:text-cream transition-colors">
                Cancel
              </button>
              <button onClick={handleDelete} disabled={loading} className="px-4 py-2 text-sm font-bold rounded bg-red-600 text-white hover:bg-red-500 transition-colors disabled:opacity-50">
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {editOpen && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-surface w-full max-w-5xl rounded-xl border border-brand-border p-6 md:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button type="button" onClick={() => setEditOpen(false)} className="absolute top-5 right-5 text-brand-text-dim hover:text-white text-xl leading-none">✕</button>
            <h2 className="text-2xl font-display font-bold text-saffron mb-6 border-b border-brand-border pb-2">Edit Offer</h2>
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-cream mb-1">Offer Title <span className="text-red-400">*</span></label>
                    <input name="title" value={title} onChange={e => setTitle(e.target.value)} className={`w-full bg-surface-2 border rounded p-2 text-sm text-cream ${errors.title ? 'border-red-500' : 'border-brand-border'}`} />
                    {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
                  </div>
                  <div className="mb-4 flex items-center gap-3 bg-surface-2 p-4 rounded-lg border border-brand-border">
                    <input type="checkbox" id="active" name="active" defaultChecked={offer.active !== false} className="w-5 h-5 accent-saffron cursor-pointer" />
                    <label htmlFor="active" className="text-sm font-bold text-cream cursor-pointer">Offer is Active (visible on website)</label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-cream mb-1">Discount Price <span className="text-red-400">*</span></label>
                      <input name="price" value={price} onChange={e => setPrice(e.target.value)} className={`w-full bg-surface-2 border rounded p-2 text-sm text-cream ${errors.price ? 'border-red-500' : 'border-brand-border'}`} />
                      {errors.price && <p className="mt-1 text-xs text-red-400">{errors.price}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-cream mb-1">Original Price <span className="text-red-400">*</span></label>
                      <input name="originalPrice" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)} className={`w-full bg-surface-2 border rounded p-2 text-sm text-cream ${errors.originalPrice ? 'border-red-500' : 'border-brand-border'}`} />
                      {errors.originalPrice && <p className="mt-1 text-xs text-red-400">{errors.originalPrice}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-cream mb-1">Badge Text <span className="text-red-400">*</span></label>
                      <input name="badge" value={badge} onChange={e => setBadge(e.target.value)} className={`w-full bg-surface-2 border rounded p-2 text-sm text-cream ${errors.badge ? 'border-red-500' : 'border-brand-border'}`} />
                      {errors.badge && <p className="mt-1 text-xs text-red-400">{errors.badge}</p>}
                    </div>
                     <div>
                      <label className="block text-sm font-bold text-cream mb-1">Badge Color <span className="text-red-400">*</span></label>
                      <Select
                        name="badgeColor"
                        options={badgeColorOptions}
                        value={badgeColorOptions.find(o => o.value === badgeColor)}
                        onChange={(val) => setBadgeColor(val?.value || 'saffron')}
                        styles={selectStyles}
                        isSearchable={false}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-cream mb-1">Card Size <span className="text-red-400">*</span></label>
                      <Select
                        name="colSpan"
                        options={cardSizeOptions}
                        value={cardSizeOptions.find(o => o.value === colSpan)}
                        onChange={(val) => setColSpan(val?.value ?? 1)}
                        styles={selectStyles}
                        isSearchable={false}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-cream mb-1">Description / Items <span className="text-red-400">*</span></label>
                    <textarea name="description" rows={3} value={description} onChange={e => setDescription(e.target.value)} className={`w-full bg-surface-2 border rounded p-2 text-sm text-cream ${errors.description ? 'border-red-500' : 'border-brand-border'}`} />
                    {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description}</p>}
                  </div>
                </div>

                {/* Right Column: Image Cropper & Upload */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-cream mb-2">Image <span className="text-red-400">*</span></label>
                    {!removeImage && (preview || offer.image) && (
                      <>
                        <OfferImageCropper
                          src={preview || offer.image}
                          title={title}
                          price={price}
                          originalPrice={originalPrice}
                          badge={badge}
                          badgeColor={badgeColor}
                          description={description}
                          initialX={imagePos.x}
                          initialY={imagePos.y}
                          colSpan={colSpan}
                          onPositionChange={(x, y) => setImagePos({ x, y })}
                        />
                        <button
                          type="button"
                          onClick={() => { setPreview(null); setRemoveImage(true); setImagePos({ x: 50, y: 50 }); }}
                          className="mb-3 text-xs text-red-400 hover:text-red-300 font-bold transition-colors"
                        >
                          ✕ Remove Image
                        </button>
                      </>
                    )}
                    <input type="file" name="imageFile" accept="image/*"
                      onChange={(e) => { const f = e.target.files?.[0]; setPreview(f ? URL.createObjectURL(f) : null); setRemoveImage(false); }}
                      className={`w-full bg-surface-2 border rounded p-2 text-sm text-cream file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-saffron file:text-black cursor-pointer ${errors.image ? 'border-red-500' : 'border-brand-border'}`} />
                    {errors.image && <p className="mt-1 text-xs text-red-400">{errors.image}</p>}
                    <input type="hidden" name="removeImage" value={removeImage.toString()} />
                    <input type="hidden" name="imagePosX" value={imagePos.x.toFixed(1)} />
                    <input type="hidden" name="imagePosY" value={imagePos.y.toFixed(1)} />
                    <input type="hidden" name="rowSpan" value={colSpan.toString()} />
                  </div>
                </div>
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
