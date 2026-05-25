import { getReviews, getOffers } from '@/app/actions';
import { ReviewForm } from './components/ReviewForm';
import { OfferForm } from './components/OfferForm';
import { AdminTabs } from './components/AdminTabs';
import { ReviewActions } from './components/ReviewActions';
import { OfferActions } from './components/OfferActions';
import { OfferStatusToggle } from './components/OfferStatusToggle';

export default async function AdminPage() {
  const reviews = await getReviews();
  const offers = await getOffers();

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-3xl font-display font-bold mb-2">Content Management</h1>
        <p className="text-muted text-sm">Add new reviews and special offers to the homepage.</p>
      </header>

      <AdminTabs
        reviewsAction={<ReviewForm />}
        offersAction={<OfferForm />}
        reviewsTab={
          <section>
            <p className="text-sm text-brand-text-dim mb-4">{reviews.length} review{reviews.length !== 1 ? 's' : ''} total</p>
            
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-brand-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface border-b border-brand-border">
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-brand-text-dim">Image</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-brand-text-dim">Author</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-brand-text-dim">Source</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-brand-text-dim">Review</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-brand-text-dim">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((r: any, i: number) => (
                    <tr key={r.id} className={`border-b border-brand-border last:border-0 ${i % 2 === 0 ? 'bg-black/20' : ''}`}>
                      <td className="px-4 py-3">
                        {r.image ? (
                          <img src={r.image} alt={r.author} className="w-12 h-12 rounded-full object-cover border-2 border-brand-border" />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-saffron/20 border-2 border-saffron/30 flex items-center justify-center font-bold text-saffron text-base">
                            {r.author?.charAt(0)}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-cream whitespace-nowrap">{r.author}</div>
                        <div className="flex gap-0.5 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className={`w-3.5 h-3.5 ${star <= (r.rating || 5) ? 'text-saffron fill-saffron' : 'text-brand-text-dim/20 fill-transparent'}`} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.196-.612 1.056-.612 1.252 0l1.834 5.727a.75.75 0 00.713.518h6.019c.643 0 .909.824.39 1.218l-4.87 3.717a.75.75 0 00-.272.838l1.834 5.727c.196.612-.505 1.123-1.018.75l-4.87-3.718a.75.75 0 00-.877 0l-4.87 3.718c-.513.75-1.214.238-1.018-.75l1.834-5.727a.75.75 0 00-.272-.838l-4.87-3.717c-.519-.394-.253-1.218.39-1.218h6.019a.75.75 0 00.713-.518l1.834-5.727z" />
                            </svg>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-brand-text-dim whitespace-nowrap">{r.source}</td>
                      <td className="px-4 py-3 text-cream/80 italic max-w-xs truncate">"{r.text}"</td>
                      <td className="px-4 py-3"><ReviewActions review={r} /></td>
                    </tr>
                  ))}
                  {reviews.length === 0 && (
                    <tr><td colSpan={5} className="px-4 py-8 text-center text-brand-text-dim">No reviews yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List */}
            <div className="block md:hidden space-y-4">
              {reviews.map((r: any) => (
                <div key={r.id} className="bg-surface border border-brand-border rounded-xl p-4 space-y-4 shadow-md">
                  <div className="flex items-center gap-3">
                    {r.image ? (
                      <img src={r.image} alt={r.author} className="w-10 h-10 rounded-full object-cover border border-brand-border" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-saffron/20 border border-saffron/30 flex items-center justify-center font-bold text-saffron text-sm shrink-0">
                        {r.author?.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-bold text-cream text-sm">{r.author}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs text-saffron">via {r.source}</span>
                        <span className="text-[10px] text-saffron/50">·</span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className={`w-3 h-3 ${star <= (r.rating || 5) ? 'text-saffron fill-saffron' : 'text-brand-text-dim/20 fill-transparent'}`} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.196-.612 1.056-.612 1.252 0l1.834 5.727a.75.75 0 00.713.518h6.019c.643 0 .909.824.39 1.218l-4.87 3.717a.75.75 0 00-.272.838l1.834 5.727c.196.612-.505 1.123-1.018.75l-4.87-3.718a.75.75 0 00-.877 0l-4.87 3.718c-.513.75-1.214.238-1.018-.75l1.834-5.727a.75.75 0 00-.272-.838l-4.87-3.717c-.519-.394-.253-1.218.39-1.218h6.019a.75.75 0 00.713-.518l1.834-5.727z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-cream/80 italic line-clamp-3">"{r.text}"</p>
                  <div className="flex justify-end pt-3 border-t border-brand-border/40">
                    <ReviewActions review={r} />
                  </div>
                </div>
              ))}
              {reviews.length === 0 && (
                <p className="text-center text-brand-text-dim text-sm py-8">No reviews yet.</p>
              )}
            </div>
          </section>
        }
        offersTab={
          <section>
            <p className="text-sm text-brand-text-dim mb-4">{offers.length} offer{offers.length !== 1 ? 's' : ''} total</p>
            
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto rounded-xl border border-brand-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface border-b border-brand-border">
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-brand-text-dim">Image</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-brand-text-dim">Title</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-brand-text-dim">Price</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-brand-text-dim">Original</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-brand-text-dim">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-brand-text-dim">Badge</th>
                    <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wider text-brand-text-dim">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {offers.map((o: any, i: number) => (
                    <tr key={o.id} className={`border-b border-brand-border last:border-0 ${i % 2 === 0 ? 'bg-black/20' : ''}`}>
                      <td className="px-4 py-3">
                        <img src={o.image} alt={o.title} className="w-12 h-12 object-cover rounded-lg border border-brand-border" />
                      </td>
                      <td className="px-4 py-3 font-bold text-cream whitespace-nowrap">{o.title}</td>
                      <td className="px-4 py-3 text-saffron font-bold whitespace-nowrap">{o.price}</td>
                      <td className="px-4 py-3 text-brand-text-dim line-through whitespace-nowrap">{o.originalPrice}</td>
                      <td className="px-4 py-3">
                        <OfferStatusToggle offer={o} />
                      </td>
                      <td className="px-4 py-3">
                        {o.badge && <span className="bg-saffron text-black text-xs font-bold px-2 py-0.5 rounded">{o.badge}</span>}
                      </td>
                      <td className="px-4 py-3"><OfferActions offer={o} /></td>
                    </tr>
                  ))}
                  {offers.length === 0 && (
                    <tr><td colSpan={7} className="px-4 py-8 text-center text-brand-text-dim">No offers yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List */}
            <div className="block md:hidden space-y-4">
              {offers.map((o: any) => (
                <div key={o.id} className="bg-surface border border-brand-border rounded-xl p-4 space-y-4 shadow-md">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <img src={o.image} alt={o.title} className="w-12 h-12 object-cover rounded-lg border border-brand-border shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-cream text-sm truncate">{o.title}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-saffron font-bold text-xs">{o.price}</span>
                          <span className="text-brand-text-dim line-through text-[10px]">{o.originalPrice}</span>
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0 pt-0.5">
                      <OfferStatusToggle offer={o} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-brand-border/40">
                    <div>
                      {o.badge && <span className="bg-saffron text-black text-[10px] font-bold px-2 py-0.5 rounded">{o.badge}</span>}
                    </div>
                    <OfferActions offer={o} />
                  </div>
                </div>
              ))}
              {offers.length === 0 && (
                <p className="text-center text-brand-text-dim text-sm py-8">No offers yet.</p>
              )}
            </div>
          </section>
        }
      />
    </div>
  );
}
