// import Link from 'next/link';

// export default function Footer() {
//   return (
//     <footer className="bg-gray-800 text-white">
//       <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* Company Info */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">ShopKart</h3>
//             <p className="text-gray-300 text-sm">
//               Your one-stop destination for all your shopping needs. Quality products at affordable prices.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link href="/" className="text-gray-300 hover:text-white text-sm">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/products" className="text-gray-300 hover:text-white text-sm">
//                   Products
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/categories" className="text-gray-300 hover:text-white text-sm">
//                   Categories
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/about" className="text-gray-300 hover:text-white text-sm">
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/contact" className="text-gray-300 hover:text-white text-sm">
//                   Contact Us
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Customer Service */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
//             <ul className="space-y-2">
//               <li>
//                 <Link href="/faq" className="text-gray-300 hover:text-white text-sm">
//                   FAQ
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/shipping" className="text-gray-300 hover:text-white text-sm">
//                   Shipping Policy
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/returns" className="text-gray-300 hover:text-white text-sm">
//                   Returns & Exchanges
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/terms" className="text-gray-300 hover:text-white text-sm">
//                   Terms & Conditions
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/privacy" className="text-gray-300 hover:text-white text-sm">
//                   Privacy Policy
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
//             <address className="not-italic text-gray-300 text-sm">
//               <p>123 Shopping Avenue</p>
//               <p>Retail District, IN 12345</p>
//               <p className="mt-3">Email: info@shopkart.com</p>
//               <p>Phone: +91 1234567890</p>
//             </address>
//           </div>
//         </div>

//         <div className="mt-8 pt-8 border-t border-gray-700">
//           <p className="text-center text-gray-300 text-sm">
//             &copy; {new Date().getFullYear()} ShopKart. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }
import { memo } from 'react';
import Link from 'next/link';

// Separate components for better modularity and reusability
const FooterHeading = ({ children }) => (
  <h3 className="text-lg font-semibold mb-4 text-white">{children}</h3>
);

const FooterLink = ({ href, children }) => (
  <li>
    <Link 
      href={href} 
      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
    >
      {children}
    </Link>
  </li>
);

const FooterLinkGroup = ({ title, links }) => (
  <div>
    <FooterHeading>{title}</FooterHeading>
    <ul className="space-y-2">
      {links.map(({ href, label }) => (
        <FooterLink key={href} href={href}>{label}</FooterLink>
      ))}
    </ul>
  </div>
);

const CompanyInfo = () => (
  <div>
    <FooterHeading>ShopKart</FooterHeading>
    <p className="text-gray-300 text-sm">
      Your one-stop destination for all your shopping needs. Quality products at affordable prices.
    </p>
    <div className="mt-4 flex space-x-4">
      {/* Social Media Icons */}
      <a href="https://facebook.com" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors duration-200">
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      </a>
      <a href="https://twitter.com" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors duration-200">
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      </a>
      <a href="https://instagram.com" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors duration-200">
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      </a>
    </div>
  </div>
);

const ContactInfo = () => (
  <div>
    <FooterHeading>Contact Us</FooterHeading>
    <address className="not-italic text-gray-300 text-sm">
      <p>123 Shopping Avenue</p>
      <p>Retail District, IN 12345</p>
      <div className="mt-3 flex items-center space-x-2">
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span>info@shopkart.com</span>
      </div>
      <div className="mt-2 flex items-center space-x-2">
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        <span>+91 1234567890</span>
      </div>
    </address>
  </div>
);

const Newsletter = () => {
  return (
    <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
      <div>
        <h3 className="text-sm font-semibold text-white tracking-wider">
          Subscribe to our newsletter
        </h3>
        <p className="mt-2 text-sm text-gray-300">
          Get the latest updates and promotions delivered to your inbox.
        </p>
      </div>
      <form className="mt-4 sm:flex sm:max-w-md md:mt-0">
        <label htmlFor="email-address" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          name="email"
          id="email-address"
          autoComplete="email"
          required
          placeholder="Enter your email"
          className="w-full min-w-0 appearance-none rounded-md border border-transparent bg-white/5 px-4 py-2 text-base text-white placeholder-gray-400 focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        />
        <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
};

// Main Footer component
const Footer = () => {
  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/categories', label: 'Categories' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact Us' },
  ];

  const customerServiceLinks = [
    { href: '/faq', label: 'FAQ' },
    { href: '/shipping', label: 'Shipping Policy' },
    { href: '/returns', label: 'Returns & Exchanges' },
    { href: '/terms', label: 'Terms & Conditions' },
    { href: '/privacy', label: 'Privacy Policy' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <CompanyInfo />
          <FooterLinkGroup title="Quick Links" links={quickLinks} />
          <FooterLinkGroup title="Customer Service" links={customerServiceLinks} />
          <ContactInfo />
        </div>
        
        <Newsletter />

        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-center text-gray-300 text-sm">
            &copy; {currentYear} ShopKart. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <img 
              src="/api/placeholder/240/40" 
              alt="Payment methods accepted" 
              className="h-8"
              aria-label="We accept major credit cards and payment methods"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(Footer);