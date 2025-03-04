import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// This tells Next.js to treat this route as dynamic
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Optional query parameters for more flexibility
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const category = searchParams.get("category") || undefined;
    const country = searchParams.get("country") || undefined;

    const whereCondition: any = {
      status: "approved",
    };

    // Add optional filters
    if (category) whereCondition.category = category;
    if (country) whereCondition.country = country;

    const products = await prisma.product.findMany({
      where: whereCondition,
      orderBy: {
        submittedAt: "desc",
      },
      take: limit,
      skip: (page - 1) * limit,
      select: {
        // Select only the fields you want to expose publicly
        id: true,
        name: true,
        description: true,
        category: true,
        country: true,
        logo: true,
        website: true,
        twitter: true,
        github: true,
        submittedAt: true,
      },
    });

    // Optional: Get total count for pagination
    const totalProducts = await prisma.product.count({
      where: whereCondition,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching public products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
