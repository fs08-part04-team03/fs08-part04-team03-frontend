'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter, useParams } from 'next/navigation';
import WishlistTem, {
  type WishlistItem,
} from '@/features/wishlist/template/WishlistTem/WishlistTem';
import { getWishlist, removeFromWishlist } from '@/features/wishlist/api/wishlist.api';
import { useToast } from '@/hooks/useToast';
import { LOADING_MESSAGES, ERROR_MESSAGES, PATHNAME } from '@/constants';

const WishlistSection = () => {
  const router = useRouter();
  const params = useParams();
  const companyId = params?.companyId ? String(params.companyId) : '';
  const queryClient = useQueryClient();
  const { triggerToast } = useToast();

  const {
    data: wishlistProducts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => getWishlist(),
  });

  // 위시리스트 제거 mutation
  const removeWishlistMutation = useMutation({
    mutationFn: (productId: number) => removeFromWishlist(productId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      triggerToast('success', '위시리스트에서 제거되었습니다.');
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : '위시리스트 제거에 실패했습니다.';
      triggerToast('error', message);
    },
  });

  // 백엔드 데이터를 WishlistItem으로 변환
  const wishlistItems: WishlistItem[] =
    wishlistProducts?.data.map((item) => {
      // 프록시 API를 통해 이미지 로드 (CORS 방지)
      const imageUrl = item.product.image
        ? `/api/product/image?key=${encodeURIComponent(item.product.image)}`
        : '';
      return {
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        imageUrl,
        purchaseCount: 0, // API 응답에 salesCount가 없으므로 0으로 설정
      };
    }) || [];

  // 위시리스트 제거 핸들러
  const handleRemove = (productId: number) => {
    removeWishlistMutation.mutate(productId);
  };

  // 상품 클릭 핸들러
  const handleProductClick = (productId: number) => {
    router.push(`${PATHNAME.PRODUCTS(companyId)}/${productId}`);
  };

  // 상품 보러가기 핸들러
  const handleGoToProducts = () => {
    router.push(PATHNAME.PRODUCTS(companyId));
  };

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

  return (
    <WishlistTem
      items={wishlistItems}
      onRemove={handleRemove}
      onProductClick={handleProductClick}
      onGoToProducts={handleGoToProducts}
    />
  );
};

export default WishlistSection;
