"use client";
import { useState, useEffect } from 'react';
import { deleteReview, updateReview } from '@/app/actions';
import toast from 'react-hot-toast';
import { ReviewImageCropper } from './ReviewImageCropper';

export const ReviewActions = ({ review }: { review: any }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePos, setImagePos] = useState({ x: review.image_pos_x ?? 50, y: review.image_pos_y ?? 50 });
  const [author, setAuthor] = useState(review.author || '');
  const [source, setSource] = useState(review.source || '');
  const [text, setText] = useState(review.text || '');

  useEffect(() => {
    if (editOpen) {
      setAuthor(review.author || '');
      setSource(review.source || '');
      setText(review.text || '');
      setImagePos({ x: review.image_pos_x ?? 50, y: review.image_pos_y ?? 50 });
    }
  }, [review, editOpen]);

  function validate(formData: FormData) {
    const errs: Record<string, string> = {};
    if (!formData.get('author')?.toString().trim()) errs.author = 'Customer name is required';
    if (!formData.get('source')?.toString().trim()) errs.source = 'Source is required';
    if (!formData.get('text')?.toString().trim()) errs.text = 'Review text is required';
    else if (formData.get('text')!.toString().trim().length < 10) errs.text = 'Review must be at least 10 characters';
    return errs;
  }

  async function handleDelete() {
    setLoading(true);
    await deleteReview(review.id);
    toast.success('Review deleted');
    setLoading(false);
    setConfirming(false);
  }

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const errs = validate(formData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    await updateReview(review.id, formData);
    toast.success('Review updated successfully');
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
            <h3 className="text-xl font-bold font-display text-cream mb-2">Delete Review?</h3>
            <p className="text-sm text-brand-text-dim mb-6">This action cannot be undone. The review will be permanently removed.</p>
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
            <h2 className="text-2xl font-display font-bold text-saffron mb-6 border-b border-brand-border pb-2">Edit Review</h2>
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-cream mb-1">Customer Name <span className="text-red-400">*</span></label>
                    <input name="author" value={author} onChange={e => setAuthor(e.target.value)} className={`w-full bg-surface-2 border rounded p-2 text-sm text-cream focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron ${errors.author ? 'border-red-500' : 'border-brand-border'}`} />
                    {errors.author && <p className="mt-1 text-xs text-red-400">{errors.author}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-cream mb-1">Source <span className="text-red-400">*</span></label>
                    <input name="source" value={source} onChange={e => setSource(e.target.value)} className={`w-full bg-surface-2 border rounded p-2 text-sm text-cream focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron ${errors.source ? 'border-red-500' : 'border-brand-border'}`} />
                    {errors.source && <p className="mt-1 text-xs text-red-400">{errors.source}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-cream mb-1">Review Text <span className="text-red-400">*</span></label>
                    <textarea name="text" rows={5} value={text} onChange={e => setText(e.target.value)} className={`w-full bg-surface-2 border rounded p-2 text-sm text-cream focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron ${errors.text ? 'border-red-500' : 'border-brand-border'}`} />
                    {errors.text && <p className="mt-1 text-xs text-red-400">{errors.text}</p>}
                  </div>
                </div>

                {/* Right Column: Image Cropper & Upload */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-cream mb-2">Image (Optional)</label>
                    {!removeImage && (preview || review.image) && (
                      <>
                        <ReviewImageCropper
                          src={preview || review.image}
                          author={author}
                          source={source}
                          text={text}
                          initialX={imagePos.x}
                          initialY={imagePos.y}
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
                      className="w-full bg-surface-2 border border-brand-border rounded p-2 text-sm text-cream file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-saffron file:text-black cursor-pointer" />
                    <input type="hidden" name="removeImage" value={removeImage.toString()} />
                    <input type="hidden" name="imagePosX" value={imagePos.x.toFixed(1)} />
                    <input type="hidden" name="imagePosY" value={imagePos.y.toFixed(1)} />
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
