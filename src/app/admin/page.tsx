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

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${activeTab}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
      
      fetchProducts();
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
      
      fetchProducts();
    } catch (error) {
      setAlert({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to reject product'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-emerald-300 mb-8">Product Management</h1>
        
        {alert && (
          <div className="mb-6">
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          </div>
        )}

        <div className="mb-8 border-b border-gray-700">
          <nav className="flex gap-4">
            {['pending', 'approved', 'rejected'].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-3 -mb-px ${
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

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
          </div>
        ) : error ? (
          <Alert type="error" message={error} />
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No {activeTab} products found
          </div>
        ) : (
          <div className="grid gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700"
              >
                <div className="flex items-start gap-6">
                  <div className="relative w-16 h-16">
                    {product.logo && (
                      <Image
                        src={product.logo}
                        alt={product.name}
                        fill
                        className="rounded-lg object-cover"
                        sizes="64px"
                      />
                    )}
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-center gap-3">
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
                    <p className="text-gray-400 mt-1 line-clamp-2">{product.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-gray-700/50 rounded text-sm">
                        {product.category}
                      </span>
                      <span className="px-2 py-1 bg-gray-700/50 rounded text-sm">
                        {product.country}
                      </span>
                    </div>
                    <div className="mt-3 flex gap-4">
                      {product.website && (
                        <a
                          href={product.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-emerald-400 hover:underline"
                        >
                          Website
                        </a>
                      )}
                      {product.twitter && (
                        <a
                          href={product.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-emerald-400 hover:underline"
                        >
                          Twitter
                        </a>
                      )}
                      {product.github && (
                        <a
                          href={product.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-emerald-400 hover:underline"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="text-sm text-gray-500">
                      {new Date(product.submittedAt).toLocaleDateString()}
                    </div>
                    {activeTab === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(product.id)}
                          className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(product.id)}
                          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
} 