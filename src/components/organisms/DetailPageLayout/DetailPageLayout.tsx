'use client';

import Image from 'next/image';
import Breadcrumb, { type BreadcrumbItem } from '@/components/molecules/Breadcrumb/Breadcrumb';
import AccordionPanel from '@/components/organisms/AccordionPanel/AccordionPanel';
import { clsx } from '@/utils/clsx';
import ProductDetailHeader from '@/components/molecules/ProductDetailHeader/ProductDetailHeader';

import type { ProductDetailHeaderProps } from '@/components/molecules/ProductDetailHeader/ProductDetailHeader';
import { Divider } from '@/components/atoms/Divider/Divider';

export interface DetailPageLayoutProps {
  breadcrumbItems: BreadcrumbItem[];
  productImage?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  productDetailHeader: ProductDetailHeaderProps;
  accordionPanels?: Array<{
    id?: string | number;
    label: string;
    content?: string;
    subContent?: string;
  }>;
  className?: string;
}

type InternalLayoutProps = {
  breadcrumbItems: BreadcrumbItem[];
  productImage?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  productName: string;
  purchaseCount: number;
  price: number;
  onQuantityChange?: ProductDetailHeaderProps['onQuantityChange'];
  onMenuClick?: ProductDetailHeaderProps['onMenuClick'];
  onAddToCart?: ProductDetailHeaderProps['onAddToCart'];
  headerClassName?: string;
  accordionPanels?: Array<{
    id?: string | number;
    label: string;
    content?: string;
    subContent?: string;
  }>;
};

// 모바일 레이아웃 (세로 스택 - breadcrumb부터 시작)
const DetailPageLayoutMobile: React.FC<InternalLayoutProps> = ({
  breadcrumbItems,
  productImage,
  productName,
  purchaseCount,
  price,
  onQuantityChange,
  onMenuClick,
  onAddToCart,
  headerClassName,
  accordionPanels = [],
}) => (
  <div className="w-full flex justify-center tablet:hidden">
    <div className="w-328 flex flex-col">
      {/* 상단 Breadcrumb */}
      <div className="w-full mb-40">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* 상품 이미지 (패딩 73 / 120은 태블릿·데스크탑과 동일) */}
      <div className="w-full flex justify-center items-center mb-30">
        {productImage ? (
          <div
            className="w-328 aspect-square bg-white"
            style={{ padding: '73px 120px', boxSizing: 'border-box' }}
          >
            <div className="relative w-full h-full">
              <Image
                src={productImage.src}
                alt={productImage.alt}
                fill
                className="object-contain rounded-8"
                sizes="100vw"
              />
            </div>
          </div>
        ) : (
          <div className="w-full aspect-square max-w-350 bg-gray-100 rounded-8 flex items-center justify-center">
            <span className="text-gray-400 text-14">상품 이미지</span>
          </div>
        )}
      </div>

      {/* ProductDetailHeader */}
      <div className="w-full mb-40">
        <ProductDetailHeader
          productName={productName}
          purchaseCount={purchaseCount}
          price={price}
          onQuantityChange={onQuantityChange}
          onMenuClick={onMenuClick}
          onAddToCart={onAddToCart}
          className={headerClassName}
        />
      </div>

      {/* AccordionPanel들 */}
      {accordionPanels.length > 0 && (
        <div className="w-full flex flex-col justify-center">
          {accordionPanels.map((panel, index) => (
            <AccordionPanel
              key={panel.id ?? `${panel.label}-${index}`}
              label={panel.label}
              content={panel.content}
              subContent={panel.subContent}
            />
          ))}
        </div>
      )}
    </div>
  </div>
);

