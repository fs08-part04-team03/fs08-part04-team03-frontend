'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import Logo from '@/components/atoms/Logo/Logo';
import { PATHNAME } from '@/constants';

const GNBBrand = () => {
  const params = useParams();
  const companyId = params?.companyId as string | undefined;

  const href = companyId ? PATHNAME.HOME(companyId) : PATHNAME.ROOT;

  return (
    <Link href={href} className="flex items-center">
      <Logo size="sm" href={undefined} />
    </Link>
  );
};

export default GNBBrand;
