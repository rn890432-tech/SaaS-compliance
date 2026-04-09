import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 text-center">
      <h1 className="text-5xl font-extrabold text-slate-800 mb-4">
        SaaS Compliance Platform
      </h1>
      <p className="text-lg text-slate-500 max-w-2xl mb-8">
        Multi-tenant compliance management with audit logging, document
        acknowledgment tracking, and SSO authentication — ready to scale.
      </p>
      <div className="flex gap-4">
        <Link
          href="/dashboard"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </Link>
        <Link
          href="/documents"
          className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-100 transition"
        >
          View Documents
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl w-full text-left">
        <FeatureCard
          icon="🔐"
          title="SSO Authentication"
          description="GitHub OAuth out-of-the-box. Extendable to SAML and other providers."
        />
        <FeatureCard
          icon="🧾"
          title="Acknowledgment Tracking"
          description="Cryptographically hashed acknowledgments with full audit trail."
        />
        <FeatureCard
          icon="🏢"
          title="Multi-Tenant"
          description="Full org isolation. Each tenant has their own users, documents, and logs."
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
  );
}
