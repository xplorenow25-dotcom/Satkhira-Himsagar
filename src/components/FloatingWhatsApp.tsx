import React from 'react';
import { STORE_CONFIG } from '../config/store';
import { buildWhatsAppChatUrl } from '../utils/whatsapp';
import { WhatsAppIcon } from './SocialIcons';

export const FloatingWhatsApp: React.FC = () => {
  const url = buildWhatsAppChatUrl(
    `Hello ${STORE_CONFIG.brandName}! I have a question about ordering mangoes or honey.`
  );

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp Business"
      className="fixed bottom-[82px] right-3.5 md:bottom-6 md:right-6 z-30 inline-flex items-center gap-2 p-2.5 sm:pl-2.5 sm:pr-4 sm:py-2 rounded-full bg-[#183D2B]/95 backdrop-blur-md text-[#F8F6EF] border border-white/20 shadow-[0_10px_28px_rgba(24,61,43,0.3)] hover:bg-[#122F21] hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
    >
      <WhatsAppIcon colored className="w-7 h-7 shrink-0" />
      <span className="hidden sm:inline text-sm font-medium whitespace-nowrap">
        WhatsApp
      </span>
    </a>
  );
};
