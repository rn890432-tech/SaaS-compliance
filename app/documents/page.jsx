import Sidebar from "@/components/Sidebar";
import Link from "next/link";

const mockDocuments = [
  {
    id: "doc-1",
    title: "Red Team Code of Conduct",
    version: "1.2",
    createdAt: "2024-01-15",
    status: "Active",
  },
  {
    id: "doc-2",
    title: "Data Privacy Policy",
    version: "2.0",
    createdAt: "2024-03-01",
    status: "Active",
  },
  {
    id: "doc-3",
    title: "Acceptable Use Policy",
    version: "1.0",
    createdAt: "2024-02-10",
    status: "Active",
  },
];

export default function DocumentsPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-1">
              Documents
            </h1>
            <p className="text-slate-500">
              Manage your compliance document library.
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
            + New Document
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-slate-600">
                  Title
                </th>
                <th className="text-left px-6 py-3 font-semibold text-slate-600">
                  Version
                </th>
                <th className="text-left px-6 py-3 font-semibold text-slate-600">
                  Created
                </th>
                <th className="text-left px-6 py-3 font-semibold text-slate-600">
                  Status
                </th>
                <th className="text-left px-6 py-3 font-semibold text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {mockDocuments.map((doc, i) => (
                <tr
                  key={doc.id}
                  className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                >
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {doc.title}
                  </td>
                  <td className="px-6 py-4 text-slate-500">v{doc.version}</td>
                  <td className="px-6 py-4 text-slate-500">{doc.createdAt}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href="/dashboard"
                      className="text-blue-600 hover:underline text-xs font-medium"
                    >
                      View / Acknowledge
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
