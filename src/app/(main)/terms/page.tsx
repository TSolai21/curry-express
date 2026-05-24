import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Curry Express',
  description: 'Terms of Service for Curry Express',
};

export default function TermsOfService() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-[800px] mx-auto">
      <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-8">Terms of Service</h1>
      
      <div className="prose prose-invert prose-saffron max-w-none font-sans text-brand-text leading-relaxed">
        <p className="text-sm text-brand-text-dim mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-display text-saffron mt-12 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using the Curry Express website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
        </p>

        <h2 className="text-2xl font-display text-saffron mt-12 mb-4">2. Ordering and Pricing</h2>
        <p className="mb-4">
          All prices are subject to change without notice. We reserve the right to refuse or cancel any order placed for a product listed at the incorrect price. Menu items are subject to availability.
        </p>

        <h2 className="text-2xl font-display text-saffron mt-12 mb-4">3. Allergies and Dietary Restrictions</h2>
        <p className="mb-4">
          While we take precautions to prevent cross-contamination, our kitchen handles major allergens including nuts, dairy, and gluten. Please inform us of any severe allergies before placing an order. Curry Express cannot guarantee that any dish will be completely free of allergens.
        </p>

        <h2 className="text-2xl font-display text-saffron mt-12 mb-4">4. Third-Party Delivery</h2>
        <p className="mb-4">
          Delivery services are provided through third-party partners (such as DoorDash). Delivery times are estimates and may vary. Any issues related directly to the delivery service should be directed to the respective delivery partner's customer support.
        </p>

        <h2 className="text-2xl font-display text-saffron mt-12 mb-4">5. Intellectual Property</h2>
        <p className="mb-4">
          All content on this website, including text, graphics, logos, and images, is the property of Curry Express and is protected by intellectual property laws. You may not use, reproduce, or distribute any content without our prior written consent.
        </p>

        <h2 className="text-2xl font-display text-saffron mt-12 mb-4">6. Contact Information</h2>
        <p className="mb-4">
          For any questions regarding these Terms of Service, please contact us:
        </p>
        <ul className="list-disc pl-6 mt-4 text-brand-text-dim">
          <li className="mb-2">Address: 15190 Walden Rd, Montgomery, TX 77356</li>
          <li>Phone: +1 (346) 863-1124</li>
        </ul>
      </div>
    </div>
  );
}
