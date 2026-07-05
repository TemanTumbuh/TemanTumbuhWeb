import { AdminProvider } from "@/context/AdminContext";
import AdminLayout from "@/components/admin/layout/AdminLayout";

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminProvider>
      <AdminLayout>{children}</AdminLayout>
    </AdminProvider>
  );
}
