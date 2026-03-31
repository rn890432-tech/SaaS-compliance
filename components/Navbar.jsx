import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="h-16 bg-white border-b border-slate-200 flex items-center px-6 justify-between sticky top-0 z-10">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-xl font-extrabold text-blue-600">⚖</span>
        <span className="text-lg font-bold text-slate-800">ComplianceOS</span>
      </Link>

      <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
        <Link href="/dashboard" className="hover:text-blue-600 transition">
          Dashboard
        </Link>
        <Link href="/documents" className="hover:text-blue-600 transition">
          Documents
        </Link>
        <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold">
          Sign In
        </button>
      </div>
    </nav>
  );
}
