import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    
    await prisma.product.update({
      where: { id },
      data: { status: 'rejected' }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to reject product' }, { status: 500 });
  }
} 