import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Curry Express',
  description: 'Privacy Policy for Curry Express',
};

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-[800px] mx-auto">
      <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-8">Privacy Policy</h1>
      
      <div className="prose prose-invert prose-saffron max-w-none font-sans text-brand-text leading-relaxed">
        <p className="text-sm text-brand-text-dim mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-display text-saffron mt-12 mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          At Curry Express, we collect information that you provide directly to us when you use our website, place an order, or contact us. This may include your name, email address, phone number, delivery address, and payment information.
        </p>

        <h2 className="text-2xl font-display text-saffron mt-12 mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">
          We use the information we collect to process your orders, communicate with you about your orders or inquiries, improve our services, and send you promotional materials if you have opted in to receive them.
        </p>

        <h2 className="text-2xl font-display text-saffron mt-12 mb-4">3. Third-Party Services</h2>
        <p className="mb-4">
          We use third-party services such as DoorDash for delivery logistics. These services have their own privacy policies regarding the information we are required to provide to them for your purchase-related transactions. We recommend reading their privacy policies to understand how your personal information will be handled.
        </p>

        <h2 className="text-2xl font-display text-saffron mt-12 mb-4">4. Data Security</h2>
        <p className="mb-4">
          We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no internet transmission is ever completely secure or error-free.
        </p>

        <h2 className="text-2xl font-display text-saffron mt-12 mb-4">5. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <ul className="list-disc pl-6 mt-4 text-brand-text-dim">
          <li className="mb-2">Address: 15190 Walden Rd, Montgomery, TX 77356</li>
          <li>Phone: +1 (346) 863-1124</li>
        </ul>
      </div>
    </div>
  );
}
