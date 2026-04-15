'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await login(username, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'فشل تسجيل الدخول');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ECE0BD] via-[#D4AF37]/10 to-[#B39977]/20">
      
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="relative group">
            {/* Background glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#B39977]/30 to-[#684F36]/30 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#B39977]/20 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#B39977]/10 to-[#684F36]/10 px-8 py-6 border-b border-[#B39977]/20">
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#B39977]/20 to-[#684F36]/20 rounded-full blur-lg"></div>
                    <img 
                      src="/aaa.png" 
                      alt="الخبير للعقارات" 
                      className="relative w-16 h-14 mx-auto mb-4 drop-shadow-lg"
                    />
                  </div>
                  <h1 className="text-2xl font-bold text-[#342519] mb-2">تسجيل الدخول</h1>
                  <p className="text-[#684F36]/70 text-sm">أهلاً بك في الخبير للعقارات</p>
                </div>
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
                {/* Username Field */}
                <div className="space-y-2">
                  <label htmlFor="username" className="block text-sm font-medium text-[#342519]">
                    اسم المستخدم
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#B39977]/10 to-[#684F36]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="relative w-full px-4 py-3 bg-white/80 border border-[#B39977]/30 rounded-lg text-[#342519] placeholder-[#684F36]/50 focus:outline-none focus:ring-2 focus:ring-[#B39977]/50 focus:border-[#B39977] transition-all duration-300"
                      placeholder="أدخل اسم المستخدم"
                      required
                    />
                  </div>
                </div>
                
                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-[#342519]">
                    كلمة المرور
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#B39977]/10 to-[#684F36]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="relative w-full px-4 py-3 bg-white/80 border border-[#B39977]/30 rounded-lg text-[#342519] placeholder-[#684F36]/50 focus:outline-none focus:ring-2 focus:ring-[#B39977]/50 focus:border-[#B39977] transition-all duration-300"
                      placeholder="أدخل كلمة المرور"
                      required
                    />
                  </div>
                </div>
                
                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 text-[#B39977] bg-white/80 border-[#B39977]/30 rounded focus:ring-[#B39977]/50 focus:ring-2"
                    />
                    <label htmlFor="remember" className="mr-2 text-sm text-[#684F36]/70">
                      تذكرني
                    </label>
                  </div>
                  <a href="#" className="text-sm text-[#B39977] hover:text-[#684F36] transition-colors duration-300">
                    نسيت كلمة المرور؟
                  </a>
                </div>
                
                {/* Error Message */}
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}
                
                {/* Submit Button */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B39977] to-[#684F36] rounded-lg blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="relative w-full bg-gradient-to-r from-[#B39977] to-[#684F36] hover:from-[#684F36] hover:to-[#342519] text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#B39977]/25 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        جاري تسجيل الدخول...
                      </span>
                    ) : (
                      'تسجيل الدخول'
                    )}
                  </button>
                </div>
                
                {/* Sign Up Link */}
                <div className="text-center">
                  <p className="text-sm text-[#684F36]/70">
                    ليس لديك حساب؟{' '}
                    <a href="#" className="text-[#B39977] hover:text-[#684F36] font-medium transition-colors duration-300">
                      إنشاء حساب جديد
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
          
          {/* Back to Home */}
          <div className="text-center mt-8">
            <a 
              href="/" 
              className="inline-flex items-center text-[#684F36]/70 hover:text-[#342519] transition-colors duration-300"
            >
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              العودة إلى الرئيسية
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
