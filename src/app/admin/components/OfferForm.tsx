"use client";

import { useRef, useState } from 'react';
import { addOffer } from '@/app/actions';
import toast from 'react-hot-toast';
import { OfferImageCropper } from './OfferImageCropper';
import Select from 'react-select';

const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    backgroundColor: '#1e1d1a',
    borderColor: state.isFocused ? '#f4a015' : 'rgba(244, 160, 21, 0.15)',
    boxShadow: state.isFocused ? '0 0 0 1px #f4a015' : 'none',
    '&:hover': {
      borderColor: '#f4a015',
    },
    borderRadius: '0.375rem',
    minHeight: '38px',
    color: '#f5edd6',
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: '#1e1d1a',
    border: '1px solid rgba(244, 160, 21, 0.15)',
    borderRadius: '0.375rem',
    zIndex: 9999,
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected 
      ? '#f4a015' 
      : state.isFocused 
        ? 'rgba(244, 160, 21, 0.15)' 
        : 'transparent',
    color: state.isSelected ? '#0a0908' : '#f5edd6',
    cursor: 'pointer',
    '&:active': {
      backgroundColor: '#f4a015',
    },
  }),
  singleValue: (base: any) => ({
    ...base,
    color: '#f5edd6',
  }),
  input: (base: any) => ({
    ...base,
    color: '#f5edd6',
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

export const OfferForm = () => {
  const ref = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [badge, setBadge] = useState('');
  const [description, setDescription] = useState('');
  const [imagePos, setImagePos] = useState({ x: 50, y: 50 });
  const [colSpan, setColSpan] = useState(1);
  const [badgeColor, setBadgeColor] = useState('saffron');

  function validate(formData: FormData) {
    const errs: Record<string, string> = {};
    if (!formData.get('title')?.toString().trim()) errs.title = 'Title is required';
    if (!formData.get('price')?.toString().trim()) errs.price = 'Discount price is required';
    if (!formData.get('originalPrice')?.toString().trim()) errs.originalPrice = 'Original price is required';
    if (!formData.get('badge')?.toString().trim()) errs.badge = 'Badge text is required';
    if (!formData.get('description')?.toString().trim()) errs.description = 'Description is required';
    const imageFile = formData.get('imageFile') as File | null;
    if (!imageFile || imageFile.size === 0) errs.image = 'An image is required';
    return errs;
  }

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
    const formData = new FormData(e.currentTarget);
    const errs = validate(formData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    const res = await addOffer(formData);
    if (res?.success === false) {
      toast.error(res.error || 'Failed to add offer');
    } else {
      toast.success('Offer added successfully');
      ref.current?.reset();
      setPreview(null);
      setTitle('');
      setPrice('');
      setOriginalPrice('');
      setBadge('');
      setDescription('');
      setImagePos({ x: 50, y: 50 });
      setColSpan(1);
      setBadgeColor('saffron');
      setIsOpen(false);
    }
    setLoading(false);
  }

  return (
    <>
      {/* Trigger: Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[2000] bg-saffron text-black w-14 h-14 rounded-full flex items-center justify-center font-bold text-2xl hover:bg-saffron-light shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group"
        title="Add Offer"
      >
        <span className="group-hover:rotate-90 transition-transform duration-300">+</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-surface w-full max-w-5xl rounded-xl border border-brand-border p-6 md:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button type="button" onClick={() => setIsOpen(false)} className="absolute top-5 right-5 text-brand-text-dim hover:text-white text-xl leading-none">✕</button>
            <h2 className="text-2xl font-display font-bold text-saffron mb-6 border-b border-brand-border pb-2">Add Offer</h2>
            <form ref={ref} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-cream mb-1">Offer Title <span className="text-red-400">*</span></label>
                    <input name="title" value={title} onChange={e => setTitle(e.target.value)} className={`w-full bg-surface-2 border rounded p-2 text-sm text-cream focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron ${errors.title ? 'border-red-500' : 'border-brand-border'}`} placeholder="e.g. Family Feast Combo" />
                    {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
                  </div>
                  <div className="mb-4 flex items-center gap-3 py-1">
                    <input type="checkbox" id="active" name="active" defaultChecked className="w-5 h-5 accent-saffron cursor-pointer" />
                    <label htmlFor="active" className="text-sm font-bold text-cream cursor-pointer">Offer is Active (visible on website)</label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-cream mb-1">Discount Price <span className="text-red-400">*</span></label>
                      <input name="price" value={price} onChange={e => setPrice(e.target.value)} className={`w-full bg-surface-2 border rounded p-2 text-sm text-cream focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron ${errors.price ? 'border-red-500' : 'border-brand-border'}`} placeholder="$36.99" />
                      {errors.price && <p className="mt-1 text-xs text-red-400">{errors.price}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-cream mb-1">Original Price <span className="text-red-400">*</span></label>
                      <input name="originalPrice" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)} className={`w-full bg-surface-2 border rounded p-2 text-sm text-cream focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron ${errors.originalPrice ? 'border-red-500' : 'border-brand-border'}`} placeholder="$54.00" />
                      {errors.originalPrice && <p className="mt-1 text-xs text-red-400">{errors.originalPrice}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-cream mb-1">Badge Text <span className="text-red-400">*</span></label>
                      <input name="badge" value={badge} onChange={e => setBadge(e.target.value)} className={`w-full bg-surface-2 border rounded p-2 text-sm text-cream focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron ${errors.badge ? 'border-red-500' : 'border-brand-border'}`} placeholder="e.g. Most Popular" />
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
                    <textarea name="description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className={`w-full bg-surface-2 border rounded p-2 text-sm text-cream focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron ${errors.description ? 'border-red-500' : 'border-brand-border'}`} placeholder="2 Curries · 1 Biryani..." />
                    {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description}</p>}
                  </div>
                </div>

                {/* Right Column: Image Cropper & Upload */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-cream mb-1">Upload Image <span className="text-red-400">*</span></label>
                    {preview && (
                      <>
                        <OfferImageCropper
                          src={preview}
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
                          onClick={() => {
                            setPreview(null);
                            setImagePos({ x: 50, y: 50 });
                            const fileInput = document.querySelector('input[name="imageFile"]') as HTMLInputElement;
                            if (fileInput) fileInput.value = '';
                          }}
                          className="mb-3 text-xs text-red-400 hover:text-red-300 font-bold transition-colors"
                        >
                          ✕ Remove Image
                        </button>
                      </>
                    )}
                    <input type="file" name="imageFile" accept="image/*" onChange={handleImageChange} className={`w-full bg-surface-2 border rounded p-2 text-sm text-cream file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-saffron file:text-black hover:file:bg-saffron/90 cursor-pointer ${errors.image ? 'border-red-500' : 'border-brand-border'}`} />
                    {errors.image && <p className="mt-1 text-xs text-red-400">{errors.image}</p>}
                    <input type="hidden" name="imagePosX" value={imagePos.x.toFixed(1)} />
                    <input type="hidden" name="imagePosY" value={imagePos.y.toFixed(1)} />
                    <input type="hidden" name="rowSpan" value={colSpan.toString()} />
                  </div>
                </div>
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
