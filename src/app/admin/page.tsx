"use client";
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import Alert from '@/components/ui/alert';

type TabType = 'pending' | 'approved' | 'rejected';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  country: string;
  logo: string;
  website?: string;
  twitter?: string;
  github?: string;
  status: string;
  submittedAt: Date;
}

type AlertType = 'success' | 'error' | 'info';

interface AlertState {
  type: AlertType;
  message: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('pending');
  const [alert, setAlert] = useState<AlertState | null>(null);

  const fetchProducts = async (status: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products?status=${status}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for sending cookies
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(activeTab);
  }, [fetchProducts, activeTab]);

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/products/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error('Failed to approve product');
      
      setAlert({
        type: 'success',
        message: 'Product approved successfully'
      });
      
      fetchProducts(activeTab);
    } catch (error) {
      setAlert({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to approve product'
      });
    }
  };

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`/api/products/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error('Failed to reject product');
      
      setAlert({
        type: 'success',
        message: 'Product rejected successfully'
      });
      
      fetchProducts(activeTab);
    } catch (error) {
      setAlert({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to reject product'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-emerald-300 mb-6">
          Product Management
        </h1>
        
        {alert && (
          <div className="mb-4">
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          </div>
        )}

        <div className="mb-6 border-b border-gray-700">
          <nav className="flex gap-4">
            {['pending', 'approved', 'rejected'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 -mb-px ${
                  activeTab === tab
                    ? 'border-b-2 border-emerald-500 text-emerald-300'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab(tab as TabType)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        <div className={`${activeTab !== 'approved' && products.length > 4 ? 'h-[calc(100vh-13rem)] overflow-y-auto' : ''}`}>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
            </div>
          ) : error ? (
            <Alert type="error" message={error} />
          ) : products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No {activeTab} products found</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-gray-700 hover:border-emerald-500/30 transition-colors duration-300"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 mx-auto sm:mx-0">
                      {product.logo && (
                        <Image
                          src={product.logo}
                          alt={product.name}
                          fill
                          className="rounded-lg object-cover"
                          sizes="(max-width: 640px) 64px, 80px"
                        />
                      )}
                    </div>

                    <div className="flex-grow space-y-3 text-center sm:text-left">
                      <div className="flex items-center gap-3 justify-center sm:justify-start">
                        <h2 className="text-xl font-semibold text-emerald-300">
                          {product.name}
                        </h2>
                        {activeTab === 'approved' && (
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        )}
                        {activeTab === 'rejected' && (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                      <p className="text-gray-400 text-sm sm:text-base line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        <span className="px-2 py-1 bg-gray-700/50 rounded text-xs sm:text-sm text-emerald-200">
                          {product.category}
                        </span>
                        <span className="px-2 py-1 bg-gray-700/50 rounded text-xs sm:text-sm text-emerald-200">
                          {product.country}
                        </span>
                      </div>
                      <div className="flex gap-4 justify-center sm:justify-start">
                        {product.website && (
                          <a
                            href={product.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                          >
                            Website
                          </a>
                        )}
                        {product.twitter && (
                          <a
                            href={product.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                          >
                            Twitter
                          </a>
                        )}
                        {product.github && (
                          <a
                            href={product.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 w-full sm:w-auto items-center sm:items-end">
                      <div className="text-sm text-gray-500">
                        {new Date(product.submittedAt).toLocaleDateString()}
                      </div>
                      {activeTab === 'pending' && (
                        <div className="flex gap-2 sm:flex-col w-full sm:w-auto">
                          <button
                            onClick={() => handleApprove(product.id)}
                            className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors duration-200 text-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(product.id)}
                            className="flex-1 sm:flex-none px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200 text-sm"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
} 