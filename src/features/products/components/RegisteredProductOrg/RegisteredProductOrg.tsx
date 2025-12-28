'use client';

import React from 'react';
import Image from 'next/image';
import { Divider } from '@/components/atoms/Divider/Divider';
import { clsx } from '@/utils/clsx';
import StatusNotice from '@/components/molecules/StatusNotice/StatusNotice';

export interface RegisteredProductOrgItem {
  id: number;
  categoryLabel: string;
  name: string;
  price: number;
  imageSrc: string;
}

interface RegisteredProductOrgProps {
  date: string;
  products: RegisteredProductOrgItem[];
  address: string;
  totalCount: number;
}

const RegisteredProductOrg: React.FC<RegisteredProductOrgProps> = ({
  date,
  products,
  address,
  totalCount,
}) => {
  const isEmpty = products.length === 0;

  return (
    <section className={clsx('w-full bg-white')}>
      {/* width 고정 컨테이너 */}
      <div className={clsx('mx-auto', 'mobile:w-327', 'tablet:w-696', 'desktop:w-1400')}>
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
        <div
          className={clsx(
            'hidden',
            'desktop:flex',
            'desktop:px-40 desktop:py-20 desktop:gap-80',
            'border-t border-b border-gray-200'
          )}
        >
          <span className={clsx('w-300 text-16 font-bold tracking--0.4 text-gray-400 pl-60')}>
            상품명
          </span>
          <span className={clsx('w-160 text-16 font-bold tracking--0.4 text-gray-400')}>
            등록일
          </span>
          <span className={clsx('w-200 text-16 font-bold tracking--0.4 text-gray-400')}>
            카테고리
          </span>
          <span className={clsx('w-160 text-16 font-bold tracking--0.4 text-gray-400')}>가격</span>
          <span className={clsx('flex-1 text-16 font-bold tracking--0.4 text-gray-400')}>
            제품 링크
          </span>
        </div>

        {/* ✅ Products 영역 (반응형 최대 높이 적용) */}
        <div className={clsx('mobile:min-h-710', 'tablet:min-h-740', 'desktop:min-h-600')}>
          {isEmpty ? (
            <div className={clsx('mt-40 flex justify-center')}>
              <StatusNotice
                title="등록된 상품이 없습니다"
                description={`아직 등록한 상품이 없어요.\n상품을 등록해 보세요.`}
                buttonText="상품 등록하기"
              />
            </div>
          ) : (
            <ul className={clsx('flex flex-col')}>
              {products.map((product) => (
                <li key={product.id}>
                  {/* Mobile / Tablet */}
                  <div className={clsx('desktop:hidden')}>
                    <p
                      className={clsx(
                        'mobile:mt-20 mobile:mb-10',
                        'tablet:mt-30',
                        'text-16 font-extrabold tracking--0.4 text-gray-950'
                      )}
                    >
                      {date}
                    </p>

                    <div className={clsx('flex gap-20')}>
                      <div
                        className={clsx(
                          'flex items-center justify-center w-90 h-90 bg-gray-50 shrink-0'
                        )}
                      >
                        <Image src={product.imageSrc} alt={product.name} width={29} height={50} />
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
                          className={clsx('text-14 font-extrabold tracking--0.35 text-gray-950')}
                        >
                          {product.price.toLocaleString()}원
                        </span>

                        <span className={clsx('text-14 tracking--0.35 text-gray-600')}>
                          {address}
                        </span>
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
                      'desktop:px-40 desktop:py-20 desktop:gap-80',
                      'border-b border-gray-100'
                    )}
                  >
                    <div className={clsx('flex items-center gap-20 w-300')}>
                      <div
                        className={clsx(
                          'flex items-center justify-center w-40 h-40 bg-gray-50 shrink-0'
                        )}
                      >
                        <Image src={product.imageSrc} alt={product.name} width={16} height={27} />
                      </div>
                      <span className={clsx('text-16 tracking--0.4 text-gray-950')}>
                        {product.name}
                      </span>
                    </div>

                    <span className={clsx('w-160 text-16 tracking--0.4 text-gray-950')}>
                      {date}
                    </span>

                    <span className={clsx('w-200 text-16 tracking--0.4 text-gray-950')}>
                      {product.categoryLabel}
                    </span>

                    <span className={clsx('w-160 text-16 tracking--0.4 text-gray-950')}>
                      {product.price.toLocaleString()}
                    </span>

                    <span className={clsx('flex-1 text-16 tracking--0.4 text-gray-950')}>
                      {address}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default RegisteredProductOrg;
