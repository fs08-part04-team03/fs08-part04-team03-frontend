'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Divider } from '@/components/atoms/Divider/Divider';
import { clsx } from '@/utils/clsx';
import StatusNotice from '@/components/molecules/StatusNotice/StatusNotice';
import LinkText from '@/components/atoms/LinkText/LinkText';
import ListSkeletonUI from '@/components/molecules/ListSkeletonUI/ListSkeletonUI';
import { PRODUCT_LABELS, PRODUCT_MESSAGES } from '@/features/products/constants';
import { formatDate } from '@/utils/formatDate';
import { useProductNavigationDirect } from '@/features/products/hooks/useProductNavigationDirect';

export interface RegisteredProductOrgItem {
  id: number;
  categoryLabel: string;
  name: string;
  price: number;
  imageSrc: string;
  link: string;
  createdAt?: string;
}

interface RegisteredProductOrgProps {
  products: RegisteredProductOrgItem[];
  totalCount: number;
  onRegisterClick?: () => void;
  /** 하위 호환성을 위한 props (deprecated - 직접 hook 사용) */
  onProductClick?: (productId: number) => void;
  isLoading?: boolean;
}

const RegisteredProductOrg = ({
  products,
  totalCount,
  onRegisterClick,
  onProductClick,
  isLoading = false,
}: RegisteredProductOrgProps) => {
  const isEmpty = products.length === 0;
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // Props Depth 1단계: 직접 hook 사용
  const navigation = useProductNavigationDirect();

  const handleImageError = (productId: number) => {
    setImageErrors((prev) => ({ ...prev, [productId]: true }));
  };

  const handleProductClick = (productId: number) => {
    // 직접 hook 사용 (하위 호환성을 위해 onProductClick도 지원)
    navigation.goToProductDetail(productId);
    if (onProductClick) {
      onProductClick(productId);
    }
  };

  return (
    <section className={clsx('w-full bg-white')}>
      {/* width 고정 컨테이너 */}
      <div className={clsx('mx-auto', 'mobile:w-327', 'tablet:w-696', 'desktop:w-1200')}>
        {/* Mobile / Tablet : Total Count (항상 유지) */}
        <p
          className={clsx(
            'mobile:mb-10',
            'mobile:text-14 mobile:font-bold mobile:tracking--0.35',
            'tablet:text-16 tablet:tracking--0.4',
            'text-gray-950',
            'desktop:hidden'
          )}
        >
          총 등록한 상품 {totalCount}개
        </p>

        {/* Desktop : Table Header (항상 유지) */}
        <Divider variant="thin" />
        <div
          className={clsx(
            'hidden desktop:flex',
            'desktop:items-center',
            'desktop:px-40 desktop:gap-16 desktop:h-60',
            'desktop:border-b desktop:border-gray-200'
          )}
        >
          <div className={clsx('flex-1 flex items-center gap-20')}>
            <div className={clsx('w-40 h-40')} />
            <span className={clsx('text-14 font-bold text-gray-700')}>상품명</span>
          </div>
          <span className={clsx('w-120 text-14 font-bold text-gray-700')}>등록일</span>
          <span className={clsx('w-180 text-14 font-bold text-gray-700')}>카테고리</span>
          <span className={clsx('w-160 text-14 font-bold text-gray-700')}>가격</span>
          <span className={clsx('w-180 text-14 font-bold text-gray-700')}>제품 링크</span>
        </div>

        {/* ✅ Products 영역 (반응형 최대 높이 적용) */}
        <div className={clsx('mobile:min-h-710', 'tablet:min-h-740', 'desktop:min-h-600')}>
          {(() => {
            if (isLoading) {
              return <ListSkeletonUI rows={6} />;
            }

            if (isEmpty) {
              return (
                <div className={clsx('mt-40 flex justify-center')}>
                  <StatusNotice
                    title={PRODUCT_MESSAGES.EMPTY.NO_MY_PRODUCTS.TITLE}
                    description={PRODUCT_MESSAGES.EMPTY.NO_MY_PRODUCTS.DESCRIPTION}
                    buttonText={PRODUCT_LABELS.BUTTON.REGISTER}
                    onButtonClick={onRegisterClick}
                  />
                </div>
              );
            }

            return (
              <ul className={clsx('flex flex-col')}>
                {products.map((product) => {
                  const imgError = imageErrors[product.id] || false;
                  const showNoImage =
                    !product.imageSrc || product.imageSrc.trim().length === 0 || imgError;

                  return (
                    <li key={product.id}>
                      {/* Mobile / Tablet */}
                      <div
                        className={clsx('desktop:hidden', 'cursor-pointer')}
                        onClick={() => handleProductClick(product.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleProductClick(product.id);
                          }
                        }}
                      >
                        <p
                          className={clsx(
                            'mobile:mt-20 mobile:mb-10',
                            'tablet:mt-30',
                            'text-16 font-extrabold tracking--0.4 text-gray-950'
                          )}
                        >
                          {product.createdAt ? formatDate(product.createdAt) : '-'}
                        </p>

                        <div className={clsx('flex gap-20')}>
                          <div
                            className={clsx(
                              'flex items-center justify-center w-90 h-90 bg-gray-50 shrink-0'
                            )}
                          >
                            {(() => {
                              if (showNoImage) {
                                return (
                                  <Image
                                    src="/icons/no-image-small.svg"
                                    alt="이미지 없음"
                                    width={29}
                                    height={50}
                                    unoptimized
                                  />
                                );
                              }
                              return (
                                <Image
                                  src={product.imageSrc}
                                  alt={product.name}
                                  width={29}
                                  height={50}
                                  onError={() => handleImageError(product.id)}
                                  className="object-contain"
                                />
                              );
                            })()}
                          </div>

                          <div className={clsx('flex flex-col gap-6 w-216')}>
                            <span className={clsx('text-12 tracking--0.3 text-gray-500')}>
                              {product.categoryLabel}
                            </span>

                            <span
                              className={clsx(
                                'mobile:text-14',
                                'tablet:text-16',
                                'mobile:tracking--0.35',
                                'tablet:tracking--0.4',
                                'text-gray-950'
                              )}
                            >
                              {product.name}
                            </span>

                            <span
                              className={clsx(
                                'text-14 font-extrabold tracking--0.35 text-gray-950'
                              )}
                            >
                              {product.price.toLocaleString()}원
                            </span>

                            <div
                              className={clsx('line-clamp-2')}
                              onClick={(e) => e.stopPropagation()}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.stopPropagation();
                                }
                              }}
                              role="presentation"
                            >
                              <LinkText
                                url={product.link}
                                className={clsx('text-14 tracking--0.35 text-gray-600')}
                                clickable
                              />
                            </div>
                          </div>
                        </div>

                        <div className={clsx('mt-30')}>
                          <Divider variant="thin" />
                        </div>
                      </div>

                      {/* Desktop */}
                      <div
                        className={clsx(
                          'hidden',
                          'desktop:flex',
                          'desktop:items-center',
                          'desktop:px-40 desktop:gap-16 desktop:h-100',
                          'border-b border-gray-200',
                          'cursor-pointer hover:bg-gray-50 transition-colors'
                        )}
                        onClick={() => handleProductClick(product.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleProductClick(product.id);
                          }
                        }}
                      >
                        <div className={clsx('flex-1 flex items-center gap-20')}>
                          <div
                            className={clsx(
                              'flex items-center justify-center w-40 h-40 bg-gray-50 shrink-0'
                            )}
                          >
                            {(() => {
                              if (showNoImage) {
                                return (
                                  <Image
                                    src="/icons/no-image-small.svg"
                                    alt="이미지 없음"
                                    width={16}
                                    height={27}
                                    unoptimized
                                  />
                                );
                              }
                              return (
                                <Image
                                  src={product.imageSrc}
                                  alt={product.name}
                                  width={16}
                                  height={27}
                                  onError={() => handleImageError(product.id)}
                                  className="object-contain"
                                />
                              );
                            })()}
                          </div>
                          <span className={clsx('text-16 tracking--0.4 text-gray-950')}>
                            {product.name}
                          </span>
                        </div>

                        <span className={clsx('w-120 text-16 tracking--0.4 text-gray-950')}>
                          {product.createdAt ? formatDate(product.createdAt) : '-'}
                        </span>

                        <span className={clsx('w-180 text-16 tracking--0.4 text-gray-950')}>
                          {product.categoryLabel}
                        </span>

                        <span className={clsx('w-160 text-16 tracking--0.4 text-gray-950')}>
                          {product.price.toLocaleString()}
                        </span>

                        <div
                          className={clsx('w-180 line-clamp-2')}
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.stopPropagation();
                            }
                          }}
                          role="presentation"
                        >
                          <LinkText
                            url={product.link}
                            className={clsx('text-16 tracking--0.4 text-gray-950')}
                            clickable
                          />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            );
          })()}
        </div>
      </div>
    </section>
  );
};

export default RegisteredProductOrg;
