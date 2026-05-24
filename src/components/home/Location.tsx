import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

export const Location = () => {
  return (
    <section id="contact" className="py-[100px] bg-surface">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="section-label mb-4">Visit Us</div>
            <h2 className="section-title mb-8">Drop By or <em>Order In</em></h2>

            <div className="flex gap-4 mb-7 pb-7 border-b border-brand-border">
              <div className="w-12 h-12 shrink-0 bg-saffron/10 border border-brand-border rounded-lg flex items-center justify-center text-[22px] text-saffron">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-saffron mb-1.5">Location</h3>
                <p className="text-[15px] text-brand-text leading-[1.6]">15190 Walden Rd<br/>Montgomery, TX 77356</p>
              </div>
            </div>

            <div className="flex gap-4 mb-7 pb-7 border-b border-brand-border">
              <div className="w-12 h-12 shrink-0 bg-saffron/10 border border-brand-border rounded-lg flex items-center justify-center text-[22px] text-saffron">
                <FaPhoneAlt />
              </div>
              <div>
                <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-saffron mb-1.5">Contact</h3>
                <p className="text-[15px] text-brand-text leading-[1.6]"><a href="tel:+13468631124" className="hover:text-saffron">+1 (346) 863-1124</a></p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 shrink-0 bg-saffron/10 border border-brand-border rounded-lg flex items-center justify-center text-[22px] text-saffron">
                <FaMapMarkerAlt />
              </div>
              <div className="flex-1">
                <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-saffron mb-1.5">Hours</h3>
                <div className="flex flex-col gap-1 mt-2">
                  <div className="flex justify-between text-[13px] text-brand-text-dim py-1"><span className="text-brand-text">Open Daily</span><span>11:00 AM - 9:30 PM</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-brand-border aspect-[4/3] bg-surface-2">
            <iframe 
              src="https://maps.google.com/maps?q=15190%20Walden%20Rd%2C%20Montgomery%2C%20TX%2077356&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(0.8) hue-rotate(180deg)' }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
