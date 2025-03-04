import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { ProductSchema } from '@/utils/validation';
import { getServerSession } from "next-auth/next";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const product = await req.json();
    console.log('Received product data:', product); // Debug log
    
    const validationResult = ProductSchema.safeParse(product);
    if (!validationResult.success) {
      console.log('Validation errors:', validationResult.error.errors); // Debug log
      return NextResponse.json(
        { 
          error: 'Invalid product data: ' + 
            validationResult.error.errors.map(e => e.message).join(', ')
        },
        { status: 400 }
      );
    }

    const newProduct = await prisma.product.create({
      data: {
        ...validationResult.data,
        status: 'pending'
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Product submitted successfully!',
      product: newProduct 
    });
  } catch (error) {
    console.error('Error saving product:', error);
    return NextResponse.json(
      { error: 'Failed to save product. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession();

    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: "Not authenticated" }),
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    console.log('Fetching products with status:', status); // Debug log

    const products = await prisma.product.findMany({
      where: status ? { status: status } : {},
      orderBy: {
        submittedAt: 'desc'
      }
    });

    console.log('Found products:', products); // Debug log

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
} 