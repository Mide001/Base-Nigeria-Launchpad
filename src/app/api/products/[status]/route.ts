import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { status: string } }
) {
  try {
    const products = await prisma.product.findMany({
      where: {
        status: params.status
      },
      orderBy: {
        submittedAt: 'desc'
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
} 