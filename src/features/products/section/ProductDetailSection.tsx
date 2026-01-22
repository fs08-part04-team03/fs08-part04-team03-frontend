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
import { usePageTitle } from '@/hooks/usePageTitle';
import type {
  ProductDetailDataState,
  ProductDetailCategoryState,
  ProductDetailEditModalState,
  ProductDetailDeleteModalState,
  ProductDetailCartModalState,
} from '@/features/products/types/product-detail.types';

const ProductDetailSection = () => {
  const params = useParams();
  const companyId = params?.companyId ? String(params.companyId) : '';
  const productId = params?.productId ? String(params.productId) : '';

  // 데이터 패칭
  const { data: product, isLoading, error } = useProduct(productId, { enabled: !!productId });

  // 페이지 제목 설정 (상품 이름으로 동적 설정)
  usePageTitle(product?.name || '상품 상세');

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

  // 그룹화된 Props
  const data: ProductDetailDataState = {
    isLoading,
    hasProduct: pageProps.hasProduct,
    detailPageProps: pageProps.detailPageProps,
    productCategoryId: pageProps.productCategoryId,
  };

  const category: ProductDetailCategoryState = {
    categorySections: pageProps.categorySections,
    onChangeCategory: navigation.goToProductsByCategory,
  };

  const editModal: ProductDetailEditModalState | undefined = pageProps.canUseMenu
    ? {
        isOpen: modals.editModalOpen,
        onClose: modals.handleCloseEditModal,
        onSubmit: editActions.handleEditSubmit,
        initialValues: {
          name: pageProps.productName,
          price: pageProps.productPrice,
          link: pageProps.initialLink,
          image: pageProps.editModalImageUrl,
          imageKey: pageProps.initialImageKey,
          category: pageProps.initialCategoryOption,
          subCategory: pageProps.initialSubCategoryOption,
        },
      }
    : undefined;

  const deleteModal: ProductDetailDeleteModalState | undefined = pageProps.canUseMenu
    ? {
        isOpen: modals.deleteModalOpen,
        onClose: modals.handleCloseDeleteModal,
        onConfirm: editActions.handleDeleteConfirm,
        productName: pageProps.productName,
      }
    : undefined;

  const cartModal: ProductDetailCartModalState = {
    addFailedOpen: modals.cartAddFailedModalOpen,
    addSuccessOpen: modals.cartAddSuccessModalOpen,
    onCloseAddFailed: modals.handleCloseCartAddFailedModal,
    onCloseAddSuccess: modals.handleCloseCartAddSuccessModal,
    onGoToCart: () => {
      navigation.goToCart().catch((navError) => {
        logger.error('Failed to navigate to cart', {
          hasError: true,
          errorType: navError instanceof Error ? navError.constructor.name : 'Unknown',
        });
      });
    },
    onGoToProducts: navigation.goToProducts,
  };

  return (
    <ProductDetailTem
      data={data}
      category={category}
      editModal={editModal}
      deleteModal={deleteModal}
      cartModal={cartModal}
      canUseMenu={pageProps.canUseMenu}
    />
  );
};

export default ProductDetailSection;
