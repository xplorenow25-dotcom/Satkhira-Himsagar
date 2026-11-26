import React from 'react';

interface ProductCardSkeletonProps {
  showVariants?: boolean;
}

export const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({
  showVariants = false,
}) => {
  return (
    <div aria-hidden="true" className="flex flex-col">
      {/* Editorial 4:3 Image Frame Skeleton */}
      <div className="aspect-[4/3] w-full rounded-2xl skeleton-shimmer ring-1 ring-inset ring-[#252820]/6" />

      {/* Product Typography & Controls Skeleton */}
      <div className="flex flex-1 flex-col pt-3.5">
        {/* Category & Availability Meta */}
        <div className="flex items-center gap-2 mb-2">
          <div className="h-3 w-20 rounded-full skeleton-shimmer" />
          <div className="h-3 w-14 rounded-full skeleton-shimmer" />
        </div>

        {/* Product Title */}
        <div className="h-5 w-4/5 rounded-full skeleton-shimmer mb-2" />

        {/* Short Description (desktop/tablet) */}
        <div className="hidden sm:block space-y-1.5 mb-3">
          <div className="h-3 w-full rounded-full skeleton-shimmer" />
          <div className="h-3 w-2/3 rounded-full skeleton-shimmer" />
        </div>

        <div className="mt-auto space-y-3 pt-1">
          {/* Optional Variant Selector Bar */}
          {showVariants && (
            <div className="grid grid-cols-3 gap-1 p-0.5 bg-[#EFECE1]/70 rounded-full">
              <div className="h-[34px] rounded-full skeleton-shimmer" />
              <div className="h-[34px] rounded-full skeleton-shimmer" />
              <div className="h-[34px] rounded-full skeleton-shimmer" />
            </div>
          )}

          {/* Price + Compare-At Price */}
          <div className="flex items-baseline gap-2.5">
            <div className="h-5 w-20 rounded-full skeleton-shimmer" />
            <div className="h-3.5 w-11 rounded-full skeleton-shimmer" />
          </div>

          {/* Add to Cart Pill CTA */}
          <div className="h-[44px] w-full rounded-full skeleton-shimmer" />
        </div>
      </div>
    </div>
  );
};

interface ProductGridSkeletonProps {
  count?: number;
  variantMode?: 'none' | 'all' | 'mixed';
}

export const ProductGridSkeleton: React.FC<ProductGridSkeletonProps> = ({
  count = 4,
  variantMode = 'mixed',
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading products"
      className="grid grid-cols-2 lg:grid-cols-4 gap-x-3.5 gap-y-8 sm:gap-x-6 sm:gap-y-10"
    >
      <span className="sr-only">Loading products...</span>
      {Array.from({ length: count }).map((_, idx) => {
        const showVariants =
          variantMode === 'all'
            ? true
            : variantMode === 'mixed'
            ? idx >= Math.floor(count / 2)
            : false;

        return <ProductCardSkeleton key={idx} showVariants={showVariants} />;
      })}
    </div>
  );
};
