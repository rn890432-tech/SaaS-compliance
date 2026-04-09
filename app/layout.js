import "@/styles/globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "SaaS Compliance Platform",
  description: "Multi-tenant compliance management with audit logging",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
