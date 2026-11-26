import React from 'react';
import { STORE_CONFIG } from '../config/store';
import { buildWhatsAppChatUrl } from '../utils/whatsapp';
import { FacebookIcon, WhatsAppIcon } from './SocialIcons';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const whatsappLink = buildWhatsAppChatUrl(
    `Hello ${STORE_CONFIG.brandName}! I would like to ask about your fresh mangoes and honey.`
  );

  return (
    <footer className="bg-[#183D2B] text-[#F8F6EF] mt-20 pb-20 md:pb-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-3">
            <h2 className="font-serif text-2xl tracking-tight text-[#F8F6EF]">
              {STORE_CONFIG.brandName}
            </h2>
            <p className="text-sm text-[#E6AC38] font-medium">
              {STORE_CONFIG.tagline}
            </p>
            <p className="text-sm text-[#F8F6EF]/80 leading-relaxed">
              An independent farm-to-home initiative from Satkhira, bringing fresh garden mangoes and authentic local floral honey directly to Bangladeshi homes.
            </p>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-wider text-[#E6AC38] font-semibold mb-4">
              Shop
            </h3>
            <ul className="space-y-2.5 text-sm text-[#F8F6EF]/85">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/shop')}
                  className="hover:text-[#E6AC38] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6AC38] rounded"
                >
                  Shop All Products
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/mangoes')}
                  className="hover:text-[#E6AC38] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6AC38] rounded"
                >
                  Satkhira Mangoes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/honey')}
                  className="hover:text-[#E6AC38] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6AC38] rounded"
                >
                  Authentic Honey
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/cart')}
                  className="hover:text-[#E6AC38] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6AC38] rounded"
                >
                  Shopping Cart
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/checkout')}
                  className="hover:text-[#E6AC38] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6AC38] rounded"
                >
                  WhatsApp Checkout
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-wider text-[#E6AC38] font-semibold mb-4">
              Information
            </h3>
            <ul className="space-y-2.5 text-sm text-[#F8F6EF]/85">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/about')}
                  className="hover:text-[#E6AC38] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6AC38] rounded"
                >
                  About Us &amp; Our Story
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/delivery')}
                  className="hover:text-[#E6AC38] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6AC38] rounded"
                >
                  Delivery Information
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/refund-policy')}
                  className="hover:text-[#E6AC38] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6AC38] rounded"
                >
                  Return &amp; Refund Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/faq')}
                  className="hover:text-[#E6AC38] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6AC38] rounded"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-[#E6AC38] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6AC38] rounded"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-wider text-[#E6AC38] font-semibold mb-4">
              Direct Order &amp; Follow Us
            </h3>
            <div className="space-y-3 text-sm text-[#F8F6EF]/85">
              <p>{STORE_CONFIG.location}</p>
              <p className="tabular-nums">{STORE_CONFIG.displayPhone}</p>
              <div className="flex flex-col items-start gap-2.5 pt-1">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 min-h-[44px] pl-2.5 pr-5 py-2 rounded-full bg-[#E6AC38] text-[#252820] font-semibold text-sm no-underline hover:bg-[#d89e2c] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8F6EF]"
                >
                  <WhatsAppIcon colored className="w-6 h-6 shrink-0" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href={STORE_CONFIG.facebookPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 min-h-[42px] pl-2.5 pr-5 py-2 rounded-full bg-[#F8F6EF]/10 border border-[#F8F6EF]/20 text-[#F8F6EF] font-medium text-sm no-underline hover:bg-[#F8F6EF]/18 hover:border-[#E6AC38]/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F8F6EF]"
                >
                  <FacebookIcon colored className="w-6 h-6 shrink-0" />
                  <span>Follow us on Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#F8F6EF]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8F6EF]/70">
          <p>© {new Date().getFullYear()} {STORE_CONFIG.brandName}. Rooted in {STORE_CONFIG.location}.</p>
          <p>Orders confirmed directly via WhatsApp Business · Cash on Delivery across Bangladesh</p>
        </div>
      </div>
    </footer>
  );
};
