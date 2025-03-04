import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();
const APPROVED_PRODUCTS_PATH = path.join(process.cwd(), 'src/constants/west-african-products.ts');

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    console.log('Approving product with ID:', id); // Debug log

    // Find the product first
    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      console.log('Product not found:', id);
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Update the product status
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { status: 'approved' }
    });

    // Format the product data to match the existing format
    const formattedProduct = `  {
    name: "${product.name}",
    description:
      "${product.description}",
    category: "${product.category}",
    country: "${product.country}",${product.logo ? `
    logo: "${product.logo}",` : ''}${product.website ? `
    website: "${product.website}",` : ''}${product.twitter ? `
    twitter: "${product.twitter}",` : ''}${product.github ? `
    github: "${product.github}",` : ''}
  },`;

    // Read current file content
    const currentContent = await fs.readFile(APPROVED_PRODUCTS_PATH, 'utf8');

    // Insert new product at the start of the array
    const updatedContent = currentContent.replace(
      'export const westAfricanProducts: Product[] = [',
      `export const westAfricanProducts: Product[] = [\n${formattedProduct}`
    );

    await fs.writeFile(APPROVED_PRODUCTS_PATH, updatedContent);
    console.log('Product approved and file updated successfully');
    
    return NextResponse.json({ 
      success: true,
      message: 'Product approved and added to list',
      product: updatedProduct 
    });
  } catch (error) {
    console.error('Error approving product:', error);
    return NextResponse.json({ 
      error: 'Failed to approve product. Please try again.' 
    }, { status: 500 });
  }
} 