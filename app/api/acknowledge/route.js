import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.userId || !body.documentId || !body.orgId) {
      return Response.json(
        { error: "userId, documentId, and orgId are required" },
        { status: 400 }
      );
    }

    const payload = {
      userId: body.userId,
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
        userId: payload.userId,
        documentId: payload.documentId,
        status: "signed",
        hash,
        metadata: payload.metadata,
      },
    });

    await prisma.auditLog.create({
      data: {
        orgId: body.orgId,
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
