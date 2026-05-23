"use client";

import { useState } from 'react';

interface AdminTabsProps {
  reviewsTab: React.ReactNode;
  offersTab: React.ReactNode;
  reviewsAction?: React.ReactNode;
  offersAction?: React.ReactNode;
}

export const AdminTabs = ({ reviewsTab, offersTab, reviewsAction, offersAction }: AdminTabsProps) => {
  const [activeTab, setActiveTab] = useState<'reviews' | 'offers'>('reviews');

  return (
    <div>
      {/* Tab bar with title + action button */}
      <div className="flex items-end justify-between border-b border-brand-border mb-8">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 px-2 text-lg font-bold font-display transition-colors relative ${activeTab === 'reviews' ? 'text-saffron' : 'text-brand-text-dim hover:text-cream'}`}
          >
            Manage Reviews
            {activeTab === 'reviews' && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-saffron" />}
          </button>
          <button
            onClick={() => setActiveTab('offers')}
            className={`pb-3 px-2 text-lg font-bold font-display transition-colors relative ${activeTab === 'offers' ? 'text-saffron' : 'text-brand-text-dim hover:text-cream'}`}
          >
            Manage Offers
            {activeTab === 'offers' && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-saffron" />}
          </button>
        </div>

        {/* Action button aligned to the right of the title row */}
        <div className="pb-3">
          {activeTab === 'reviews' ? reviewsAction : offersAction}
        </div>
      </div>

      <div>
        {activeTab === 'reviews' ? reviewsTab : offersTab}
      </div>
    </div>
  );
};
