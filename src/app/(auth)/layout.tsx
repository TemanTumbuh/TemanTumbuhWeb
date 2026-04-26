import Footer from "@/components/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#fefefb]">
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
