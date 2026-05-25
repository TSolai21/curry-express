"use client";

import { useRef, useState } from 'react';
import { addReview } from '@/app/actions';
import toast from 'react-hot-toast';
import { ReviewImageCropper } from './ReviewImageCropper';

export const ReviewForm = () => {
  const ref = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [author, setAuthor] = useState('');
  const [source, setSource] = useState('DoorDash');
  const [imagePos, setImagePos] = useState({ x: 50, y: 50 });
  const [text, setText] = useState('');

  function validate(formData: FormData) {
    const errs: Record<string, string> = {};
    if (!formData.get('author')?.toString().trim()) errs.author = 'Customer name is required';
    if (!formData.get('source')?.toString().trim()) errs.source = 'Source is required';
    if (!formData.get('text')?.toString().trim()) errs.text = 'Review text is required';
    else if (formData.get('text')!.toString().trim().length < 10) errs.text = 'Review must be at least 10 characters';
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
    const res = await addReview(formData);
    if (res?.success === false) {
      toast.error(res.error || 'Failed to add review');
    } else {
      toast.success('Review added successfully');
      ref.current?.reset();
      setPreview(null);
      setAuthor('');
      setSource('DoorDash');
      setText('');
      setImagePos({ x: 50, y: 50 });
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
        title="Add Review"
      >
        <span className="group-hover:rotate-90 transition-transform duration-300">+</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-surface w-full max-w-5xl rounded-xl border border-brand-border p-6 md:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button type="button" onClick={() => setIsOpen(false)} className="absolute top-5 right-5 text-brand-text-dim hover:text-white text-xl leading-none">✕</button>
            <h2 className="text-2xl font-display font-bold text-saffron mb-6 border-b border-brand-border pb-2">Add Review</h2>
            <form ref={ref} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-cream mb-1">Customer Name <span className="text-red-400">*</span></label>
                    <input name="author" value={author} onChange={e => setAuthor(e.target.value)} className={`w-full bg-surface-2 border rounded p-2 text-sm text-cream focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron ${errors.author ? 'border-red-500' : 'border-brand-border'}`} placeholder="e.g. John D." />
                    {errors.author && <p className="mt-1 text-xs text-red-400">{errors.author}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-cream mb-1">Source <span className="text-red-400">*</span></label>
                    <input name="source" value={source} onChange={e => setSource(e.target.value)} className={`w-full bg-surface-2 border rounded p-2 text-sm text-cream focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron ${errors.source ? 'border-red-500' : 'border-brand-border'}`} />
                    {errors.source && <p className="mt-1 text-xs text-red-400">{errors.source}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-cream mb-1">Review Text <span className="text-red-400">*</span></label>
                    <textarea name="text" rows={5} value={text} onChange={e => setText(e.target.value)} className={`w-full bg-surface-2 border rounded p-2 text-sm text-cream focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron ${errors.text ? 'border-red-500' : 'border-brand-border'}`} placeholder="Write the review here..." />
                    {errors.text && <p className="mt-1 text-xs text-red-400">{errors.text}</p>}
                  </div>
                </div>

                {/* Right Column: Image Cropper & Upload */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-cream mb-2">Customer Image (Optional)</label>
                    {preview && (
                      <>
                        <ReviewImageCropper
                          src={preview}
                          author={author}
                          source={source}
                          text={text}
                          initialX={imagePos.x}
                          initialY={imagePos.y}
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
                    <input type="file" name="imageFile" accept="image/*" onChange={handleImageChange} className="w-full bg-surface-2 border border-brand-border rounded p-2 text-sm text-cream file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-saffron file:text-black hover:file:bg-saffron/90 cursor-pointer" />
                    <input type="hidden" name="imagePosX" value={imagePos.x.toFixed(1)} />
                    <input type="hidden" name="imagePosY" value={imagePos.y.toFixed(1)} />
                  </div>
                </div>
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
