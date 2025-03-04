import React, { useState, useEffect, Suspense, useCallback } from "react";
import ProductCard from "./ProductCard";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Product } from "@/constants/west-african-products";
import { useRouter } from 'next/navigation';

const ProductCardSkeleton = () => (
  <div className="flex-1 p-6 bg-gray-800/50 rounded-lg border border-gray-700/50 animate-pulse">
    <div className="w-16 h-16 bg-gray-700/50 rounded-lg mb-4" /> {/* Logo */}
    <div className="h-6 bg-gray-700/50 rounded w-3/4 mb-3" /> {/* Title */}
    <div className="space-y-2 mb-4"> {/* Description */}
      <div className="h-4 bg-gray-700/50 rounded w-full" />
      <div className="h-4 bg-gray-700/50 rounded w-5/6" />
      <div className="h-4 bg-gray-700/50 rounded w-4/6" />
    </div>
    <div className="space-y-2"> {/* Links */}
      <div className="h-4 bg-gray-700/50 rounded w-1/2" />
      <div className="h-4 bg-gray-700/50 rounded w-1/3" />
    </div>
  </div>
);

const WestAfricanProducts: React.FC = () => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products on mount and after approval
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products/approved', {
          cache: 'no-store' // For real-time updates
        });
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Number of products per slide based on screen size
  const productsPerSlide = 3;
  const totalSlides = Math.ceil((loading ? 3 : products.length) / productsPerSlide);

  // Auto-scroll functionality
  const goToNext = useCallback(() => {
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsAnimating(false), 700);
  }, [totalSlides]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating && !loading) {
        goToNext();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isAnimating, loading, goToNext]);

  const goToPrev = () => {
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 700);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-300 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-400 rounded-full blur-3xl transform translate-x-1/4 translate-y-1/4"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-emerald-500 rounded-full blur-3xl"></div>
      </div>

      {/* Animated pattern elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-24 h-24 border-2 border-emerald-500 rounded-lg transform animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${7 + Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-sm font-medium text-emerald-300 tracking-wider uppercase mb-4">
            Innovation Showcase
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-emerald-200 text-transparent bg-clip-text">
            West African Built Products
          </h1>
          <p className="max-w-2xl mx-auto text-gray-300">
            Discover innovative solutions created by talented founders from West
            Africa solving real-world problems.
          </p>
        </div>

        {/* Products slider with animation */}
        <div className="relative mx-auto max-w-6xl px-8">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
                opacity: isAnimating ? 0.7 : 1,
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {loading ? (
                      // Show skeletons while loading
                      [1, 2, 3].map((i) => (
                        <ProductCardSkeleton key={i} />
                      ))
                    ) : (
                      // Show actual products when loaded
                      products
                        .slice(
                          slideIndex * productsPerSlide,
                          (slideIndex + 1) * productsPerSlide
                        )
                        .map((product) => (
                          <ProductCard key={product.name} product={product} />
                        ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-emerald-50 transition-colors duration-300"
            aria-label="Previous"
          >
            <ChevronLeft className="text-emerald-600" size={24} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-emerald-50 transition-colors duration-300"
            aria-label="Next"
          >
            <ChevronRight className="text-emerald-600" size={24} />
          </button>

          {/* Pagination dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAnimating(true);
                  setActiveIndex(index);
                  setTimeout(() => setIsAnimating(false), 700);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? "bg-emerald-600 w-6" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <button 
            onClick={() => router.push('/submit')}
            className="px-6 py-3 bg-emerald-600/90 backdrop-blur-sm text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-1 animate-pulse-subtle"
          >
            Submit Your Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default WestAfricanProducts;
