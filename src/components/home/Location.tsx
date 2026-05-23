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
                <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-saffron mb-1.5">Contact Us</h3>
                <p className="text-[15px] text-brand-text leading-[1.6]">123 Spice Route Ave<br/>Seattle, WA 98101</p>
              </div>
            </div>

            <div className="flex gap-4 mb-7 pb-7 border-b border-brand-border">
              <div className="w-12 h-12 shrink-0 bg-saffron/10 border border-brand-border rounded-lg flex items-center justify-center text-[22px] text-saffron">
                <FaPhoneAlt />
              </div>
              <div>
                <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-saffron mb-1.5">Contact</h3>
                <p className="text-[15px] text-brand-text leading-[1.6]"><a href="tel:+12065550199" className="hover:text-saffron">(206) 555-0199</a><br/><a href="mailto:hello@curryexpress.com" className="hover:text-saffron">hello@curryexpress.com</a></p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 shrink-0 bg-saffron/10 border border-brand-border rounded-lg flex items-center justify-center text-[22px] text-saffron">
                <FaMapMarkerAlt />
              </div>
              <div className="flex-1">
                <h3 className="text-[11px] font-bold tracking-[0.15em] uppercase text-saffron mb-1.5">Hours</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-1">
                  <div className="flex justify-between text-[13px] text-brand-text-dim py-1"><span className="text-brand-text">Mon - Thu</span><span>11:00 AM - 10:00 PM</span></div>
                  <div className="flex justify-between text-[13px] text-brand-text-dim py-1"><span className="text-brand-text">Friday</span><span>11:00 AM - 11:00 PM</span></div>
                  <div className="flex justify-between text-[13px] text-brand-text-dim py-1"><span className="text-brand-text">Saturday</span><span>12:00 PM - 11:00 PM</span></div>
                  <div className="flex justify-between text-[13px] text-brand-text-dim py-1"><span className="text-brand-text">Sunday</span><span>12:00 PM - 10:00 PM</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-brand-border aspect-[4/3] bg-surface-2">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d86016.92025114757!2d-122.40428054774676!3d47.613028448834316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490102c93e83355%3A0x102565466944d59a!2sSeattle%2C%20WA!5e0!3m2!1sen!2sus!4v1716447814421!5m2!1sen!2sus" 
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
