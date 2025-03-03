import React, { useState } from "react";
import { ExternalLink, Twitter, Globe, Github } from "lucide-react";
import { Product } from "@/constants/west-african-products.ts";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group bg-gray-800 rounded-xl border border-gray-700 overflow-hidden transition-all duration-300 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-5 relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center overflow-hidden">
            {product.logo ? (
              <img
                src={`/logos/${product.logo}`}
                alt={`${product.name} logo`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                {product.name.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            {product.country && (
              <span className="px-2 py-1 text-xs rounded-full bg-gray-700/50 backdrop-blur-sm border border-gray-600 text-gray-300">
                {product.country}
              </span>
            )}
            <span className="px-2 py-1 text-xs rounded-full bg-emerald-900/50 backdrop-blur-sm border border-emerald-700/50 text-emerald-300">
              {product.category}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-emerald-300 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto pt-3 border-t border-gray-700/50 flex items-center justify-between">
          <div className="flex space-x-3">
            {product.website && (
              <a
                href={product.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-300 transition-colors"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}
            {product.twitter && (
              <a
                href={product.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-300 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {product.github && (
              <a
                href={product.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-300 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>

          <a
            href={product.website || product.twitter || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-xs font-medium text-emerald-300 hover:text-emerald-200 transition-colors"
          >
            <span>Explore</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      <div
        className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent transition-opacity duration-300 ${
          isHovered ? "opacity-70" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default ProductCard;
