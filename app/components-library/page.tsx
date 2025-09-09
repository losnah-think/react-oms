"use client";
import React, { useState } from "react";

// ---------- Types ----------
type Variant = {
  id: string;
  attrs: Record<string, string>;
  sku: string;
  price: number;
  purchasePrice: number;
  barcode: string[];
};

type Product = {
  id: string;
  name: string;
  supplierName?: string;
  category?: string;
  code: string;
  shippingPolicy?: string;
  createdAt: string;
  image?: string | null;
  salePrice: number;
  purchasePrice: number;
  supplyPrice: number;
  marginPrice: number;
  variants: Variant[];
  designer?: string;
  registrar?: string;
  stockManaged?: boolean;
};

// ---------- Sample Data ----------
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "P-1001",
    name: "프리미엄 코튼 티셔츠",
    supplierName: "공급처A",
    category: "상의 > 티셔츠",
    code: "CODE-1001",
    shippingPolicy: "기본",
    createdAt: "2025-09-08T10:00:00",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    salePrice: 29000,
    purchasePrice: 15000,
    supplyPrice: 20000,
    marginPrice: 9000,
    variants: [
      {
        id: "V-1001-1",
        attrs: { 기본옵션: "표준" },
        sku: "SKU-1001-1",
        price: 29000,
        purchasePrice: 15000,
        barcode: ["8801234567890"]
      }
    ],
    designer: "디자이너A",
    registrar: "등록자A",
    stockManaged: true
  },
  {
    id: "P-1002",
    name: "멀티 옵션 후드티",
    supplierName: "공급처B",
    category: "상의 > 후드티",
    code: "CODE-1002",
    shippingPolicy: "무료",
    createdAt: "2025-09-07T14:30:00",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    salePrice: 59000,
    purchasePrice: 30000,
    supplyPrice: 45000,
    marginPrice: 14000,
    variants: [
      {
        id: "V-1002-1",
        attrs: { 색상: "블랙", 사이즈: "S" },
        sku: "SKU-1002-1",
        price: 59000,
        purchasePrice: 30000,
        barcode: ["8801234567891"]
      },
      {
        id: "V-1002-2",
        attrs: { 색상: "블랙", 사이즈: "M" },
        sku: "SKU-1002-2",
        price: 59000,
        purchasePrice: 30000,
        barcode: ["8801234567892"]
      },
      {
        id: "V-1002-3",
        attrs: { 색상: "화이트", 사이즈: "S" },
        sku: "SKU-1002-3",
        price: 59000,
        purchasePrice: 30000,
        barcode: ["8801234567893"]
      },
      {
        id: "V-1002-4",
        attrs: { 색상: "화이트", 사이즈: "M" },
        sku: "SKU-1002-4",
        price: 59000,
        purchasePrice: 30000,
        barcode: ["8801234567894"]
      }
    ],
    designer: "디자이너B",
    registrar: "등록자B",
    stockManaged: false
  },
  {
    id: "P-1003",
    name: "클래식 데님 팬츠",
    supplierName: "공급처C",
    category: "하의 > 팬츠",
    code: "CODE-1003",
    shippingPolicy: "특수 포장",
    createdAt: "2025-09-06T09:15:00",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    salePrice: 89000,
    purchasePrice: 45000,
    supplyPrice: 65000,
    marginPrice: 24000,
    variants: [
      {
        id: "V-1003-1",
        attrs: { 색상: "네이비" },
        sku: "SKU-1003-1",
        price: 89000,
        purchasePrice: 45000,
        barcode: ["8801234567895", "8801234567896"]
      },
      {
        id: "V-1003-2",
        attrs: { 색상: "블랙" },
        sku: "SKU-1003-2",
        price: 89000,
        purchasePrice: 45000,
        barcode: ["8801234567897"]
      }
    ],
    designer: "디자이너C",
    registrar: "등록자C",
    stockManaged: true
  }
];

// ---------- Utility Functions ----------
const krw = (n: number) =>
  new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", maximumFractionDigits: 0 }).format(n);

// ---------- 1. Button Components ----------
const Button: React.FC<{
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent) => void;
  disabled?: boolean;
}> = ({ variant = 'primary', size = 'medium', children, onClick, disabled = false }) => {
  const variants = {
    primary: {
      className: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl',
      style: {
        boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        transform: 'perspective(200px) rotateX(2deg)',
      }
    },
    secondary: {
      className: 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 border border-gray-300 shadow-md hover:shadow-lg',
      style: {
        boxShadow: '0 4px 15px rgba(107, 114, 128, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
        transform: 'perspective(200px) rotateX(2deg)',
      }
    },
    danger: {
      className: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl',
      style: {
        boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        transform: 'perspective(200px) rotateX(2deg)',
      }
    },
    success: {
      className: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl',
      style: {
        boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        transform: 'perspective(200px) rotateX(2deg)',
      }
    }
  };
  
  const sizes = {
    small: 'px-3 py-2 text-xs',
    medium: 'px-6 py-3 text-sm',
    large: 'px-8 py-4 text-base'
  };

  const config = variants[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105 active:scale-95 ${config.className} ${sizes[size]} ${
        disabled ? 'opacity-50 cursor-not-allowed hover:scale-100 active:scale-100' : ''
      }`}
      style={disabled ? {} : config.style}
    >
      {children}
    </button>
  );
};

// ---------- 2. Icon Button Component ----------
const IconBtn: React.FC<{
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent) => void;
  disabled?: boolean;
  variant?: 'default' | 'primary' | 'danger';
  size?: 'small' | 'medium';
}> = ({ children, onClick, disabled = false, variant = 'default', size = 'medium' }) => {
  const variants = {
    default: {
      className: 'bg-gradient-to-r from-white to-gray-50 text-gray-600 border-2 border-gray-300 hover:from-gray-50 hover:to-gray-100 hover:border-gray-400',
      style: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        transform: 'perspective(100px) rotateX(3deg)',
      }
    },
    primary: {
      className: 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 border-2 border-blue-200 hover:from-blue-100 hover:to-blue-150 hover:border-blue-300',
      style: {
        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        transform: 'perspective(100px) rotateX(3deg)',
      }
    },
    danger: {
      className: 'bg-gradient-to-r from-red-50 to-red-100 text-red-600 border-2 border-red-200 hover:from-red-100 hover:to-red-150 hover:border-red-300',
      style: {
        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        transform: 'perspective(100px) rotateX(3deg)',
      }
    }
  };

  const sizes = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-2 text-sm'
  };

  const config = variants[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl shadow-md transition-all duration-200 hover:shadow-lg transform hover:scale-110 active:scale-95 font-bold ${config.className} ${sizes[size]} ${
        disabled ? 'opacity-50 cursor-not-allowed hover:scale-100 active:scale-100' : ''
      }`}
      style={disabled ? {} : config.style}
    >
      {children}
    </button>
  );
};

