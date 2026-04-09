import AcknowledgmentCard from "@/components/AcknowledgmentCard";
import Sidebar from "@/components/Sidebar";

export default function Dashboard() {
  const mockUser = {
    id: "user-1",
    orgId: "org-1",
    name: "Alice",
  };

  const mockDocs = [
    {
      id: "doc-1",
      title: "Red Team Code of Conduct",
      content:
        "You agree to follow all policies and procedures outlined by the security team, including responsible disclosure, no unauthorized access, and maintaining confidentiality of findings.",
      version: "1.2",
    },
    {
      id: "doc-2",
      title: "Data Privacy Policy",
      content:
        "You acknowledge that all personal data processed during engagements must be handled in accordance with GDPR, CCPA, and internal data minimization policies.",
      version: "2.0",
    },
    {
      id: "doc-3",
      title: "Acceptable Use Policy",
      content:
        "Company systems and resources are for authorized business use only. Unauthorized use, monitoring, or data exfiltration is prohibited and may result in disciplinary action.",
      version: "1.0",
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h1>
        <p className="text-slate-500 mb-8">
          Review and acknowledge your compliance documents below.
        </p>

        <div className="grid gap-6">
          {mockDocs.map((doc) => (
            <AcknowledgmentCard key={doc.id} user={mockUser} document={doc} />
          ))}
        </div>
      </div>
    </div>
  );
}
