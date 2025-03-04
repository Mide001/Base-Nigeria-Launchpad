import React, { useState } from "react";
import { ExternalLink, Twitter, Globe, Github } from "lucide-react";
import { Product } from "@/constants/west-african-products";
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Function to determine if the logo is a base64 string
  const isBase64Image = (str: string) => {
    return str?.startsWith('data:image');
  };

  return (
    <div className="group flex flex-col h-full bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 overflow-hidden">
      <div className="p-4 sm:p-6 flex flex-col h-full">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 mx-auto sm:mx-0 rounded-lg overflow-hidden">
            {product.logo && (
              isBase64Image(product.logo) ? (
                <Image
                  src={product.logo}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 64px, 80px"
                />
              ) : (
                <Image
                  src={`/images/${product.logo}`}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 64px, 80px"
                />
              )
            )}
          </div>

          <div className="flex-grow space-y-3 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-emerald-300 group-hover:text-emerald-400 transition-colors duration-200">
              {product.name}
            </h3>
            <p className="text-sm sm:text-base text-gray-400 line-clamp-3">
              {product.description}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
          <span className="px-3 py-1 bg-emerald-900/30 text-emerald-300 text-xs sm:text-sm rounded-full">
            {product.category}
          </span>
          <span className="px-3 py-1 bg-emerald-900/30 text-emerald-300 text-xs sm:text-sm rounded-full">
            {product.country}
          </span>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-700/50 flex flex-wrap gap-4 justify-center sm:justify-start">
          {product.website && (
            <a
              href={product.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Website</span>
            </a>
          )}
          {product.twitter && (
            <a
              href={product.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
            >
              <Twitter className="w-4 h-4" />
              <span>Twitter</span>
            </a>
          )}
          {product.github && (
            <a
              href={product.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
