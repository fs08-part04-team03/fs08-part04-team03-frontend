import DashboardSection from '@/features/dashboard/section/DashboardSection';

const AdminPage = async ({ params }: { params: Promise<{ companyId: string }> }) => {
  const { companyId } = await params;
  return <DashboardSection companyId={companyId} />;
};

export default AdminPage;
