import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { ProductSchema } from '@/utils/validation';

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

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { status: 'pending' },
      orderBy: { submittedAt: 'desc' }
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
} 