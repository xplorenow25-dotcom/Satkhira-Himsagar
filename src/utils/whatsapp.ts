import { PRODUCTS, STORE_CONFIG } from '../config/store';
import { CartItem, CheckoutFormData } from '../types';

export function formatBDT(amount: number): string {
  return `৳${amount.toLocaleString('en-US')}`;
}

export function calculateDeliveryCharge(district: string, subtotal: number): number {
  if (subtotal <= 0) return 0;
  if (
    STORE_CONFIG.delivery.freeDeliveryAbove > 0 &&
    subtotal >= STORE_CONFIG.delivery.freeDeliveryAbove
  ) {
    return 0;
  }
  if (!district) {
    return STORE_CONFIG.delivery.outsideSatkhiraCharge;
  }
  const normalized = district.trim().toLowerCase();
  if (normalized === 'satkhira') {
    return STORE_CONFIG.delivery.insideSatkhiraCharge;
  }
  if (normalized === 'dhaka') {
    return STORE_CONFIG.delivery.dhakaDistrictCharge;
  }
  return STORE_CONFIG.delivery.outsideSatkhiraCharge;
}

export function isValidBangladeshPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  return /^(?:\+?88)?01[3-9]\d{8}$/.test(cleaned);
}

export function buildWhatsAppOrderMessage(
  form: CheckoutFormData,
  items: CartItem[],
  subtotal: number,
  deliveryCharge: number
): string {
  const total = subtotal + deliveryCharge;

  const orderLines = items
    .map((item, idx) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      const variant = product?.variants.find((v) => v.id === item.variantId);
      if (!product || !variant) return '';
      const lineTotal = variant.price * item.quantity;
      if (product.unitLabel === 'KG') {
        const crateCount = Math.max(1, Math.round(item.quantity / (product.quantityStep ?? 10)));
        return [
          `${idx + 1}. ${product.name}`,
          `   Weight: ${item.quantity} KG (${crateCount} × ${product.quantityStep ?? 10} KG box)`,
          `   Rate: ${formatBDT(variant.price)} / KG`,
          `   Price: ${formatBDT(lineTotal)}`,
        ].join('\n');
      }
      const specLabel = product.category === 'mangoes' ? 'Weight' : 'Size';
      return [
        `${idx + 1}. ${product.name}`,
        `   ${specLabel}: ${variant.label}`,
        `   Quantity: ${item.quantity}`,
        `   Price: ${formatBDT(lineTotal)}`,
      ].join('\n');
    })
    .filter(Boolean)
    .join('\n\n');

  const lines = [
    `NEW ORDER — ${STORE_CONFIG.brandName}`,
    '',
    'Hello! I would like to place an order.',
    '',
    'CUSTOMER INFORMATION',
    `Name: ${form.fullName.trim()}`,
    `Phone: ${form.mobileNumber.trim()}`,
    `District: ${form.district.trim()}`,
    `Upazila: ${form.upazila.trim()}`,
    `Address: ${form.fullAddress.trim()}`,
  ];

  if (form.instructions.trim()) {
    lines.push(`Delivery Note: ${form.instructions.trim()}`);
  }

  lines.push(
    '',
    'ORDER DETAILS',
    '',
    orderLines,
    '',
    `Subtotal: ${formatBDT(subtotal)}`,
    `Delivery Charge: ${deliveryCharge === 0 ? '৳0 (Free Delivery)' : formatBDT(deliveryCharge)}`,
    `TOTAL: ${formatBDT(total)}`,
    '',
    `Payment Method: ${form.paymentMethod}`,
    '',
    'Please confirm my order. Thank you!'
  );

  return lines.join('\n');
}

export function buildWhatsAppChatUrl(message?: string): string {
  const cleanNumber = STORE_CONFIG.whatsappNumber.replace(/[^\d]/g, '');
  if (!message) {
    return `https://wa.me/${cleanNumber}`;
  }
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
