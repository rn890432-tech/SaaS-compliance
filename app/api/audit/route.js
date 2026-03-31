import { prisma } from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const orgId = searchParams.get("orgId");
    const limit = parseInt(searchParams.get("limit") ?? "50", 10);

    if (!orgId) {
      return Response.json(
        { error: "orgId query parameter is required" },
        { status: 400 }
      );
    }

    const logs = await prisma.auditLog.findMany({
      where: { orgId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return Response.json({ logs });
  } catch (error) {
    console.error("[audit GET] Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