// ---------- 3. Checkbox Component ----------
const Checkbox: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  size?: 'small' | 'medium';
}> = ({ checked, onChange, label, size = 'medium' }) => {
  const sizes = {
    small: 'h-3 w-3',
    medium: 'h-4 w-4'
  };

  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <input 
        type="checkbox" 
        className={`accent-blue-500 transition-transform group-hover:scale-110 ${sizes[size]}`}
        checked={checked} 
        onChange={(e) => onChange(e.target.checked)} 
      />
      {label && <span className="text-sm text-gray-700 group-hover:text-gray-900">{label}</span>}
    </label>
  );
};

// ---------- 4. Input Field Component ----------
const InputField: React.FC<{
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'search';
  icon?: string;
  size?: 'small' | 'medium' | 'large';
}> = ({ label, placeholder, value, onChange, type = 'text', icon, size = 'medium' }) => {
  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-sm',
    large: 'px-4 py-3 text-base'
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <span className="text-gray-400">{icon}</span>
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 ${sizes[size]} ${
            icon ? 'pl-10' : ''
          }`}
        />
      </div>
    </div>
  );
};

// ---------- 5. Chip Component ----------
const Chip: React.FC<{
  label: string;
  selected: boolean;
  onToggle: () => void;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  size?: 'small' | 'medium';
}> = ({ label, selected, onToggle, color = 'blue', size = 'medium' }) => {
  const colors = {
    blue: selected 
      ? 'bg-blue-500 text-white border-blue-500 shadow-lg' 
      : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-50',
    green: selected 
      ? 'bg-green-500 text-white border-green-500 shadow-lg' 
      : 'bg-white text-green-600 border-green-200 hover:bg-green-50',
    purple: selected 
      ? 'bg-purple-500 text-white border-purple-500 shadow-lg' 
      : 'bg-white text-purple-600 border-purple-200 hover:bg-purple-50',
    orange: selected 
      ? 'bg-orange-500 text-white border-orange-500 shadow-lg' 
      : 'bg-white text-orange-600 border-orange-200 hover:bg-orange-50',
    red: selected 
      ? 'bg-red-500 text-white border-red-500 shadow-lg' 
      : 'bg-white text-red-600 border-red-200 hover:bg-red-50'
  };

  const sizes = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1.5 text-sm'
  };

  return (
    <button
      onClick={onToggle}
      className={`rounded-full font-medium border transition-all duration-200 transform hover:scale-105 ${colors[color]} ${sizes[size]}`}
    >
      {label}
    </button>
  );
};

// ---------- 6. Status Badge Component ----------
const StatusBadge: React.FC<{
  status: 'active' | 'inactive' | 'pending' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium';
}> = ({ status, size = 'medium' }) => {
  const statusConfig = {
    active: { 
      label: '활성', 
      className: 'bg-green-100 text-green-800 border-green-200',
      emoji: '✅'
    },
    inactive: { 
      label: '비활성', 
      className: 'bg-gray-100 text-gray-800 border-gray-200',
      emoji: '⭕'
    },
    pending: { 
      label: '대기', 
      className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      emoji: '⏳'
    },
    success: { 
      label: '완료', 
      className: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      emoji: '🎉'
    },
    warning: { 
      label: '경고', 
      className: 'bg-orange-100 text-orange-800 border-orange-200',
      emoji: '⚠️'
    },
    error: { 
      label: '오류', 
      className: 'bg-red-100 text-red-800 border-red-200',
      emoji: '❌'
    }
  };

  const sizes = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-2.5 py-1 text-xs'
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium border ${config.className} ${sizes[size]}`}>
      <span>{config.emoji}</span>
      {config.label}
    </span>
  );
};

// ---------- 3D 아이콘 컴포넌트들 ----------
const Icon3D: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 24, className = "" }) => (
  <div className={`relative ${className}`} style={{ width: size, height: size }}>
    <div
      className="w-full h-full rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg transform rotate-3 hover:rotate-6 transition-all duration-300 hover:scale-110"
      style={{
        background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
        boxShadow: '0 4px 8px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        transform: 'perspective(200px) rotateX(5deg) rotateY(5deg)',
      }}
    >
      <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
        📦
      </div>
    </div>
  </div>
);

const EditIcon3D: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 24, className = "" }) => (
  <div className={`relative ${className}`} style={{ width: size, height: size }}>
    <div
      className="w-full h-full rounded-lg bg-gradient-to-br from-green-400 to-green-600 shadow-lg transform rotate-3 hover:rotate-6 transition-all duration-300 hover:scale-110"
      style={{
        background: 'linear-gradient(135deg, #4ade80 0%, #16a34a 100%)',
        boxShadow: '0 4px 8px rgba(22, 163, 74, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        transform: 'perspective(200px) rotateX(5deg) rotateY(5deg)',
      }}
    >
      <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
        ✏️
      </div>
    </div>
  </div>
);

const CopyIcon3D: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 24, className = "" }) => (
  <div className={`relative ${className}`} style={{ width: size, height: size }}>
    <div
      className="w-full h-full rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg transform rotate-3 hover:rotate-6 transition-all duration-300 hover:scale-110"
      style={{
        background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
        boxShadow: '0 4px 8px rgba(124, 58, 237, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        transform: 'perspective(200px) rotateX(5deg) rotateY(5deg)',
      }}
    >
      <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
        📋
      </div>
    </div>
  </div>
);

