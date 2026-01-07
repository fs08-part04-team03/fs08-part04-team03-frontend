export type TemplateProduct = {
  id: number;
  name: string;
  price: number;
  categoryId?: number | null;
  imageUrl?: string;
  purchaseCount?: number;
};

export type BackendProduct = {
  id: number;
  name: string;
  price: number;
  categoryId?: number | null;
  image?: string | null;
  salesCount?: number | null;
  link?: string | null;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export const mapBackendProductToTemplate = (p: BackendProduct): TemplateProduct => ({
  id: p.id,
  name: p.name,
  price: p.price,
  categoryId: p.categoryId ?? null,
  // 프록시 API를 통해 이미지 로드 (CORS 방지, SSR 하이드레이션 불일치 방지)
  // Supports both old format (filename) and new S3 key format (products/xxx.png)
  imageUrl: p.image ? `/api/product/image?key=${encodeURIComponent(p.image)}` : undefined,
  purchaseCount: p.salesCount ?? 0,
});
