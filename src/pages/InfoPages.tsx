import React, { useState } from 'react';
import {
  ChevronDown,
  MapPin,
  MessageCircle,
  PackageCheck,
  Phone,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { FAQ_ITEMS, ORCHARD_STORY_IMAGE, STORE_CONFIG } from '../config/store';
import { buildWhatsAppChatUrl, formatBDT } from '../utils/whatsapp';
import { ResilientImage } from '../components/ResilientImage';
import { FacebookIcon, WhatsAppIcon } from '../components/SocialIcons';

interface InfoPageProps {
  onNavigate: (path: string) => void;
}

/* ============================================================================
 * ABOUT US PAGE
 * ============================================================================ */
export const AboutPage: React.FC<InfoPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-14">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.14em] text-[#76563C] mb-2">
          Our Story · Satkhira, Bangladesh
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#252820] text-balance mb-4">
          Born in a Family Orchard, Run with Honest Hands.
        </h1>
        <p className="text-lg text-[#252820]/80 leading-relaxed">
          {STORE_CONFIG.tagline}
        </p>
      </div>

      <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-[#E2DDD0] bg-[#EFECE1]">
        <ResilientImage
          src={ORCHARD_STORY_IMAGE}
          alt="Family mango orchard in Satkhira during harvest"
          fallbackLabel="Satkhira Family Orchard"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-7 space-y-5 text-base text-[#252820]/85 leading-relaxed">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#252820]">
            Why We Started {STORE_CONFIG.brandName}
          </h2>
          <p>
            Growing up in Satkhira, summer always meant waking early to check which Himsagar or Langra mangoes were finally ready on our family’s garden trees. When friends and relatives in Dhaka and other cities tasted those mangoes—or our region’s raw Sundarban and mustard flower honey—the first thing they always asked was: “Why can’t we find this honest taste in the market?”
          </p>
          <p>
            Too often, city buyers end up with fruit ripened forcefully with chemicals, or honey diluted with sugar syrup after passing through layers of middlemen.
          </p>
          <p>
            I started {STORE_CONFIG.brandName} as a small, independent initiative from Satkhira with just a smartphone and a clear promise: we only send what we would happily serve at our own family table. Every mango comes straight from our own garden, picked only when naturally mature. Every jar of honey is sourced from trusted local collectors and small beekeepers we know face-to-face.
          </p>
          <p>
            Instead of complex automated systems, I personally review and confirm every order through WhatsApp Business—so you always know who packed your box, what your delivery cost will be before dispatch, and when your parcel is on the way.
          </p>
        </div>

        <div className="md:col-span-5 space-y-4">
          <div className="p-6 bg-[#FDFCF8] border border-[#E2DDD0] rounded-2xl space-y-4">
            <h3 className="font-serif text-xl text-[#252820]">Our Simple Promise</h3>
            <ul className="space-y-3 text-sm text-[#252820]/80 leading-relaxed">
              <li className="pb-3 border-b border-[#E2DDD0]">
                <strong className="block text-[#183D2B]">1. Zero Chemical Ripening</strong>
                Our orchard mangoes mature naturally on the branch without carbide or formalin.
              </li>
              <li className="pb-3 border-b border-[#E2DDD0]">
                <strong className="block text-[#183D2B]">2. Trusted Local Honey</strong>
                Sourced directly from known local Mouwalis and seasonal apiaries near Satkhira.
              </li>
              <li>
                <strong className="block text-[#183D2B]">3. Transparent Communication</strong>
                No hidden fees—delivery charges and courier tracking are shared directly on WhatsApp.
              </li>
            </ul>
            <button
              type="button"
              onClick={() => onNavigate('/shop')}
              className="w-full min-h-[44px] px-5 py-2.5 bg-[#183D2B] text-[#F8F6EF] text-sm font-medium rounded-full hover:bg-[#122F21] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]"
            >
              Explore Our Harvest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * CONTACT US PAGE
 * ============================================================================ */
export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('Product Question');
  const [message, setMessage] = useState('');

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const composed = [
      `Hello ${STORE_CONFIG.brandName}!`,
      name.trim() ? `Name: ${name.trim()}` : '',
      `Topic: ${topic}`,
      message.trim() ? `Message: ${message.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const url = buildWhatsAppChatUrl(composed);
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="max-w-2xl mb-10">
        <p className="text-xs uppercase tracking-[0.14em] text-[#76563C] mb-2">
          Direct Conversation
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#252820] mb-3">
          Contact Us
        </h1>
        <p className="text-base text-[#252820]/80 leading-relaxed">
          Have a question about today’s mango harvest, bulk family orders, or honey sourcing? Reach us directly on WhatsApp Business or Facebook.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-5 space-y-4">
          <div className="p-6 bg-[#FDFCF8] border border-[#E2DDD0] rounded-2xl space-y-5">
            <div className="flex items-start gap-3.5">
              <WhatsAppIcon colored className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <h2 className="font-serif text-lg text-[#252820]">WhatsApp Business</h2>
                <p className="text-sm text-[#76563C] mt-0.5">
                  Fastest way to order, track parcels, or ask about seasonal batches.
                </p>
                <a
                  href={buildWhatsAppChatUrl(`Hello ${STORE_CONFIG.brandName}!`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 text-sm font-medium text-[#183D2B] no-underline hover:text-[#76563C] transition-colors"
                >
                  Open WhatsApp Chat →
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2DDD0] flex items-start gap-3.5">
              <Phone className="w-5 h-5 text-[#183D2B] shrink-0 mt-0.5" />
              <div>
                <h2 className="font-serif text-lg text-[#252820]">Phone</h2>
                <p className="text-sm text-[#252820]/80 tabular-nums mt-0.5">
                  {STORE_CONFIG.displayPhone}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2DDD0] flex items-start gap-3.5">
              <MapPin className="w-5 h-5 text-[#183D2B] shrink-0 mt-0.5" />
              <div>
                <h2 className="font-serif text-lg text-[#252820]">Garden &amp; Dispatch</h2>
                <p className="text-sm text-[#252820]/80 mt-0.5">
                  {STORE_CONFIG.location}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2DDD0]">
              <a
                href={STORE_CONFIG.facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 w-full min-h-[44px] px-4 py-2.5 border border-[#183D2B]/30 text-[#183D2B] text-sm font-medium rounded-full no-underline hover:bg-[#EFECE1] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]"
              >
                <FacebookIcon colored className="w-5 h-5 shrink-0" />
                <span>Follow us on Facebook</span>
              </a>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSendWhatsApp}
          className="md:col-span-7 bg-[#FDFCF8] border border-[#E2DDD0] rounded-3xl p-6 sm:p-8 space-y-5"
        >
          <h2 className="font-serif text-2xl text-[#252820]">
            Send a Quick Message on WhatsApp
          </h2>
          <p className="text-sm text-[#76563C]">
            Fill in your note below and tap the button to open WhatsApp with your message ready.
          </p>

          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-[#252820] mb-1.5">
              Your Name
            </label>
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Farhana Rahman"
              className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#F8F6EF] border border-[#E2DDD0] rounded-xl text-[#252820] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]/35 focus-visible:border-[#183D2B]"
            />
          </div>

          <div>
            <label htmlFor="contact-topic" className="block text-sm font-medium text-[#252820] mb-1.5">
              Topic
            </label>
            <select
              id="contact-topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2.5 text-sm bg-[#F8F6EF] border border-[#E2DDD0] rounded-xl text-[#252820] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]/35 focus-visible:border-[#183D2B]"
            >
              <option value="Product Question">Product Question</option>
              <option value="Mango Harvest Timing">Mango Harvest Timing</option>
              <option value="Bulk / Family Gift Order">Bulk / Family Gift Order</option>
              <option value="Parcel Tracking">Parcel Tracking</option>
            </select>
          </div>

          <div>
            <label htmlFor="contact-msg" className="block text-sm font-medium text-[#252820] mb-1.5">
              Message
            </label>
            <textarea
              id="contact-msg"
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your question here..."
              className="w-full px-3.5 py-2.5 text-sm bg-[#F8F6EF] border border-[#E2DDD0] rounded-xl text-[#252820] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]/35 focus-visible:border-[#183D2B]"
            />
          </div>

          <button
            type="submit"
            className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#183D2B] text-[#F8F6EF] text-sm font-medium rounded-full hover:bg-[#122F21] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FDFCF8]"
          >
            <WhatsAppIcon colored className="w-5 h-5" />
            <span>Continue to WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  );
};

/* ============================================================================
 * FAQ PAGE
 * ============================================================================ */
export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.14em] text-[#76563C] mb-2">
          Helpful Answers
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#252820] mb-3">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-[#252820]/80">
          Everything you need to know about our mangoes, honey, WhatsApp ordering, and delivery across Bangladesh.
        </p>
      </div>

      <div className="divide-y divide-[#E2DDD0] border border-[#E2DDD0] rounded-2xl bg-[#FDFCF8] overflow-hidden">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={item.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                aria-expanded={isOpen}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-[#EFECE1]/50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:bg-[#EFECE1]/70"
              >
                <span className="font-serif text-lg sm:text-xl text-[#252820]">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#76563C] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-5 text-sm sm:text-base text-[#252820]/80 leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ============================================================================
 * DELIVERY INFORMATION PAGE
 * ============================================================================ */
export const DeliveryInfoPage: React.FC<InfoPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-10">
      <div>
        <p className="text-xs uppercase tracking-[0.14em] text-[#76563C] mb-2">
          Shipping &amp; Dispatch
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#252820] mb-3">
          Delivery Information
        </h1>
        <p className="text-base text-[#252820]/80 leading-relaxed">
          Honest, transparent dispatch from Satkhira to homes across Bangladesh.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-[#FDFCF8] border border-[#E2DDD0] rounded-2xl space-y-3">
          <Truck className="w-6 h-6 text-[#183D2B]" />
          <h2 className="font-serif text-2xl text-[#252820]">Nationwide Availability</h2>
          <p className="text-sm sm:text-base text-[#252820]/80 leading-relaxed">
            We deliver throughout Bangladesh wherever regular courier service is available—covering Satkhira, Dhaka, Chattogram, Khulna, Rajshahi, Sylhet, and district towns across the country.
          </p>
        </div>

        <div className="p-6 bg-[#FDFCF8] border border-[#E2DDD0] rounded-2xl space-y-3">
          <MessageCircle className="w-6 h-6 text-[#183D2B]" />
          <h2 className="font-serif text-2xl text-[#252820]">Charges Confirmed Before Dispatch</h2>
          <p className="text-sm sm:text-base text-[#252820]/80 leading-relaxed">
            Estimated delivery charges ({formatBDT(STORE_CONFIG.delivery.insideSatkhiraCharge)} inside Satkhira, {formatBDT(STORE_CONFIG.delivery.dhakaDistrictCharge)} in Dhaka, {formatBDT(STORE_CONFIG.delivery.outsideSatkhiraCharge)} nationwide) are shown at checkout. We always confirm the exact courier fee with you on WhatsApp before dispatching your parcel.
          </p>
        </div>

        <div className="p-6 bg-[#FDFCF8] border border-[#E2DDD0] rounded-2xl space-y-3">
          <PackageCheck className="w-6 h-6 text-[#183D2B]" />
          <h2 className="font-serif text-2xl text-[#252820]">Careful Packaging</h2>
          <p className="text-sm sm:text-base text-[#252820]/80 leading-relaxed">
            Fresh mangoes are packed in sturdy, ventilated fruit boxes with natural cushioning so they travel safely without overheating. Honey jars are sealed tightly and wrapped in multi-layer protective cushioning.
          </p>
        </div>

        <div className="p-6 bg-[#FDFCF8] border border-[#E2DDD0] rounded-2xl space-y-3">
          <ShieldCheck className="w-6 h-6 text-[#183D2B]" />
          <h2 className="font-serif text-2xl text-[#252820]">WhatsApp Courier Tracking</h2>
          <p className="text-sm sm:text-base text-[#252820]/80 leading-relaxed">
            Once your parcel leaves Satkhira, we personally share the courier booking receipt and tracking information directly with you on WhatsApp so you can follow its arrival.
          </p>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={() => onNavigate('/shop')}
          className="min-h-[46px] px-6 py-3 bg-[#183D2B] text-[#F8F6EF] text-sm font-medium rounded-full hover:bg-[#122F21] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183D2B]"
        >
          Browse Fresh Products
        </button>
      </div>
    </div>
  );
};

/* ============================================================================
 * RETURN & REFUND POLICY PAGE
 * ============================================================================ */
export const RefundPolicyPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.14em] text-[#76563C] mb-2">
          Customer Care
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#252820] mb-3">
          Return &amp; Refund Policy
        </h1>
        <p className="text-base text-[#252820]/80 leading-relaxed">
          We stand behind the honesty of our orchard fruit and raw honey. Because fresh agricultural produce is perishable, please review our straightforward guidelines below.
        </p>
      </div>

      <div className="bg-[#FDFCF8] border border-[#E2DDD0] rounded-2xl p-6 sm:p-8 space-y-6 text-sm sm:text-base text-[#252820]/85 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-2xl text-[#252820]">1. Inspect Upon Delivery</h2>
          <p>
            Please inspect your parcel at the time of delivery or immediately upon opening. If you notice any broken honey jar, crushed fruit box, or spoiled mangoes, take a clear photo or short unboxing video right away.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-[#E2DDD0]">
          <h2 className="font-serif text-2xl text-[#252820]">2. Report Within 24 Hours on WhatsApp</h2>
          <p>
            Send your photos or video along with your order details to our WhatsApp Business number within 24 hours of receiving the parcel. We respond personally and promptly.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-[#E2DDD0]">
          <h2 className="font-serif text-2xl text-[#252820]">3. Fair Replacement or Adjustment</h2>
          <p>
            When transit damage or spoilage is verified, we will offer a fair replacement on your next batch or an immediate partial/full refund of the affected portion via bKash or agreed method.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-[#E2DDD0]">
          <h2 className="font-serif text-2xl text-[#252820]">4. Natural Variations</h2>
          <p>
            Because our mangoes are tree-matured without chemicals, minor natural skin marks or slight size differences are normal. Similarly, raw Mustard Flower Honey naturally thickens or crystallizes in cool weather—this is a mark of purity, not spoilage.
          </p>
        </section>
      </div>
    </div>
  );
};
