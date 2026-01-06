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
  // buildImageUrl은 async이므로 직접 URL 구성
  // Supports both old format (filename) and new S3 key format (products/xxx.png)
  imageUrl: p.image
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/api/product/image?key=${encodeURIComponent(p.image)}`
    : undefined,
  purchaseCount: p.salesCount ?? 0,
});
