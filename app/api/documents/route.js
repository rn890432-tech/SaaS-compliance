import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.orgId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // orgId is sourced from the session — never trusted from the client
    const orgId = session.user.orgId;
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") ?? "50", 10);

    const documents = await prisma.document.findMany({
      where: { orgId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return Response.json({ documents });
  } catch (error) {
    console.error("[documents GET] Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.orgId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    if (!body.title || !body.content) {
      return Response.json(
        { error: "title and content are required" },
        { status: 400 }
      );
    }

    // orgId is sourced from the session — never trusted from the client
    const orgId = session.user.orgId;

    // Use a transaction so the document and its audit log entry are written atomically
    const document = await prisma.$transaction(async (tx) => {
      const doc = await tx.document.create({
        data: {
          title: body.title,
          content: body.content,
          version: body.version ?? "1.0",
          orgId,
        },
      });

      await tx.auditLog.create({
        data: {
          orgId,
          eventType: "DOCUMENT_CREATED",
          payload: {
            documentId: doc.id,
            title: doc.title,
            version: doc.version,
            createdBy: session.user.id,
          },
        },
      });

      return doc;
    });

    return Response.json({ document }, { status: 201 });
  } catch (error) {
    console.error("[documents POST] Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
