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
  imageUrl?: string | null;
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
  // 이미지 key(S3 key) 그대로 전달하고, 실제 URL 변환은 클라이언트에서 수행
  imageUrl: p.imageUrl ?? undefined,
  purchaseCount: p.salesCount ?? 0,
});
