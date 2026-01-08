'use client';

import { useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useCallback, useState } from 'react';
import MyProductDetailTem from '@/features/products/template/MyProductDetailTem/MyProductDetailTem';
import { getMyProductById } from '@/features/products/api/products.api';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from '@/features/wishlist/api/wishlist.api';
import {
  CATEGORY_SECTIONS,
  BREADCRUMB_ITEMS,
  LOADING_MESSAGES,
  ERROR_MESSAGES,
  buildProductBreadcrumb,
} from '@/constants';
import { useAuthStore } from '@/lib/store/authStore';
import { ROLE_LEVEL } from '@/utils/auth';
import { useToast } from '@/hooks/useToast';
import LinkText from '@/components/atoms/LinkText/LinkText';
import type { DetailPageLayoutProps } from '@/components/organisms/DetailPageLayout/DetailPageLayout';

const MyProductDetailSection = () => {
  const params = useParams();
  const companyId = params?.companyId ? String(params.companyId) : '';
  const productId = params?.productId ? String(params.productId) : '';
  const { user } = useAuthStore();

  const queryClient = useQueryClient();
  const { triggerToast } = useToast();
  // 이미지 리프레시를 위한 타임스탬프 (상품 수정 후 이미지 강제 재로드)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const [imageRefreshKey] = useState<number>(0);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['myProduct', productId],
    queryFn: () => getMyProductById(productId),
    enabled: !!productId,
    staleTime: 0, // 캐시 없이 항상 최신 데이터 가져오기 (이미지 업데이트 반영)
    refetchOnMount: true, // ✅ 페이지 마운트 시 항상 최신 데이터 가져오기
    refetchOnWindowFocus: true, // ✅ 윈도우 포커스 시 refetch
  });

  // 위시리스트 목록 조회
  const { data: wishlistData } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => getWishlist(),
  });

  // 현재 상품이 위시리스트에 있는지 확인
  const isLiked = useMemo(() => {
    if (!wishlistData?.data || !productId) return false;
    return wishlistData.data.some((item) => item.product.id === Number(productId));
  }, [wishlistData, productId]);

  // 위시리스트 추가 mutation
  const addWishlistMutation = useMutation({
    mutationFn: () => addToWishlist(productId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      triggerToast('success', '위시리스트에 추가되었습니다.');
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : '위시리스트 추가에 실패했습니다.';
      triggerToast('error', message);
    },
  });

  // 위시리스트 제거 mutation
  const removeWishlistMutation = useMutation({
    mutationFn: () => removeFromWishlist(productId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      triggerToast('success', '위시리스트에서 제거되었습니다.');
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : '위시리스트 제거에 실패했습니다.';
      triggerToast('error', message);
    },
  });

  // 위시리스트 토글 핸들러
  const handleToggleLike = useCallback(() => {
    if (isLiked) {
      removeWishlistMutation.mutate();
    } else {
      addWishlistMutation.mutate();
    }
  }, [isLiked, addWishlistMutation, removeWishlistMutation]);

  // 메니저 이상급만 ItemMenu 사용 가능
  const canUseMenu = useMemo(() => {
    if (!user?.role) return false;
    const userRole = user.role;
    return ROLE_LEVEL[userRole] >= ROLE_LEVEL.manager;
  }, [user?.role]);

  const detailPageProps: DetailPageLayoutProps = useMemo(() => {
    if (!product) {
      return {
        breadcrumbItems: [],
        productDetailHeader: {
          productName: '',
          price: 0,
          purchaseCount: 0,
        },
      };
    }

    // buildProductBreadcrumb를 사용하여 대분류와 소분류를 모두 포함한 breadcrumb 생성
    const categoryBreadcrumbItems = buildProductBreadcrumb({ categoryId: product.categoryId });

    const breadcrumbItems = [
      {
        label: BREADCRUMB_ITEMS.HOME.label,
        href: BREADCRUMB_ITEMS.HOME.href(companyId),
      },
      {
        label: '상품 등록 내역',
        href: `/${companyId}/products/my`,
      },
      // buildProductBreadcrumb에서 반환된 대분류와 소분류 추가
      ...categoryBreadcrumbItems.map((item) => ({
        label: item.label,
        href: item.href,
      })),
    ];

    // 상대 경로 사용 (SSR 하이드레이션 불일치 방지)
    // imageRefreshKey를 사용하여 이미지 업데이트 시 캐시 무효화
    const imageUrl = product.image
      ? `/api/product/image?key=${encodeURIComponent(product.image)}&t=${imageRefreshKey}`
      : '/icons/no-image.svg';

    return {
      breadcrumbItems,
      productImage: {
        src: imageUrl,
        alt: product.name,
      },
      productImageKey: product.image || null,
      productDetailHeader: {
        productName: product.name,
        price: product.price,
        purchaseCount: product.salesCount || 0,
        // type을 전달하지 않으면 ProductDetailHeader에서 역할에 따라 자동 결정
        // onMenuClick은 MyProductDetailTem에서 처리됨
        type: undefined,
      },
      accordionPanels: [
        {
          id: 'link',
          label: '제품 링크',
          content: product.link ? (
            <LinkText
              url={product.link}
              className="text-14 tracking--0.35 text-gray-600 tablet:text-16 tablet:tracking--0.4 desktop:text-16 desktop:tracking--0.4"
              clickable
            />
          ) : (
            '링크 없음'
          ),
        },
      ],
      liked: isLiked,
      onToggleLike: handleToggleLike,
    };
  }, [product, companyId, isLiked, handleToggleLike]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{LOADING_MESSAGES.DEFAULT}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{ERROR_MESSAGES.FETCH_ERROR}</p>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <MyProductDetailTem
      categorySections={CATEGORY_SECTIONS}
      detailPageProps={detailPageProps}
      productId={productId}
      companyId={companyId}
      canUseMenu={canUseMenu}
    />
  );
};

export default MyProductDetailSection;
