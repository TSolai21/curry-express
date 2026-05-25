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
            <div className="overflow-x-auto rounded-xl border border-brand-border">
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
                      <td className="px-4 py-3 font-bold text-cream whitespace-nowrap">{r.author}</td>
                      <td className="px-4 py-3 text-saffron whitespace-nowrap">{r.source}</td>
                      <td className="px-4 py-3 text-cream/80 italic max-w-xs truncate">"{r.text}"</td>
                      <td className="px-4 py-3"><ReviewActions review={r} /></td>
                    </tr>
                  ))}
                  {reviews.length === 0 && (
                    <tr><td colSpan={6} className="px-4 py-8 text-center text-brand-text-dim">No reviews yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        }
        offersTab={
          <section>
            <p className="text-sm text-brand-text-dim mb-4">{offers.length} offer{offers.length !== 1 ? 's' : ''} total</p>
            <div className="overflow-x-auto rounded-xl border border-brand-border">
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
                    <tr><td colSpan={6} className="px-4 py-8 text-center text-brand-text-dim">No offers yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        }
      />
    </div>
  );
}
