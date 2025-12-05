import Link from 'next/link';
import Logo from '@/components/atoms/Logo/Logo';
import { PATHNAME } from '@/constants';

const GNBBrand = () => (
  <Link href={PATHNAME.HOME} className="flex items-center">
    <Logo size="sm" />
  </Link>
);

export default GNBBrand;
