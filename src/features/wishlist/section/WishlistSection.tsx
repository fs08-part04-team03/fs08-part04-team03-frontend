'use client';

import { useRouter, useParams } from 'next/navigation';
import WishlistTem, {
  type WishlistItem,
} from '@/features/wishlist/template/WishlistTem/WishlistTem';
import { LOADING_MESSAGES, ERROR_MESSAGES, PATHNAME } from '@/constants';
import { useWishlist, useRemoveWishlist } from '@/features/wishlist/queries/wishlist.queries';

const WishlistSection = () => {
  const router = useRouter();
  const params = useParams();
  const companyId = params?.companyId ? String(params.companyId) : '';

  const { data: wishlistProducts, isLoading, error } = useWishlist();

  // 위시리스트 제거 mutation
  const removeWishlistMutation = useRemoveWishlist();

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
    router.push(PATHNAME.PRODUCT_DETAIL(companyId, String(productId)));
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
