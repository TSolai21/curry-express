"use client";
import { useState } from 'react';
import { toggleOfferStatus } from '@/app/actions';
import toast from 'react-hot-toast';

export const OfferStatusToggle = ({ offer }: { offer: any }) => {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const isActive = offer.active !== false;

  async function handleToggle() {
    setLoading(true);
    await toggleOfferStatus(offer.id, !isActive);
    toast.success(`Offer is now ${!isActive ? 'Active' : 'Inactive'}`);
    setLoading(false);
    setConfirming(false);
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setConfirming(true)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isActive ? 'bg-emerald-500' : 'bg-red-500'}`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
        <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-emerald-400' : 'text-red-400'}`}>
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      {confirming && (
        <div className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-surface w-full max-w-sm rounded-xl border border-brand-border p-6 shadow-2xl">
            <h3 className="text-xl font-bold font-display text-cream mb-2">
              {isActive ? 'Deactivate Offer?' : 'Activate Offer?'}
            </h3>
            <p className="text-sm text-brand-text-dim mb-6">
              {isActive 
                ? "This offer will be hidden from the website immediately. Are you sure?" 
                : "This offer will become visible on the website immediately. Are you sure?"}
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setConfirming(false)} 
                disabled={loading}
                className="px-4 py-2 text-sm font-bold text-brand-text-dim hover:text-cream transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleToggle} 
                disabled={loading}
                className={`px-4 py-2 text-sm font-bold rounded text-white transition-colors disabled:opacity-50 ${isActive ? 'bg-red-600 hover:bg-red-500' : 'bg-emerald-600 hover:bg-emerald-500'}`}
              >
                {loading ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
