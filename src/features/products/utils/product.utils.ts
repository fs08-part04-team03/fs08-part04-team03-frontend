import { getApiUrl } from '@/utils/api';

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
  // Use direct backend upload URL instead of local proxy to avoid proxy maintenance and server lock issues
  // Do NOT pre-encode the filename — Next.js will encode the URL properly when requesting the image
  imageUrl: p.image ? `${getApiUrl()}/uploads/${p.image}` : undefined,
  purchaseCount: p.salesCount ?? 0,
});
