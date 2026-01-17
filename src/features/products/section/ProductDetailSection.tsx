'use client';

import { useParams } from 'next/navigation';
import ProductDetailTem from '@/features/products/template/ProductDetailTem/ProductDetailTem';
import { useProduct } from '@/features/products/queries/product.queries';
import { ERROR_MESSAGES } from '@/constants';
import { useProductNavigation } from '@/features/products/handlers/useProductNavigation';
import { useProductModals } from '@/features/products/handlers/useProductModals';
import { useProductWishlistActions } from '@/features/products/handlers/useProductWishlistActions';
import { useProductCartActions } from '@/features/products/handlers/useProductCartActions';
import { useProductEditActions } from '@/features/products/handlers/useProductEditActions';
import { useProductDetailPageProps } from '@/features/products/handlers/useProductDetailPageProps';
import { logger } from '@/utils/logger';

const ProductDetailSection = () => {
  const params = useParams();
  const companyId = params?.companyId ? String(params.companyId) : '';
  const productId = params?.productId ? String(params.productId) : '';

  // 데이터 패칭
  const { data: product, isLoading, error } = useProduct(productId, { enabled: !!productId });

  // 핸들러 훅 사용
  const navigation = useProductNavigation(companyId);
  const modals = useProductModals();
  const wishlistActions = useProductWishlistActions(productId);
  const cartActions = useProductCartActions(
    productId,
    modals.handleOpenCartAddSuccessModal,
    modals.handleOpenCartAddFailedModal
  );
  const editActions = useProductEditActions(productId, companyId, () => {
    modals.handleCloseEditModal();
  });

  // 상세 페이지 Props 계산
  const pageProps = useProductDetailPageProps({
    product,
    companyId,
    navigation,
    wishlistActions,
    cartActions,
    modals,
  });

  // 에러 상태 분기
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{ERROR_MESSAGES.FETCH_ERROR}</p>
      </div>
    );
  }

  return (
    <ProductDetailTem
      categorySections={pageProps.categorySections}
      detailPageProps={pageProps.detailPageProps}
      isLoading={isLoading}
      hasProduct={pageProps.hasProduct}
      productCategoryId={pageProps.productCategoryId}
      canUseMenu={pageProps.canUseMenu}
      editModalOpen={modals.editModalOpen}
      deleteModalOpen={modals.deleteModalOpen}
      onCloseEditModal={modals.handleCloseEditModal}
      onCloseDeleteModal={modals.handleCloseDeleteModal}
      onEditSubmit={editActions.handleEditSubmit}
      onDeleteConfirm={editActions.handleDeleteConfirm}
      initialCategoryOption={pageProps.initialCategoryOption}
      initialSubCategoryOption={pageProps.initialSubCategoryOption}
      initialLink={pageProps.initialLink}
      initialImage={pageProps.editModalImageUrl}
      initialImageKey={pageProps.initialImageKey}
      productName={pageProps.productName}
      productPrice={pageProps.productPrice}
      cartAddFailedModalOpen={modals.cartAddFailedModalOpen}
      cartAddSuccessModalOpen={modals.cartAddSuccessModalOpen}
      onCloseCartAddFailedModal={modals.handleCloseCartAddFailedModal}
      onCloseCartAddSuccessModal={modals.handleCloseCartAddSuccessModal}
      onGoToCart={() => {
        navigation.goToCart().catch((navError) => {
          logger.error('Failed to navigate to cart', {
            hasError: true,
            errorType: navError instanceof Error ? navError.constructor.name : 'Unknown',
          });
        });
      }}
      onGoToProducts={navigation.goToProducts}
      onChangeCategory={navigation.goToProductsByCategory}
    />
  );
};

export default ProductDetailSection;
