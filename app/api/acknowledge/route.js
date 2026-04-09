import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.orgId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    if (!body.documentId) {
      return Response.json(
        { error: "documentId is required" },
        { status: 400 }
      );
    }

    // Both orgId and userId are sourced from the session — never trusted from the client
    const orgId = session.user.orgId;
    const userId = session.user.id;

    // Verify the document belongs to the session user's org before acknowledging
    const doc = await prisma.document.findFirst({
      where: { id: body.documentId, orgId },
    });
    if (!doc) {
      return Response.json(
        { error: "Document not found or access denied" },
        { status: 404 }
      );
    }

    const payload = {
      userId,
      documentId: body.documentId,
      timestamp: new Date().toISOString(),
      metadata: body.metadata ?? {},
    };

    const hash = crypto
      .createHash("sha256")
      .update(JSON.stringify(payload))
      .digest("hex");

    const acknowledgment = await prisma.acknowledgment.create({
      data: {
        userId,
        documentId: payload.documentId,
        status: "signed",
        hash,
        metadata: payload.metadata,
      },
    });

    await prisma.auditLog.create({
      data: {
        orgId,
        eventType: "ACKNOWLEDGED",
        payload,
      },
    });

    return Response.json({ success: true, acknowledgment });
  } catch (error) {
    console.error("[acknowledge] Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
