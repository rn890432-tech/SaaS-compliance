import { prisma } from "@/lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const orgId = searchParams.get("orgId");

    if (!orgId) {
      return Response.json(
        { error: "orgId query parameter is required" },
        { status: 400 }
      );
    }

    const documents = await prisma.document.findMany({
      where: { orgId },
      orderBy: { createdAt: "desc" },
    });

    return Response.json({ documents });
  } catch (error) {
    console.error("[documents GET] Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.title || !body.content || !body.orgId) {
      return Response.json(
        { error: "title, content, and orgId are required" },
        { status: 400 }
      );
    }

    const document = await prisma.document.create({
      data: {
        title: body.title,
        content: body.content,
        version: body.version ?? "1.0",
        orgId: body.orgId,
      },
    });

    return Response.json({ document }, { status: 201 });
  } catch (error) {
    console.error("[documents POST] Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
