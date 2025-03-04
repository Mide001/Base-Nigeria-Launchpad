"use client";
import { Product } from '../../constants/west-african-products';
import { useState, FormEvent, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Alert from "@/components/ui/alert";
import { XCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

type AlertType = 'success' | 'error' | 'info';

interface AlertState {
  type: AlertType;
  message: string;
}

export default function SubmitPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [imageError, setImageError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setAlert(null);
    
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit product');
      }

      // Clear form and image
      setFormData({});
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      setAlert({
        type: 'success',
        message: 'Product submitted successfully! Awaiting admin approval.'
      });

      // Reset form
      (e.currentTarget as HTMLFormElement).reset();
      
      // Refresh page after short delay
      setTimeout(() => {
        router.refresh();
      }, 1500); // Wait 1.5s for user to see success message

    } catch (error) {
      setAlert({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to submit product'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: Partial<Product>) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateImage = async (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      
      img.onload = () => {
        if (img.width < 350 || img.width > 400 || img.height < 350 || img.height > 400) {
          reject(new Error('Image dimensions must be between 350x350 and 400x400 pixels'));
        } else if (file.size > 2 * 1024 * 1024) { // 2MB
          reject(new Error('Image size must be less than 2MB'));
        } else {
          resolve();
        }
      };
      
      img.onerror = () => {
        reject(new Error('Invalid image file'));
      };
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageError('');
    
    if (file) {
      try {
        await validateImage(file);
        const preview = URL.createObjectURL(file);
        setImagePreview(preview);
        
        // Update form data with file
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({
            ...prev,
            logo: reader.result as string
          }));
        };
        reader.readAsDataURL(file);
      } catch (error) {
        setImageError(error instanceof Error ? error.message : 'Error loading image');
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-sm inline-block px-3 py-1.5 rounded-full text-xs mb-6">
            Submit Your Product
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-emerald-300 mb-8">
            Add Your West African Project
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {alert && (
              <Alert
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert(null)}
              />
            )}
            <div className="space-y-5">
              <div className="mb-8">
                <label htmlFor="logo" className="block text-sm font-medium text-gray-300">
                  Logo Upload (350x350 to 400x400px) *
                </label>
                <div className="relative aspect-square w-full max-w-[400px] mx-auto mb-6">
                  <div className={`absolute inset-0 bg-gray-800/50 backdrop-blur-sm rounded-lg border-2 border-dashed border-gray-700 flex flex-col items-center justify-center p-6 ${imagePreview ? 'border-emerald-500/50' : ''}`}>
                    <input
                      type="file"
                      id="logo"
                      name="logo"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-contain rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            if (fileInputRef.current) fileInputRef.current.value = '';
                            setFormData(prev => ({ ...prev, logo: undefined }));
                          }}
                          className="absolute top-2 right-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-full p-1"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-400">
                          Click or drag to upload your logo
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          400x400px recommended
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {imageError && (
                  <p className="mt-2 text-sm text-red-400">{imageError}</p>
                )}
              </div>

              {[
                { label: "Product Name", name: "name", type: "text", required: true },
                { label: "Description", name: "description", type: "textarea", required: true },
                { label: "Category", name: "category", type: "text", required: true },
                { label: "Country", name: "country", type: "text", required: true },
                { label: "Website", name: "website", type: "url" },
                { label: "Twitter", name: "twitter", type: "url" },
              ].map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-300 mb-2">
                    {field.label} {field.required && <span className="text-emerald-500">*</span>}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      value={formData[field.name as keyof typeof formData] || ""}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                    />
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      value={formData[field.name as keyof typeof formData] || ""}
                      onChange={handleChange}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                    />
                  )}
                </div>
              ))}

              <div>
                <label htmlFor="github" className="block text-sm font-medium text-gray-300">
                  GitHub URL (Optional)
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    name="github"
                    id="github"
                    placeholder="https://github.com/yourusername"
                    className="block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 ${
                submitting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Product'
              )}
            </button>

            {/* Background gradient effects */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" />
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