const DeleteIcon3D: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 24, className = "" }) => (
  <div className={`relative ${className}`} style={{ width: size, height: size }}>
    <div
      className="w-full h-full rounded-lg bg-gradient-to-br from-red-400 to-red-600 shadow-lg transform rotate-3 hover:rotate-6 transition-all duration-300 hover:scale-110"
      style={{
        background: 'linear-gradient(135deg, #f87171 0%, #dc2626 100%)',
        boxShadow: '0 4px 8px rgba(220, 38, 38, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        transform: 'perspective(200px) rotateX(5deg) rotateY(5deg)',
      }}
    >
      <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
        🗑️
      </div>
    </div>
  </div>
);

const EmptyBox3D: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 120, className = "" }) => (
  <div className={`relative ${className}`} style={{ width: size, height: size }}>
    <div
      className="w-full h-full rounded-2xl bg-gradient-to-br from-gray-200 to-gray-400 shadow-xl transform hover:rotate-3 transition-all duration-500 hover:scale-105"
      style={{
        background: 'linear-gradient(135deg, #e5e7eb 0%, #9ca3af 100%)',
        boxShadow: '0 20px 40px rgba(156, 163, 175, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.3)',
        transform: 'perspective(400px) rotateX(10deg) rotateY(10deg)',
      }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">
        <div className="text-4xl mb-2">📦</div>
        <div className="text-sm font-medium">이미지 없음</div>
      </div>
    </div>
  </div>
);

// ---------- 7. Product Card Component (Full Featured) ----------
const ProductCard: React.FC<{
  product: Product;
  selected?: boolean;
  onToggleSelect?: (checked: boolean) => void;
  showActions?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}> = ({ product, selected = false, onToggleSelect, showActions = true, variant = 'detailed' }) => {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hasMulti = product.variants.length > 1;
  const firstV = product.variants[0];

  return (
    <div
      className={`group border rounded-3xl bg-gradient-to-br from-white to-gray-50 shadow-lg transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1 ${
        isHovered ? 'shadow-2xl scale-[1.002] border-blue-300 bg-gradient-to-br from-blue-50 to-white' : 'hover:shadow-xl border-gray-200'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => alert(`상품 클릭: ${product.name}`)}
    >
      {/* 24그리드 시스템 기반 1열 레이아웃 */}
      <div className="grid grid-cols-24 gap-6 p-8">
        {/* 체크박스 - 1칸 */}
        {onToggleSelect && (
          <div className="col-span-1 flex items-start pt-2" onClick={(e) => e.stopPropagation()}>
            <Checkbox checked={selected} onChange={onToggleSelect} />
          </div>
        )}

        {/* 이미지 - 4칸 */}
        <div className={`${onToggleSelect ? 'col-span-4' : 'col-span-5'} rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-200 transition-all duration-300 ${
          isHovered ? 'scale-105 border-blue-300 shadow-xl' : ''
        } ${variant === 'compact' ? 'h-20' : 'h-36'} aspect-square relative`}>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className={`object-cover w-full h-full transition-transform duration-500 ${
                isHovered ? 'scale-110' : ''
              }`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <EmptyBox3D size={variant === 'compact' ? 60 : 100} />
            </div>
          )}
          
          {/* 3D 오버레이 배지 */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <div
              className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-200"
              style={{
                boxShadow: '0 4px 12px rgba(249, 115, 22, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                transform: 'perspective(100px) rotateX(5deg) rotateY(5deg) rotate(-3deg)',
              }}
            >
              HOT
            </div>
          </div>
        </div>

        {/* 상품 정보 - 12칸 */}
        <div className={`${onToggleSelect ? 'col-span-12' : 'col-span-11'} min-w-0 flex flex-col justify-center`}>
          <div className={`font-bold text-gray-900 mb-3 transition-colors duration-200 ${
            isHovered ? 'text-blue-600' : ''
          } ${variant === 'compact' ? 'text-lg' : 'text-2xl'}`}>
            {product.name}
          </div>
          
          {variant !== 'compact' && (
            <div className="space-y-3">
              {/* 상품 기본 정보 - 한 줄로 배치 */}
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-500">상품코드</span>
                  <span className="font-mono bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm border">{product.code}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-500">분류</span>
                  <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-blue-200">{product.category || "미분류"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-500">배송정책</span>
                  <span className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg text-xs font-semibold border border-purple-200">{product.shippingPolicy || "기본"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-500">등록일</span>
                  <span className="text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg text-xs font-medium border">{new Date(product.createdAt).toLocaleDateString("ko-KR")}</span>
                </div>
              </div>

              {/* 3D 스타일 태그들 */}
              <div className="flex items-center gap-3 mt-4">
                <div className="relative">
                  <div
                    className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                    style={{
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                      transform: 'perspective(100px) rotateX(3deg) rotateY(3deg)',
                    }}
                  >
                    옵션 {product.variants.length}개
                  </div>
                </div>
                {firstV?.barcode?.length ? (
                  <div className="relative">
                    <div
                      className="bg-gradient-to-r from-purple-400 to-purple-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                      style={{
                        boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                        transform: 'perspective(100px) rotateX(3deg) rotateY(-3deg)',
                      }}
                    >
                      바코드 {firstV.barcode.length}개
                    </div>
                  </div>
                ) : null}
                <div className="relative">
                  <div
                    className={`text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg transform hover:scale-105 transition-all duration-200 ${
                      product.stockManaged 
                        ? 'bg-gradient-to-r from-blue-400 to-blue-600' 
                        : 'bg-gradient-to-r from-gray-400 to-gray-600'
                    }`}
                    style={{
                      boxShadow: product.stockManaged 
                        ? '0 4px 12px rgba(59, 130, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                        : '0 4px 12px rgba(107, 114, 128, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                      transform: 'perspective(100px) rotateX(3deg) rotateY(3deg)',
                    }}
                  >
                    {product.stockManaged ? '재고관리' : '재고미관리'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 가격 정보 - 5칸 */}
        <div className={`${onToggleSelect ? 'col-span-5' : 'col-span-6'} flex flex-col justify-center items-end`}>
          <div className="text-right space-y-3">
            {/* 판매가 - 3D 강조 */}
            <div className="text-right">
              <div className="text-sm text-gray-500 font-medium mb-2">판매가</div>
              <div
                className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-200 ${
                  isHovered ? 'scale-110 from-blue-700 to-purple-700' : ''
                } ${variant === 'compact' ? 'text-xl' : 'text-3xl'}`}
                style={{
                  textShadow: '0 2px 4px rgba(59, 130, 246, 0.3)',
                }}
              >
                {krw(product.salePrice)}
              </div>
            </div>
            
            {/* 기타 가격 정보 - 3D 카드 스타일 */}
            {variant !== 'compact' && (
              <div className="space-y-2 text-xs">
                <div 
                  className="bg-gradient-to-r from-gray-50 to-white p-3 rounded-xl border shadow-sm"
                  style={{
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                  }}
                >
                  <div className="flex justify-between gap-4 mb-1">
                    <span className="text-gray-500 font-medium">원가</span>
                    <span className="font-semibold">{krw(product.purchasePrice)}</span>
                  </div>
                  <div className="flex justify-between gap-4 mb-2">
                    <span className="text-gray-500 font-medium">공급가</span>
                    <span className="font-semibold">{krw(product.supplyPrice)}</span>
                  </div>
                  <div className="flex justify-between gap-4 border-t pt-2">
                    <span className="text-gray-500 font-medium">마진</span>
                    <span className="font-bold text-green-600">{krw(product.marginPrice)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 액션 버튼들 - 2칸 */}
        {showActions && (
          <div className="col-span-2 flex flex-col items-center justify-center gap-3">
            <div className={`flex flex-col gap-3 transition-all duration-300 ${
              isHovered ? 'opacity-100 transform translate-x-0 scale-105' : 'opacity-80'
            }`}>
              <button 
                onClick={(e) => {e?.stopPropagation(); alert(`수정: ${product.id}`);}}
                className="p-0 border-none bg-transparent"
              >
                <EditIcon3D size={28} />
              </button>
              <button 
                onClick={(e) => {e?.stopPropagation(); alert(`복사: ${product.id}`);}}
                className="p-0 border-none bg-transparent"
              >
                <CopyIcon3D size={28} />
              </button>
              <button 
                onClick={(e) => {e?.stopPropagation(); alert(`삭제: ${product.id}`);}}
                className="p-0 border-none bg-transparent"
              >
                <DeleteIcon3D size={28} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Single variant summary - 전체 너비로 확장 */}
      {!hasMulti && variant !== 'compact' && (
        <div className={`mx-8 mb-6 rounded-2xl border-2 p-6 transition-all duration-300 ${
          isHovered ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300 shadow-lg' : 'bg-gradient-to-r from-gray-50 to-white border-gray-200 shadow-sm'
        }`}
        style={{
          boxShadow: isHovered 
            ? '0 8px 25px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
            : '0 4px 12px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
        }}>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-gray-700">
            {firstV.attrs["기본옵션"] ? (
              <>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-600">옵션</span>
                  <div
                    className="bg-gradient-to-r from-white to-gray-50 px-4 py-2 rounded-full border-2 border-gray-200 shadow-sm font-medium"
                    style={{
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    {firstV.attrs["기본옵션"]}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-600">SKU</span>
                  <div
                    className="font-mono bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 rounded-full border-2 border-blue-200 shadow-sm font-medium text-blue-800"
                    style={{
                      boxShadow: '0 2px 4px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    {firstV.sku}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-600">바코드</span>
                  <div
                    className="font-mono bg-gradient-to-r from-green-50 to-green-100 px-4 py-2 rounded-full border-2 border-green-200 shadow-sm font-medium text-green-800"
                    style={{
                      boxShadow: '0 2px 4px rgba(16, 185, 129, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    {firstV.barcode.join(", ") || "-"}
                  </div>
                </div>
              </>
            ) : (
              <>
                {Object.entries(firstV.attrs).map(([k, v]) => (
                  <div key={k} className="flex items-center gap-3">
                    <span className="font-semibold text-gray-600">{k}</span>
                    <div
                      className="bg-gradient-to-r from-white to-gray-50 px-4 py-2 rounded-full border-2 border-gray-200 shadow-sm font-medium"
                      style={{
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                      }}
                    >
                      {String(v)}
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-600">SKU</span>
                  <div
                    className="font-mono bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 rounded-full border-2 border-blue-200 shadow-sm font-medium text-blue-800"
                    style={{
                      boxShadow: '0 2px 4px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    {firstV.sku}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-600">바코드</span>
                  <div
                    className="font-mono bg-gradient-to-r from-green-50 to-green-100 px-4 py-2 rounded-full border-2 border-green-200 shadow-sm font-medium text-green-800"
                    style={{
                      boxShadow: '0 2px 4px rgba(16, 185, 129, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    {firstV.barcode.join(", ") || "-"}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Multi variants table - 접기/펼치기 기능 */}
      {hasMulti && variant !== 'compact' && (
        <div className="mx-8 mb-6">
          <Button
            variant="secondary"
            size="small"
            onClick={(e) => {e?.stopPropagation(); setExpanded((v) => !v);}}
          >
            {expanded ? "📋 옵션 접기" : "📋 옵션 펼치기"} ({product.variants.length}개)
          </Button>

          {/* 애니메이션과 함께 테이블 표시 */}
          <div className={`mt-4 overflow-hidden transition-all duration-500 ease-in-out ${
            expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div 
              className="rounded-2xl border-2 border-gray-200 shadow-xl bg-gradient-to-br from-white to-gray-50 overflow-hidden"
              style={{
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
              }}
            >
              <table className="w-full text-sm">
                <thead 
                  className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-b border-gray-300"
                  style={{
                    background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 1px 0 rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <tr>
                    <th className="py-4 pl-6 pr-3 text-left font-bold">#</th>
                    {Object.keys(product.variants[0].attrs).map((k) => (
                      <th key={k} className="py-4 px-4 text-left font-bold">{k}</th>
                    ))}
                    <th className="py-4 px-4 text-left font-bold">SKU</th>
                    <th className="py-4 px-4 text-right font-bold">가격</th>
                    <th className="py-4 px-4 text-left font-bold">바코드</th>
                    <th className="py-4 pr-6 pl-3 text-right font-bold">액션</th>
                  </tr>
                </thead>
                <tbody>
                  {product.variants.map((v, i) => (
                    <tr key={v.id} className="border-t border-gray-200/50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200">
                      <td className="py-4 pl-6 pr-3 text-gray-600 font-bold text-lg">{i + 1}</td>
                      {Object.values(v.attrs).map((val, idx) => (
                        <td key={idx} className="py-4 px-4">
                          <div
                            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg transform hover:scale-105 transition-transform duration-200"
                            style={{
                              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                            }}
                          >
                            {String(val)}
                          </div>
                        </td>
                      ))}
                      <td className="py-4 px-4">
                        <div
                          className="font-mono text-xs bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-2 rounded-lg border font-semibold text-gray-700"
                          style={{
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                          }}
                        >
                          {v.sku}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span 
                          className="font-bold text-lg bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
                          style={{ textShadow: '0 1px 2px rgba(16, 185, 129, 0.3)' }}
                        >
                          {krw(v.price)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-600 font-medium">{(v.barcode || []).slice(0, 2).join(", ") || "-"}</td>
                      <td className="py-4 pr-6 pl-3 text-right">
                        <button
                          onClick={(e) => {e?.stopPropagation(); alert(`옵션 수정: ${v.id}`);}}
                          className="p-0 border-none bg-transparent"
                        >
                          <EditIcon3D size={24} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ---------- 8. Pagination Component ----------
const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  size?: 'small' | 'medium' | 'large';
}> = ({ currentPage, totalPages, onPageChange, size = 'medium' }) => {
  const maxVisiblePages = 5;
  const startPage = Math.max(1, Math.min(totalPages - maxVisiblePages + 1, currentPage - 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const sizes = {
    small: 'w-8 h-8 text-xs',
    medium: 'w-10 h-10 text-sm',
    large: 'w-12 h-12 text-base'
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="secondary"
        size={size === 'large' ? 'large' : size === 'small' ? 'small' : 'medium'}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        ← 이전
      </Button>
      
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
        const pageNum = startPage + i;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${sizes[size]} ${
              pageNum === currentPage
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {pageNum}
          </button>
        );
      })}
      
      <Button
        variant="secondary"
        size={size === 'large' ? 'large' : size === 'small' ? 'small' : 'medium'}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        다음 →
      </Button>
    </div>
  );
};

// ---------- Main Component Library Page ----------
const ComponentsLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkboxStates, setCheckboxStates] = useState<Record<string, boolean>>({});
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const tags = ["세일", "신상품", "베스트", "추천", "한정판"];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const toggleCheckbox = (id: string) => {
    setCheckboxStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleProductSelection = (productId: string, selected: boolean) => {
    if (selected) {
      setSelectedProducts(prev => [...prev, productId]);
    } else {
      setSelectedProducts(prev => prev.filter(id => id !== productId));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div 
          className="text-center bg-gradient-to-br from-white via-blue-50 to-purple-100 rounded-3xl p-10 shadow-2xl border-2 border-gray-200/50 relative overflow-hidden"
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
            background: 'linear-gradient(135deg, #ffffff 0%, #eff6ff 50%, #f3e8ff 100%)',
          }}
        >
          {/* 3D 배경 요소들 */}
          <div className="absolute top-4 right-4">
            <div
              className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl opacity-20 transform rotate-12"
              style={{
                transform: 'perspective(200px) rotateX(20deg) rotateY(20deg) rotate(12deg)',
                boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)',
              }}
            ></div>
          </div>
          <div className="absolute bottom-4 left-4">
            <div
              className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl opacity-20 transform -rotate-12"
              style={{
                transform: 'perspective(200px) rotateX(-20deg) rotateY(-20deg) rotate(-12deg)',
                boxShadow: '0 8px 20px rgba(34, 197, 94, 0.3)',
              }}
            ></div>
          </div>

          <div className="relative z-10">
            <h1 
              className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6 transform hover:scale-105 transition-transform duration-300"
              style={{
                textShadow: '0 4px 8px rgba(59, 130, 246, 0.3)',
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              🎨 디자인 시스템
            </h1>
            <p 
              className="text-xl text-gray-700 max-w-3xl mx-auto font-medium leading-relaxed mb-4"
              style={{
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
            >
              체계적이고 일관된 사용자 경험을 위한 UI 컴포넌트 라이브러리입니다.<br/>
              재사용 가능한 컴포넌트, 디자인 토큰, 아이콘 시스템을 제공합니다.
            </p>
          </div>
        </div>

        {/* 1. Typography System */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">1. 타이포그래피 시스템</h2>
          
          <div className="space-y-8">
            {/* Font Family */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">폰트 패밀리: Pretendard</h3>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-base text-gray-600 mb-4">한국어와 영어 모두에 최적화된 가독성 높은 폰트</p>
                <div className="grid gap-4">
                  <div style={{ fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif' }}>
                    <span className="text-sm text-gray-500">Pretendard Regular</span>
                    <p className="text-lg">안녕하세요! Hello, World! 0123456789</p>
                  </div>
                  <div style={{ fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 600 }}>
                    <span className="text-sm text-gray-500">Pretendard SemiBold</span>
                    <p className="text-lg font-semibold">안녕하세요! Hello, World! 0123456789</p>
                  </div>
                  <div style={{ fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 700 }}>
                    <span className="text-sm text-gray-500">Pretendard Bold</span>
                    <p className="text-lg font-bold">안녕하세요! Hello, World! 0123456789</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Font Sizes */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">폰트 크기 가이드 (최소 14px)</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg">
                  <span className="text-xs text-gray-500 w-16">text-xs</span>
                  <span className="text-gray-400 w-12">12px</span>
                  <span className="text-xs text-red-500">❌ 사용 금지</span>
                </div>
                <div className="flex items-center gap-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-sm text-gray-500 w-16">text-sm</span>
                  <span className="text-gray-600 w-12">14px</span>
                  <span className="text-sm">최소 크기 - 보조 정보, 캡션</span>
                </div>
                <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg">
                  <span className="text-base text-gray-500 w-16">text-base</span>
                  <span className="text-gray-600 w-12">16px</span>
                  <span className="text-base">기본 크기 - 본문 텍스트, 버튼</span>
                </div>
                <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg">
                  <span className="text-lg text-gray-500 w-16">text-lg</span>
                  <span className="text-gray-600 w-12">18px</span>
                  <span className="text-lg">중간 크기 - 소제목, 중요 정보</span>
                </div>
                <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg">
                  <span className="text-xl text-gray-500 w-16">text-xl</span>
                  <span className="text-gray-600 w-12">20px</span>
                  <span className="text-xl">큰 크기 - 페이지 제목</span>
                </div>
                <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-lg">
                  <span className="text-2xl text-gray-500 w-16">text-2xl</span>
                  <span className="text-gray-600 w-12">24px</span>
                  <span className="text-2xl">헤딩 - 섹션 제목</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Color System */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">2. 컬러 시스템</h2>
          
          <div className="space-y-8">
            {/* Primary Colors */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Primary Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { name: 'blue-50', color: '#eff6ff', text: 'dark' },
                  { name: 'blue-100', color: '#dbeafe', text: 'dark' },
                  { name: 'blue-500', color: '#3b82f6', text: 'light' },
                  { name: 'blue-600', color: '#2563eb', text: 'light' },
                  { name: 'blue-700', color: '#1d4ed8', text: 'light' },
                ].map((item) => (
                  <div key={item.name} className="text-center">
                    <div 
                      className="w-full h-20 rounded-lg shadow-md mb-2 flex items-center justify-center text-sm font-mono"
                      style={{ 
                        backgroundColor: item.color,
                        color: item.text === 'light' ? 'white' : '#374151'
                      }}
                    >
                      {item.color}
                    </div>
                    <p className="text-sm font-medium text-gray-600">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gray Scale */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Gray Scale</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {[
                  { name: 'gray-50', color: '#f9fafb', text: 'dark' },
                  { name: 'gray-100', color: '#f3f4f6', text: 'dark' },
                  { name: 'gray-300', color: '#d1d5db', text: 'dark' },
                  { name: 'gray-500', color: '#6b7280', text: 'light' },
                  { name: 'gray-700', color: '#374151', text: 'light' },
                  { name: 'gray-900', color: '#111827', text: 'light' },
                ].map((item) => (
                  <div key={item.name} className="text-center">
                    <div 
                      className="w-full h-16 rounded-lg shadow-md mb-2 flex items-center justify-center text-xs font-mono"
                      style={{ 
                        backgroundColor: item.color,
                        color: item.text === 'light' ? 'white' : '#374151'
                      }}
                    >
                      {item.color}
                    </div>
                    <p className="text-sm font-medium text-gray-600">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Semantic Colors */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Semantic Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Success', color: '#10b981', usage: '성공, 완료, 승인' },
                  { name: 'Warning', color: '#f59e0b', usage: '주의, 대기, 알림' },
                  { name: 'Error', color: '#ef4444', usage: '오류, 거부, 삭제' },
                  { name: 'Info', color: '#3b82f6', usage: '정보, 링크, 액션' },
                ].map((item) => (
                  <div key={item.name} className="text-center bg-gray-50 rounded-lg p-4">
                    <div 
                      className="w-full h-16 rounded-lg shadow-md mb-3 flex items-center justify-center text-white text-xs font-mono"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.color}
                    </div>
                    <p className="text-sm font-bold text-gray-800 mb-1">{item.name}</p>
                    <p className="text-xs text-gray-600">{item.usage}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Icon System */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">3. 아이콘 시스템</h2>
          
          <div className="space-y-8">
            {/* Icon Style Guide */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">아이콘 스타일 가이드</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="font-semibold text-blue-900 mb-3">📏 크기 규격</h4>
                  <ul className="text-sm text-blue-700 space-y-2">
                    <li>• 16px: 작은 버튼, 인라인 아이콘</li>
                    <li>• 20px: 기본 크기, 메뉴 아이콘</li>
                    <li>• 24px: 헤더, 중요 액션</li>
                    <li>• 32px: 대형 아이콘, 일러스트</li>
                  </ul>
                </div>
                <div className="bg-purple-50 rounded-xl p-6">
                  <h4 className="font-semibold text-purple-900 mb-3">🎨 스타일 원칙</h4>
                  <ul className="text-sm text-purple-700 space-y-2">
                    <li>• 2px 스트로크 두께</li>
                    <li>• 둥근 모서리 (rounded)</li>
                    <li>• 24x24 그리드 기준</li>
                    <li>• 일관된 optical weight</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Icon Library Preview */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">주요 아이콘 라이브러리</h3>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
                  {[
                    { icon: '🏠', name: 'Home' },
                    { icon: '📦', name: 'Products' }, 
                    { icon: '🏪', name: 'Store' },
                    { icon: '👤', name: 'User' },
                    { icon: '⚙️', name: 'Settings' },
                    { icon: '🔍', name: 'Search' },
                    { icon: '🔔', name: 'Bell' },
                    { icon: '📊', name: 'Chart' },
                    { icon: '✏️', name: 'Edit' },
                    { icon: '🗑️', name: 'Delete' },
                    { icon: '💾', name: 'Save' },
                    { icon: '📥', name: 'Download' },
                    { icon: '📤', name: 'Upload' },
                    { icon: '➕', name: 'Add' },
                    { icon: '❌', name: 'Close' },
                    { icon: '✅', name: 'Check' },
                  ].map((item, index) => (
                    <div key={index} className="text-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <p className="text-xs text-gray-600 font-medium">{item.name}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>실제 프로젝트에서는</strong> Lucide React, Heroicons, 또는 커스텀 SVG 아이콘을 사용합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Layout System */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">4. 레이아웃 시스템</h2>
          
          <div className="space-y-8">
            {/* Grid System */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">그리드 시스템</h3>
              <div className="space-y-4">
                {/* 12 Column Grid Visual */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="font-semibold text-blue-900 mb-4">12-Column Grid</h4>
                  <div className="grid grid-cols-12 gap-2 mb-4">
                    {Array.from({ length: 12 }, (_, i) => (
                      <div key={i} className="bg-blue-200 text-blue-800 text-xs text-center py-2 rounded font-mono">
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-6 bg-blue-300 text-blue-900 text-sm text-center py-3 rounded font-semibold">6 columns</div>
                      <div className="col-span-6 bg-blue-300 text-blue-900 text-sm text-center py-3 rounded font-semibold">6 columns</div>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-4 bg-blue-300 text-blue-900 text-sm text-center py-3 rounded font-semibold">4 cols</div>
                      <div className="col-span-4 bg-blue-300 text-blue-900 text-sm text-center py-3 rounded font-semibold">4 cols</div>
                      <div className="col-span-4 bg-blue-300 text-blue-900 text-sm text-center py-3 rounded font-semibold">4 cols</div>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-3 bg-blue-300 text-blue-900 text-sm text-center py-3 rounded font-semibold">3</div>
                      <div className="col-span-9 bg-blue-300 text-blue-900 text-sm text-center py-3 rounded font-semibold">9 columns</div>
                    </div>
                  </div>
                </div>

                {/* Layout Components */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">🖥️ 기본 레이아웃</h4>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="space-y-2">
                        <div className="h-8 bg-blue-100 rounded text-xs flex items-center justify-center text-blue-700 font-medium">Header</div>
                        <div className="flex gap-2">
                          <div className="w-16 h-20 bg-purple-100 rounded text-xs flex items-center justify-center text-purple-700 font-medium">Sidebar</div>
                          <div className="flex-1 h-20 bg-gray-100 rounded text-xs flex items-center justify-center text-gray-700 font-medium">Main Content</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">📱 카드 레이아웃</h4>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="h-12 bg-green-100 rounded text-xs flex items-center justify-center text-green-700 font-medium">Card 1</div>
                        <div className="h-12 bg-green-100 rounded text-xs flex items-center justify-center text-green-700 font-medium">Card 2</div>
                        <div className="h-12 bg-green-100 rounded text-xs flex items-center justify-center text-green-700 font-medium">Card 3</div>
                        <div className="h-12 bg-green-100 rounded text-xs flex items-center justify-center text-green-700 font-medium">Card 4</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Spacing System */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">간격 시스템</h3>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="space-y-4">
                  {[
                    { size: '4px', class: 'space-1', usage: '최소 간격' },
                    { size: '8px', class: 'space-2', usage: '요소 내부 간격' },
                    { size: '16px', class: 'space-4', usage: '기본 간격' },
                    { size: '24px', class: 'space-6', usage: '섹션 간격' },
                    { size: '32px', class: 'space-8', usage: '큰 섹션 간격' },
                    { size: '48px', class: 'space-12', usage: '페이지 구분' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-16 text-sm text-gray-600 font-mono">{item.size}</div>
                      <div className="w-24 text-sm text-blue-600 font-mono">{item.class}</div>
                      <div 
                        className="bg-blue-500 rounded"
                        style={{ width: item.size, height: '8px' }}
                      ></div>
                      <div className="text-sm text-gray-600">{item.usage}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Button Components */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">5. 버튼 컴포넌트</h2>
          <div className="space-y-6">
            
            {/* Sizes */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-700">크기별 버튼</h3>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary" size="small">Small Button</Button>
                <Button variant="primary" size="medium">Medium Button</Button>
                <Button variant="primary" size="large">Large Button</Button>
              </div>
            </div>

            {/* Variants */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-700">스타일별 버튼</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="medium">Primary</Button>
                <Button variant="secondary" size="medium">Secondary</Button>
                <Button variant="danger" size="medium">Danger</Button>
                <Button variant="success" size="medium">Success</Button>
                <Button variant="primary" size="medium" disabled>Disabled</Button>
              </div>
            </div>

            {/* Icon Buttons */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-700">아이콘 버튼</h3>
              <div className="flex flex-wrap gap-4">
                <IconBtn variant="default" size="medium">📝</IconBtn>
                <IconBtn variant="primary" size="medium">📋</IconBtn>
                <IconBtn variant="danger" size="medium">🗑️</IconBtn>
                <IconBtn variant="default" size="small">⚙️</IconBtn>
                <IconBtn variant="primary" size="small">➕</IconBtn>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Form Components */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">6. 폼 컴포넌트</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Input Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">입력 필드</h3>
              <InputField
                label="기본 입력"
                placeholder="텍스트를 입력하세요"
                value={searchQuery}
                onChange={setSearchQuery}
              />
              <InputField
                label="검색 필드"
                placeholder="검색어를 입력하세요"
                value=""
                onChange={() => {}}
                type="search"
                icon="🔍"
                size="large"
              />
              <InputField
                label="이메일"
                placeholder="email@example.com"
                value=""
                onChange={() => {}}
                type="email"
                icon="✉️"
                size="small"
              />
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">체크박스</h3>
              <div className="space-y-3">
                <Checkbox
                  label="기본 체크박스"
                  checked={checkboxStates.basic || false}
                  onChange={() => toggleCheckbox('basic')}
                />
                <Checkbox
                  label="작은 체크박스"
                  checked={checkboxStates.small || false}
                  onChange={() => toggleCheckbox('small')}
                  size="small"
                />
                <Checkbox
                  checked={checkboxStates.noLabel || false}
                  onChange={() => toggleCheckbox('noLabel')}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Tags and Badges */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">7. 태그 & 배지</h2>
          
          {/* Chips */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">선택 가능한 칩</h3>
            <div className="flex flex-wrap gap-3">
              {tags.map(tag => (
                <Chip
                  key={tag}
                  label={tag}
                  selected={selectedTags.includes(tag)}
                  onToggle={() => toggleTag(tag)}
                  color={['blue', 'green', 'purple', 'orange', 'red'][tags.indexOf(tag) % 5] as any}
                />
              ))}
            </div>
            <div className="mt-3 text-sm text-gray-600">
              선택된 태그: {selectedTags.join(', ') || '없음'}
            </div>
          </div>

          {/* Status Badges */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">상태 배지</h3>
            <div className="flex flex-wrap gap-3">
              <StatusBadge status="active" />
              <StatusBadge status="inactive" />
              <StatusBadge status="pending" />
              <StatusBadge status="success" />
              <StatusBadge status="warning" />
              <StatusBadge status="error" />
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2 text-gray-600">작은 크기</h4>
              <div className="flex flex-wrap gap-2">
                <StatusBadge status="active" size="small" />
                <StatusBadge status="pending" size="small" />
                <StatusBadge status="error" size="small" />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Product Cards */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">8. 상품 카드 (옵션 테이블 포함)</h2>
          
          <div className="space-y-8">
            
            {/* Card Variants */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">카드 형태별</h3>
              
              {/* Detailed Card */}
              <div className="mb-6">
                <h4 className="text-md font-medium mb-3 text-gray-600">상세형 카드 (옵션 펼침/접기 포함)</h4>
                <ProductCard
                  product={SAMPLE_PRODUCTS[1]} // 멀티 옵션 상품
                  selected={selectedProducts.includes(SAMPLE_PRODUCTS[1].id)}
                  onToggleSelect={(selected) => toggleProductSelection(SAMPLE_PRODUCTS[1].id, selected)}
                  variant="detailed"
                />
              </div>

              {/* Default Card */}
              <div className="mb-6">
                <h4 className="text-md font-medium mb-3 text-gray-600">기본형 카드</h4>
                <ProductCard
                  product={SAMPLE_PRODUCTS[0]} // 단일 옵션 상품
                  selected={selectedProducts.includes(SAMPLE_PRODUCTS[0].id)}
                  onToggleSelect={(selected) => toggleProductSelection(SAMPLE_PRODUCTS[0].id, selected)}
                  variant="default"
                />
              </div>

              {/* Compact Card */}
              <div className="mb-6">
                <h4 className="text-md font-medium mb-3 text-gray-600">컴팩트형 카드</h4>
                <ProductCard
                  product={SAMPLE_PRODUCTS[2]}
                  variant="compact"
                  showActions={false}
                />
              </div>
            </div>

            {/* Multiple Cards Grid */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">카드 그리드 레이아웃 (1열 - 24그리드 시스템)</h3>
              <div className="space-y-4">
                {SAMPLE_PRODUCTS.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    selected={selectedProducts.includes(product.id)}
                    onToggleSelect={(selected) => toggleProductSelection(product.id, selected)}
                    variant="detailed"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Pagination */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">9. 페이지네이션</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">크기별 페이지네이션</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium mb-3 text-gray-600">Small</h4>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={10}
                    onPageChange={setCurrentPage}
                    size="small"
                  />
                </div>
                
                <div>
                  <h4 className="text-md font-medium mb-3 text-gray-600">Medium</h4>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={10}
                    onPageChange={setCurrentPage}
                    size="medium"
                  />
                </div>
                
                <div>
                  <h4 className="text-md font-medium mb-3 text-gray-600">Large</h4>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={10}
                    onPageChange={setCurrentPage}
                    size="large"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Layout Guidelines */}
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-6">📐 레이아웃 가이드라인</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <h3 className="font-semibold mb-2">🎯 간격 체계</h3>
              <ul className="text-sm space-y-1 opacity-90">
                <li>• 컴포넌트 간: 16px-24px</li>
                <li>• 섹션 간: 32px-48px</li>
                <li>• 페이지 여백: 32px</li>
                <li>• 카드 내부: 24px</li>
              </ul>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <h3 className="font-semibold mb-2">🎨 색상 시스템</h3>
              <ul className="text-sm space-y-1 opacity-90">
                <li>• Primary: Blue 500-600</li>
                <li>• Secondary: Gray 100-200</li>
                <li>• Success: Green 500-600</li>
                <li>• Danger: Red 500-600</li>
              </ul>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <h3 className="font-semibold mb-2">📱 그리드 시스템</h3>
              <ul className="text-sm space-y-1 opacity-90">
                <li>• 24그리드 시스템</li>
                <li>• 상품카드: 1열 레이아웃</li>
                <li>• 체크박스: 1칸</li>
                <li>• 이미지: 4-5칸</li>
                <li>• 정보: 11-12칸</li>
                <li>• 가격: 5-6칸</li>
                <li>• 액션: 2칸</li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <h3 className="font-semibold mb-2">💰 가격 디자인</h3>
              <ul className="text-sm space-y-1 opacity-90">
                <li>• 판매가: 2xl, 파란색, 굵게</li>
                <li>• 우측 정렬</li>
                <li>• 호버시 확대 효과</li>
                <li>• 원가/공급가: 작은 글씨</li>
                <li>• 마진: 초록색 강조</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Component Props Reference */}
        <section className="bg-gray-900 rounded-2xl p-8 text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-6">⚙️ 컴포넌트 Props 참조</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-400">Button Props</h3>
              <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
                <div className="text-green-300">variant:</div>
                <div className="text-gray-300 ml-4">'primary' | 'secondary' | 'danger' | 'success'</div>
                <div className="text-green-300 mt-2">size:</div>
                <div className="text-gray-300 ml-4">'small' | 'medium' | 'large'</div>
                <div className="text-green-300 mt-2">disabled:</div>
                <div className="text-gray-300 ml-4">boolean</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-400">ProductCard Props</h3>
              <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
                <div className="text-blue-300">variant:</div>
                <div className="text-gray-300 ml-4">'default' | 'compact' | 'detailed'</div>
                <div className="text-blue-300 mt-2">showActions:</div>
                <div className="text-gray-300 ml-4">boolean</div>
                <div className="text-blue-300 mt-2">selected:</div>
                <div className="text-gray-300 ml-4">boolean</div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ComponentsLibrary;