// 태블릿 레이아웃 (모바일과 동일한 세로 스택)
const DetailPageLayoutTablet: React.FC<InternalLayoutProps> = ({
  breadcrumbItems,
  productImage,
  productName,
  purchaseCount,
  price,
  onQuantityChange,
  onMenuClick,
  onAddToCart,
  headerClassName,
  accordionPanels = [],
}) => (
  <div className="hidden tablet:flex desktop:hidden w-full">
    <div className="w-full flex justify-center">
      <div className="w-496 flex flex-col">
        {/* 상단 Breadcrumb */}
        <div className="w-full mb-20">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <Divider className="w-496 mb-30" />

        {/* 상품 이미지 (데스크탑과 동일한 패딩 레이아웃) */}
        <div className="w-full flex justify-center items-center mb-30">
          {productImage ? (
            <div
              className="w-496 aspect-square bg-white"
              style={{ padding: '73px 120px', boxSizing: 'border-box' }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={productImage.src}
                  alt={productImage.alt}
                  fill
                  className="object-contain rounded-8"
                  sizes="100vw"
                />
              </div>
            </div>
          ) : (
            <div className="w-full aspect-square max-w-496 bg-gray-100 rounded-8 flex items-center justify-center">
              <span className="text-gray-400 text-14">상품 이미지</span>
            </div>
          )}
        </div>

        {/* ProductDetailHeader */}
        <div className="w-full mb-32">
          <ProductDetailHeader
            productName={productName}
            purchaseCount={purchaseCount}
            price={price}
            onQuantityChange={onQuantityChange}
            onMenuClick={onMenuClick}
            onAddToCart={onAddToCart}
            className={headerClassName}
          />
        </div>

        {/* AccordionPanel들 */}
        {accordionPanels.length > 0 && (
          <div className="w-full flex flex-col">
            {accordionPanels.map((panel, index) => (
              <AccordionPanel
                key={panel.id ?? `${panel.label}-${index}`}
                label={panel.label}
                content={panel.content}
                subContent={panel.subContent}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

// 데스크탑 레이아웃 (2컬럼 그리드, 더 넓은 간격)
const DetailPageLayoutDesktop: React.FC<InternalLayoutProps> = ({
  breadcrumbItems,
  productImage,
  productName,
  purchaseCount,
  price,
  onQuantityChange,
  onMenuClick,
  onAddToCart,
  headerClassName,
  accordionPanels = [],
}) => (
  <div className="hidden desktop:flex flex-col items-center w-full">
    {/* 상단 Breadcrumb */}
    <div className="w-1180 mb-20">
      <Breadcrumb items={breadcrumbItems} />
    </div>
    <div className="w-1180">
      <Divider className="w-1180 mb-60" />
    </div>
    {/* 중앙 정렬 2컬럼 레이아웃 (왼쪽 유동, 오른쪽 610dp 고정) */}
    <div className="w-1180 grid grid-cols-[minmax(0,1fr)_610px]">
      {/* 좌측: 상품 이미지 영역 */}
      <div className="w-530 flex justify-center items-start">
        {productImage ? (
          <div
            className="w-530 aspect-square bg-white"
            style={{ padding: '73px 120px', boxSizing: 'border-box' }}
          >
            <div className="relative w-full h-full">
              <Image
                src={productImage.src}
                alt={productImage.alt}
                fill
                className="object-contain rounded-8"
              />
            </div>
          </div>
        ) : (
          <div className="aspect-square w-530 bg-gray-100 rounded-8 flex items-center justify-center">
            <span className="text-gray-400 text-14">상품 이미지</span>
          </div>
        )}
      </div>

      {/* 우측: ProductDetailHeader + AccordionPanel */}
      <div className="w-610 flex flex-col mt-30">
        {/* ProductDetailHeader */}
        <ProductDetailHeader
          productName={productName}
          purchaseCount={purchaseCount}
          price={price}
          onQuantityChange={onQuantityChange}
          onMenuClick={onMenuClick}
          onAddToCart={onAddToCart}
          className={headerClassName}
        />

        {/* AccordionPanel들 */}
        {accordionPanels.length > 0 && (
          <div className="flex flex-col">
            {accordionPanels.map((panel, index) => (
              <AccordionPanel
                key={panel.id ?? `${panel.label}-${index}`}
                label={panel.label}
                content={panel.content}
                subContent={panel.subContent}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

const DetailPageLayout = ({
  breadcrumbItems,
  productImage,
  productDetailHeader,
  accordionPanels = [],
  className,
}: DetailPageLayoutProps) => {
  const {
    productName,
    purchaseCount,
    price,
    onQuantityChange,
    onMenuClick,
    onAddToCart,
    className: headerClassName,
  } = productDetailHeader;

  return (
    <div className={clsx('w-full', className)}>
      {/* 모바일 */}
      <DetailPageLayoutMobile
        breadcrumbItems={breadcrumbItems}
        productImage={productImage}
        productName={productName}
        purchaseCount={purchaseCount}
        price={price}
        onQuantityChange={onQuantityChange}
        onMenuClick={onMenuClick}
        onAddToCart={onAddToCart}
        headerClassName={headerClassName}
        accordionPanels={accordionPanels}
      />

      {/* 태블릿 */}
      <DetailPageLayoutTablet
        breadcrumbItems={breadcrumbItems}
        productImage={productImage}
        productName={productName}
        purchaseCount={purchaseCount}
        price={price}
        onQuantityChange={onQuantityChange}
        onMenuClick={onMenuClick}
        onAddToCart={onAddToCart}
        headerClassName={headerClassName}
        accordionPanels={accordionPanels}
      />

      {/* 데스크탑 */}
      <DetailPageLayoutDesktop
        breadcrumbItems={breadcrumbItems}
        productImage={productImage}
        productName={productName}
        purchaseCount={purchaseCount}
        price={price}
        onQuantityChange={onQuantityChange}
        onMenuClick={onMenuClick}
        onAddToCart={onAddToCart}
        headerClassName={headerClassName}
        accordionPanels={accordionPanels}
      />
    </div>
  );
};

export default DetailPageLayout;
