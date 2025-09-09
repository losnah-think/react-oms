"use client";
import React, { useState } from "react";

// ---------- Notice Banner ----------
const NoticeBanner = () => (
  <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 mb-8">
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 mt-0.5">
        <div className="w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center">
          <span className="text-amber-800 text-xs font-bold">!</span>
        </div>
      </div>
      <div>
        <h3 className="text-amber-800 font-semibold mb-1">📋 시스템 안내</h3>
        <p className="text-amber-700 text-sm leading-relaxed">
          현재 기획/디자인 시스템은 <strong>개발 진행 중</strong>이며, 사용자 피드백에 따라 <strong className="text-amber-800">언제든 변경될 수 있습니다.</strong><br/>
          최종 구현 시에는 현재 보여지는 디자인과 기능이 달라질 수 있으니 참고해 주시기 바랍니다.
        </p>
      </div>
    </div>
  </div>
);

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
  size?: 'small' | 'medium';
}> = ({ currentPage, totalPages, onPageChange, size = 'medium' }) => {
  const maxVisiblePages = 7; // 더 많은 페이지 표시
  const startPage = Math.max(1, Math.min(totalPages - maxVisiblePages + 1, currentPage - 3));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const sizes = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-10 h-10 text-sm'
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="secondary"
        size={size === 'small' ? 'small' : 'medium'}
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
        size={size === 'small' ? 'small' : 'medium'}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        다음 →
      </Button>
    </div>
  );
};

// ---------- 9. Toggle Component ----------
const Toggle: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  label?: string;
}> = ({ checked, onChange, disabled = false, size = 'medium', label }) => {
  const sizes = {
    small: { toggle: 'w-10 h-6', thumb: 'w-4 h-4', translate: 'translate-x-4' },
    medium: { toggle: 'w-12 h-7', thumb: 'w-5 h-5', translate: 'translate-x-5' },
    large: { toggle: 'w-14 h-8', thumb: 'w-6 h-6', translate: 'translate-x-6' }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`${sizes[size].toggle} relative inline-flex items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 ${
          disabled 
            ? 'opacity-50 cursor-not-allowed bg-gray-300' 
            : checked 
              ? 'bg-brand-primary shadow-lg' 
              : 'bg-gray-300 hover:bg-gray-400'
        }`}
      >
        <span
          className={`${sizes[size].thumb} inline-block rounded-full bg-white shadow-lg transform transition-transform duration-200 ${
            checked ? sizes[size].translate : 'translate-x-1'
          }`}
        />
      </button>
      {label && (
        <span className={`text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
          {label}
        </span>
      )}
    </div>
  );
};

// ---------- 10. Radio Component ----------
const Radio: React.FC<{
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  disabled?: boolean;
  label?: string;
}> = ({ name, value, checked, onChange, disabled = false, label }) => {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => !disabled && onChange(value)}
        disabled={disabled}
        className={`w-5 h-5 rounded-full border-2 relative focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-1 transition-all duration-200 ${
          disabled
            ? 'opacity-50 cursor-not-allowed border-gray-300'
            : checked
              ? 'border-brand-primary bg-brand-primary'
              : 'border-gray-300 hover:border-brand-primary'
        }`}
      >
        {checked && (
          <span className="absolute inset-1 rounded-full bg-white"></span>
        )}
      </button>
      {label && (
        <span className={`text-sm font-medium cursor-pointer ${disabled ? 'text-gray-400' : 'text-gray-700'}`} 
              onClick={() => !disabled && onChange(value)}>
          {label}
        </span>
      )}
    </div>
  );
};

// ---------- 11. Slider Component ----------
const Slider: React.FC<{
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  label?: string;
  showValue?: boolean;
}> = ({ value, onChange, min = 0, max = 100, step = 1, disabled = false, label, showValue = true }) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <label className={`text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
            {label}
          </label>
          {showValue && (
            <span className={`text-sm font-medium ${disabled ? 'text-gray-400' : 'text-brand-primary'}`}>
              {value}
            </span>
          )}
        </div>
      )}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary slider ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          style={{
            background: `linear-gradient(to right, #007BED 0%, #007BED ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
          }}
        />
      </div>
    </div>
  );
};

// ---------- 12. Sliding Window Tabs Component ----------
const SlidingTabs: React.FC<{
  tabs: Array<{ id: string; label: string; content: React.ReactNode }>;
  activeTab: string;
  onTabChange: (tabId: string) => void;
}> = ({ tabs, activeTab, onTabChange }) => {
  const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
  
  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="relative bg-gray-100 rounded-lg p-1 mb-4">
        <div className="flex relative">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 relative z-10 ${
                tab.id === activeTab
                  ? 'text-brand-primary'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
          
          {/* Sliding indicator */}
          <div
            className="absolute top-1 bottom-1 bg-white rounded-md shadow-sm transition-all duration-300 ease-out"
            style={{
              left: `${(activeIndex * 100) / tabs.length}%`,
              width: `${100 / tabs.length}%`
            }}
          />
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {tabs.map((tab) => (
            <div key={tab.id} className="w-full flex-shrink-0">
              {tab.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ---------- 13. Modal Component ----------
const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  showCloseButton?: boolean;
}> = ({ isOpen, onClose, title, children, size = 'medium', showCloseButton = true }) => {
  if (!isOpen) return null;

  const sizes = {
    small: 'max-w-md',
    medium: 'max-w-lg',
    large: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`relative bg-white rounded-2xl shadow-2xl transform transition-all duration-300 w-full ${sizes[size]}`}>
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              {title && (
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}
          
          {/* Content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------- 14. Toast Message Component ----------
const Toast: React.FC<{
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}> = ({ message, type, isVisible, onClose, duration = 3000 }) => {
  React.useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white', 
    warning: 'bg-yellow-500 text-white',
    info: 'bg-brand-primary text-white'
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <div className={`${typeStyles[type]} px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-80`}>
        <span className="text-lg">{icons[type]}</span>
        <span className="flex-1 text-sm font-medium">{message}</span>
        <button onClick={onClose} className="text-white hover:opacity-70 transition-opacity">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// ---------- 15. Snackbar Component ----------
const Snackbar: React.FC<{
  message: string;
  action?: { label: string; onClick: () => void };
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}> = ({ message, action, isVisible, onClose, duration = 4000 }) => {
  React.useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 flex justify-center animate-slide-in-left">
      <div className="bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-4 max-w-md w-full">
        <span className="flex-1 text-sm">{message}</span>
        {action && (
          <button
            onClick={action.onClick}
            className="text-brand-primary hover:text-blue-300 text-sm font-medium transition-colors"
          >
            {action.label}
          </button>
        )}
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors ml-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// ---------- 16. Alert Component ----------
const Alert: React.FC<{
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}> = ({ title, message, type, isOpen, onClose, onConfirm, confirmText = '확인', cancelText = '취소' }) => {
  if (!isOpen) return null;

  const typeStyles = {
    success: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-500', title: 'text-green-800' },
    error: { bg: 'bg-red-50', border: 'border-red-200', icon: 'text-red-500', title: 'text-red-800' },
    warning: { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: 'text-yellow-500', title: 'text-yellow-800' },
    info: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-500', title: 'text-blue-800' }
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full animate-scale-in">
          <div className={`${typeStyles[type].bg} ${typeStyles[type].border} border rounded-t-lg p-6`}>
            <div className="flex items-center gap-3">
              <div className={`${typeStyles[type].icon} text-2xl`}>
                {icons[type]}
              </div>
              <h3 className={`text-lg font-semibold ${typeStyles[type].title}`}>
                {title}
              </h3>
            </div>
          </div>
          
          <div className="p-6">
            <p className="text-gray-600 mb-6">{message}</p>
            
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={onClose}>
                {cancelText}
              </Button>
              {onConfirm && (
                <Button 
                  variant={type === 'error' ? 'danger' : 'primary'} 
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                >
                  {confirmText}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------- 17. Loading Animation Component ----------
const LoadingSpinner: React.FC<{
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
}> = ({ size = 'medium', color = '#007BED', text }) => {
  const sizes = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8', 
    large: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div 
        className={`${sizes[size]} border-2 border-gray-200 border-t-current rounded-full animate-spin`}
        style={{ borderTopColor: color }}
      />
      {text && (
        <p className="text-sm text-gray-600 font-medium">{text}</p>
      )}
    </div>
  );
};

// ---------- 18. Table Component ----------
const Table: React.FC<{
  columns: Array<{ key: string; label: string; width?: string }>;
  data: Array<Record<string, any>>;
  onRowClick?: (row: any) => void;
  loading?: boolean;
  emptyMessage?: string;
}> = ({ columns, data, onRowClick, loading = false, emptyMessage = "데이터가 없습니다." }) => {
  if (loading) {
    return (
      <div className="border border-gray-200 rounded-lg">
        <div className="p-8 flex justify-center">
          <LoadingSpinner text="데이터를 불러오는 중..." />
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="border border-gray-200 rounded-lg">
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="grid" style={{ gridTemplateColumns: columns.map(col => col.width || '1fr').join(' ') }}>
            {columns.map((column) => (
              <div key={column.key} className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                {column.label}
              </div>
            ))}
          </div>
        </div>
        
        {/* Empty State */}
        <div className="p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">데이터 없음</h3>
              <p className="text-sm text-gray-500">{emptyMessage}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="grid" style={{ gridTemplateColumns: columns.map(col => col.width || '1fr').join(' ') }}>
          {columns.map((column) => (
            <div key={column.key} className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              {column.label}
            </div>
          ))}
        </div>
      </div>
      
      {/* Body */}
      <div className="divide-y divide-gray-200">
        {data.map((row, index) => (
          <div 
            key={index}
            className={`grid hover:bg-gray-50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
            style={{ gridTemplateColumns: columns.map(col => col.width || '1fr').join(' ') }}
            onClick={() => onRowClick?.(row)}
          >
            {columns.map((column) => (
              <div key={column.key} className="px-4 py-3 text-sm text-gray-900">
                {row[column.key]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// ---------- 19. Validation Input Field Component ----------
const ValidationInput: React.FC<{
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  success?: string;
  helperText?: string;
  rules?: Array<{
    test: (value: string) => boolean;
    message: string;
  }>;
}> = ({ 
  label, 
  value, 
  onChange, 
  type = 'text', 
  placeholder, 
  required = false, 
  disabled = false,
  error,
  success,
  helperText,
  rules = []
}) => {
  const [touched, setTouched] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  React.useEffect(() => {
    if (touched && rules.length > 0) {
      const errors = rules.filter(rule => !rule.test(value)).map(rule => rule.message);
      setValidationErrors(errors);
    }
  }, [value, touched, rules]);

  const hasError = error || (touched && validationErrors.length > 0);
  const hasSuccess = success && !hasError;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-3 py-2 border rounded-lg text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
            hasError
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
              : hasSuccess
                ? 'border-green-300 focus:border-green-500 focus:ring-green-200'
                : 'border-gray-300 focus:border-brand-primary focus:ring-brand-primary/20'
          } ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-60' : 'bg-white'}`}
        />
        
        {/* Status Icon */}
        {(hasError || hasSuccess) && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {hasError ? (
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
        )}
      </div>
      
      {/* Messages */}
      <div className="min-h-5">
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        {!error && touched && validationErrors.length > 0 && (
          <div className="space-y-1">
            {validationErrors.map((err, index) => (
              <p key={index} className="text-sm text-red-600">{err}</p>
            ))}
          </div>
        )}
        {success && !hasError && (
          <p className="text-sm text-green-600">{success}</p>
        )}
        {helperText && !hasError && !hasSuccess && (
          <p className="text-sm text-gray-500">{helperText}</p>
        )}
      </div>
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
  
  // 새로운 컴포넌트 상태들
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    notification: true,
    darkMode: false,
    autoSave: true
  });
  const [radioValue, setRadioValue] = useState("option1");
  const [sliderValue, setSliderValue] = useState(50);
  const [activeTab, setActiveTab] = useState("tab1");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 추가 컴포넌트 상태들
  const [toastState, setToastState] = useState({ visible: false, message: '', type: 'info' as 'success' | 'error' | 'warning' | 'info' });
  const [snackbarState, setSnackbarState] = useState({ visible: false, message: '' });
  const [alertState, setAlertState] = useState({ visible: false, title: '', message: '', type: 'info' as 'success' | 'error' | 'warning' | 'info' });
  const [tableLoading, setTableLoading] = useState(false);
  const [validationInputs, setValidationInputs] = useState({
    email: '',
    password: '',
    username: ''
  });

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

  const toggleState = (key: string) => {
    setToggleStates(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    setToastState({ visible: true, message, type });
  };

  const showSnackbar = (message: string) => {
    setSnackbarState({ visible: true, message });
  };

  const showAlert = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    setAlertState({ visible: true, title, message, type });
  };

  // 샘플 테이블 데이터
  const sampleTableData = [
    { id: 'P001', name: '프리미엄 티셔츠', category: '상의', price: '29,000원', stock: '150개', status: '판매중' },
    { id: 'P002', name: '데님 청바지', category: '하의', price: '89,000원', stock: '75개', status: '판매중' },
    { id: 'P003', name: '스니커즈', category: '신발', price: '129,000원', stock: '30개', status: '품절' },
    { id: 'P004', name: '캐주얼 셔츠', category: '상의', price: '45,000원', stock: '200개', status: '판매중' },
  ];

  const tableColumns = [
    { key: 'id', label: '상품코드', width: '100px' },
    { key: 'name', label: '상품명', width: '200px' },
    { key: 'category', label: '카테고리', width: '100px' },
    { key: 'price', label: '가격', width: '100px' },
    { key: 'stock', label: '재고', width: '80px' },
    { key: 'status', label: '상태', width: '80px' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Notice Banner */}
        <NoticeBanner />
        
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

        {/* HTML to Figma States Preview */}
        <section className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 shadow-lg border border-green-200">
          <h2 className="text-2xl font-bold mb-6 text-green-900">🎨 상태별 컴포넌트 미리보기</h2>
          <div className="bg-green-100 rounded-lg p-4 mb-6">
            <p className="text-green-800 text-sm">
              🎨 <strong>상태별 컴포넌트 미리보기</strong>: 모든 인터랙션 상태를 한눈에 확인할 수 있도록 구성했습니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Button States */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="font-semibold mb-3 text-gray-800">Button States</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-brand-primary text-white rounded-lg">Normal</button>
                <button className="w-full px-4 py-2 bg-brand-primary text-white rounded-lg opacity-80">Hover</button>
                <button className="w-full px-4 py-2 bg-brand-primary text-white rounded-lg opacity-60">Active</button>
                <button className="w-full px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed">Disabled</button>
                <button className="w-full px-4 py-2 border-2 border-brand-primary text-brand-primary rounded-lg">Secondary</button>
                <button className="w-full px-4 py-2 text-brand-primary">Text Only</button>
              </div>
            </div>

            {/* Input States */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="font-semibold mb-3 text-gray-800">Input States</h3>
              <div className="space-y-2">
                <input className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Normal" />
                <input className="w-full px-3 py-2 border-2 border-brand-primary rounded-lg" placeholder="Focused" />
                <input className="w-full px-3 py-2 border-2 border-red-500 rounded-lg" placeholder="Error" />
                <input disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" placeholder="Disabled" />
                <input className="w-full px-3 py-2 border-2 border-green-500 rounded-lg" placeholder="Success" />
              </div>
            </div>

            {/* Badge States */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="font-semibold mb-3 text-gray-800">Badge States</h3>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-1 bg-brand-primary text-white text-xs rounded-full">Primary</span>
                  <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">Success</span>
                  <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">Error</span>
                  <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">Warning</span>
                  <span className="px-2 py-1 bg-gray-500 text-white text-xs rounded-full">Default</span>
                  <span className="px-2 py-1 border border-brand-primary text-brand-primary text-xs rounded-full">Outline</span>
                </div>
              </div>
            </div>

            {/* Card States */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="font-semibold mb-3 text-gray-800">Card States</h3>
              <div className="space-y-2">
                <div className="p-3 border border-gray-200 rounded-lg">Normal Card</div>
                <div className="p-3 border-2 border-brand-primary rounded-lg">Selected</div>
                <div className="p-3 border border-gray-200 rounded-lg shadow-lg">Elevated</div>
                <div className="p-3 border border-gray-200 rounded-lg bg-gray-50">Disabled</div>
              </div>
            </div>

            {/* Toggle States */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="font-semibold mb-3 text-gray-800">Toggle States</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-6 bg-brand-primary rounded-full p-1">
                    <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                  </div>
                  <span className="text-sm">On</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-6 bg-gray-300 rounded-full p-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <span className="text-sm">Off</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-6 bg-gray-200 rounded-full p-1 opacity-50">
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-400">Disabled</span>
                </div>
              </div>
            </div>

            {/* Checkbox States */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="font-semibold mb-3 text-gray-800">Checkbox States</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-brand-primary bg-brand-primary rounded flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="text-sm">Checked</span>
                </label>
                <label className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                  <span className="text-sm">Unchecked</span>
                </label>
                <label className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 bg-gray-100 rounded opacity-50"></div>
                  <span className="text-sm text-gray-400">Disabled</span>
                </label>
              </div>
            </div>

            {/* Loading States */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="font-semibold mb-3 text-gray-800">Loading States</h3>
              <div className="space-y-3">
                <div className="w-6 h-6 border-2 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-brand-primary h-2 rounded-full w-3/4"></div>
                </div>
                <div className="space-y-1">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
              </div>
            </div>

            {/* Alert States */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h3 className="font-semibold mb-3 text-gray-800">Alert States</h3>
              <div className="space-y-2">
                <div className="p-2 bg-blue-100 border border-blue-300 rounded text-sm text-blue-800">Info</div>
                <div className="p-2 bg-green-100 border border-green-300 rounded text-sm text-green-800">Success</div>
                <div className="p-2 bg-yellow-100 border border-yellow-300 rounded text-sm text-yellow-800">Warning</div>
                <div className="p-2 bg-red-100 border border-red-300 rounded text-sm text-red-800">Error</div>
              </div>
            </div>
          </div>
        </section>

        {/* 1. Typography System */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">1. 타이포그래피 시스템</h2>
          
          <div className="space-y-5">
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
          
          <div className="space-y-5">
            {/* Primary Colors */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Primary Colors</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { name: 'Primary Blue', color: '#007BED', text: 'light', usage: '주요 액션, 링크' },
                  { name: 'Background Blue', color: '#EBF5FF', text: 'dark', usage: '배경, 하이라이트' },
                  { name: 'Soft Blue', color: '#5281C8', text: 'light', usage: '보조 액션' },
                  { name: 'Point Red', color: '#F34161', text: 'light', usage: '알림, 강조' },
                  { name: 'White', color: '#FFFFFF', text: 'dark', usage: '배경, 카드' },
                ].map((item) => (
                  <div key={item.name} className="text-center">
                    <div 
                      className="w-full h-20 rounded-lg shadow-md mb-2 flex items-center justify-center text-xs font-mono border"
                      style={{ 
                        backgroundColor: item.color,
                        color: item.text === 'light' ? 'white' : '#374151',
                        borderColor: item.color === '#FFFFFF' ? '#e5e7eb' : 'transparent'
                      }}
                    >
                      {item.color}
                    </div>
                    <p className="text-sm font-bold text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-600">{item.usage}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gray Scale */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">Gray Scale</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Black', color: '#06101D', text: 'light', usage: '제목, 본문 텍스트' },
                  { name: 'Gray', color: '#55585E', text: 'light', usage: '보조 텍스트, 레이블' },
                  { name: 'Light Gray', color: '#F0F0F0', text: 'dark', usage: '구분선, 비활성' },
                  { name: 'White', color: '#FFFFFF', text: 'dark', usage: '배경, 카드' },
                ].map((item) => (
                  <div key={item.name} className="text-center">
                    <div 
                      className="w-full h-20 rounded-lg shadow-md mb-2 flex items-center justify-center text-xs font-mono border"
                      style={{ 
                        backgroundColor: item.color,
                        color: item.text === 'light' ? 'white' : '#374151',
                        borderColor: item.color === '#FFFFFF' ? '#e5e7eb' : 'transparent'
                      }}
                    >
                      {item.color}
                    </div>
                    <p className="text-sm font-bold text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-600">{item.usage}</p>
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
                  { name: 'Error', color: '#F34161', usage: '오류, 거부, 삭제' },
                  { name: 'Info', color: '#007BED', usage: '정보, 링크, 액션' },
                ].map((item) => (
                  <div key={item.name} className="text-center bg-gray-50 rounded-lg p-4">
                    <div 
                      className="w-full h-20 rounded-lg shadow-md mb-3 flex items-center justify-center text-white text-xs font-mono"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.color}
                    </div>
                    <p className="text-sm font-bold text-gray-800 mb-1">{item.name}</p>
                    <p className="text-xs text-gray-600">{item.usage}</p>
                  </div>
                ))}
              </div>

              {/* 컬러 사용 가이드 */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">컬러 사용 가이드</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Primary Blue (#007BED): 주요 CTA 버튼, 링크, 활성 상태</li>
                  <li>• Black (#06101D): 제목, 중요한 텍스트, 아이콘</li>
                  <li>• Gray (#55585E): 본문 텍스트, 설명, 레이블</li>
                  <li>• Light Gray (#F0F0F0): 구분선, 비활성 상태, 배경</li>
                  <li>• Point Red (#F34161): 에러, 경고, 삭제 액션</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Icon System */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">3. 아이콘 시스템</h2>
          
          <div className="space-y-5">
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
          
          <div className="space-y-5">
            {/* Grid System */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">그리드 시스템</h3>
              <div className="space-y-4">
                {/* 24 Column Grid Visual */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <h4 className="font-semibold text-blue-900 mb-4">24-Column Grid</h4>
                  <div className="grid grid-cols-24 gap-1 mb-4">
                    {Array.from({ length: 24 }, (_, i) => (
                      <div key={i} className="bg-blue-200 text-blue-800 text-xs text-center py-1 rounded font-mono">
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-24 gap-1">
                      <div className="col-span-12 bg-blue-300 text-blue-900 text-sm text-center py-3 rounded font-semibold">12 columns (50%)</div>
                      <div className="col-span-12 bg-blue-300 text-blue-900 text-sm text-center py-3 rounded font-semibold">12 columns (50%)</div>
                    </div>
                    <div className="grid grid-cols-24 gap-1">
                      <div className="col-span-8 bg-blue-300 text-blue-900 text-sm text-center py-3 rounded font-semibold">8 cols</div>
                      <div className="col-span-8 bg-blue-300 text-blue-900 text-sm text-center py-3 rounded font-semibold">8 cols</div>
                      <div className="col-span-8 bg-blue-300 text-blue-900 text-sm text-center py-3 rounded font-semibold">8 cols</div>
                    </div>
                    <div className="grid grid-cols-24 gap-1">
                      <div className="col-span-6 bg-blue-300 text-blue-900 text-sm text-center py-3 rounded font-semibold">6</div>
                      <div className="col-span-18 bg-blue-300 text-blue-900 text-sm text-center py-3 rounded font-semibold">18 columns</div>
                    </div>
                    <div className="grid grid-cols-24 gap-1">
                      <div className="col-span-4 bg-purple-300 text-purple-900 text-sm text-center py-3 rounded font-semibold">4</div>
                      <div className="col-span-16 bg-purple-300 text-purple-900 text-sm text-center py-3 rounded font-semibold">16 columns</div>
                      <div className="col-span-4 bg-purple-300 text-purple-900 text-sm text-center py-3 rounded font-semibold">4</div>
                    </div>
                  </div>
                  
                  {/* 24그리드 장점 설명 */}
                  <div className="mt-6 p-4 bg-blue-100 rounded-lg">
                    <h5 className="font-semibold text-blue-900 mb-2">24-Column Grid 장점</h5>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• 더 세밀한 레이아웃 조정 가능</li>
                      <li>• 3분할, 4분할, 6분할, 8분할 모두 가능</li>
                      <li>• 복잡한 상품 목록 레이아웃에 최적화</li>
                      <li>• 반응형 디자인 유연성 증대</li>
                    </ul>
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
          
          <div className="space-y-5">
            
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
          
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">크기별 페이지네이션</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium mb-3 text-gray-600">Small - 모바일 최적화</h4>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={10}
                    onPageChange={setCurrentPage}
                    size="small"
                  />
                </div>
                
                <div>
                  <h4 className="text-md font-medium mb-3 text-gray-600">Medium - 데스크톱 기본</h4>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={10}
                    onPageChange={setCurrentPage}
                    size="medium"
                  />
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">페이지네이션 가이드</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Small: 모바일 환경에서 사용, 터치 친화적 (32px × 32px)</li>
                  <li>• Medium: 데스크톱 기본 크기, 최적의 가독성 (40px × 40px)</li>
                  <li>• 최대 표시 페이지: 7개 (1 ... 4 5 6 ... 10)</li>
                  <li>• 이전/다음 버튼은 항상 표시되며 상황에 따라 비활성화</li>
                  <li>• 간결하고 명확한 디자인으로 사용성 최적화</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Toggle Components */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">10. 토글 스위치</h2>
          
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">크기별 토글</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-8">
                  <div>
                    <h4 className="text-md font-medium mb-2 text-gray-600">Small</h4>
                    <Toggle
                      checked={toggleStates.notification}
                      onChange={() => toggleState('notification')}
                      size="small"
                      label="알림 받기"
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-md font-medium mb-2 text-gray-600">Medium</h4>
                    <Toggle
                      checked={toggleStates.darkMode}
                      onChange={() => toggleState('darkMode')}
                      size="medium"
                      label="다크 모드"
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-md font-medium mb-2 text-gray-600">Large</h4>
                    <Toggle
                      checked={toggleStates.autoSave}
                      onChange={() => toggleState('autoSave')}
                      size="large" 
                      label="자동 저장"
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-md font-medium mb-2 text-gray-600">Disabled</h4>
                    <Toggle
                      checked={false}
                      onChange={() => {}}
                      disabled
                      label="비활성화"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">토글 사용 가이드</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Small: 모바일 UI, 콤팩트한 설정 메뉴</li>
                <li>• Medium: 일반적인 설정 토글, 기본 크기</li>
                <li>• Large: 중요한 설정, 접근성이 중요한 경우</li>
                <li>• 상태 변경 시 즉시 반영되는 설정에 사용</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 11. Radio Components */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">11. 라디오 버튼</h2>
          
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">라디오 그룹 예제</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium mb-3 text-gray-600">배송 옵션 선택</h4>
                  <div className="space-y-3">
                    <Radio
                      name="shipping"
                      value="standard"
                      checked={radioValue === "standard"}
                      onChange={setRadioValue}
                      label="일반 배송 (2-3일)"
                    />
                    <Radio
                      name="shipping"
                      value="express"
                      checked={radioValue === "express"}
                      onChange={setRadioValue}
                      label="익일 배송 (+3,000원)"
                    />
                    <Radio
                      name="shipping"
                      value="pickup"
                      checked={radioValue === "pickup"}
                      onChange={setRadioValue}
                      label="매장 픽업"
                    />
                    <Radio
                      name="shipping"
                      value="disabled"
                      checked={radioValue === "disabled"}
                      onChange={setRadioValue}
                      label="현재 불가능한 옵션"
                      disabled
                    />
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>선택된 값:</strong> {radioValue}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">라디오 버튼 가이드</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 여러 옵션 중 하나만 선택 가능한 경우 사용</li>
                <li>• 그룹 내에서 상호 배타적인 선택</li>
                <li>• 옵션이 2-7개 정도일 때 적합</li>
                <li>• 모든 옵션이 한 번에 보여야 하는 경우</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 12. Slider Component */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">12. 슬라이더</h2>
          
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">슬라이더 예제</h3>
              
              <div className="space-y-6">
                <div className="max-w-md">
                  <Slider
                    value={sliderValue}
                    onChange={setSliderValue}
                    min={0}
                    max={100}
                    label="볼륨"
                    showValue
                  />
                </div>
                
                <div className="max-w-md">
                  <Slider
                    value={25}
                    onChange={() => {}}
                    min={0}
                    max={100}
                    label="밝기 (비활성화)"
                    disabled
                    showValue
                  />
                </div>
                
                <div className="max-w-md">
                  <Slider
                    value={750}
                    onChange={() => {}}
                    min={100}
                    max={1000}
                    step={50}
                    label="가격 범위 (₩)"
                    showValue
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">슬라이더 사용 가이드</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 연속적인 값의 범위에서 선택할 때 사용</li>
                <li>• 볼륨, 밝기, 가격 범위 등에 적합</li>
                <li>• 즉시 피드백이 필요한 설정에 사용</li>
                <li>• step 속성으로 증가 단위 조절 가능</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 13. Sliding Tabs Component */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">13. 슬라이딩 탭</h2>
          
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">탭 네비게이션</h3>
              
              <SlidingTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                tabs={[
                  {
                    id: "tab1",
                    label: "상품 정보",
                    content: (
                      <div className="p-6 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-3">상품 기본 정보</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>• 상품명: 프리미엄 코튼 티셔츠</p>
                          <p>• 브랜드: 베이직웨어</p>
                          <p>• 소재: 100% 코튼</p>
                          <p>• 원산지: 대한민국</p>
                        </div>
                      </div>
                    )
                  },
                  {
                    id: "tab2", 
                    label: "가격 정보",
                    content: (
                      <div className="p-6 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-3">가격 상세</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>• 판매가: ₩29,000</p>
                          <p>• 원가: ₩15,000</p>
                          <p>• 공급가: ₩20,000</p>
                          <p>• 마진: ₩9,000 (31%)</p>
                        </div>
                      </div>
                    )
                  },
                  {
                    id: "tab3",
                    label: "재고 현황", 
                    content: (
                      <div className="p-6 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-3">재고 정보</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>• 총 재고: 150개</p>
                          <p>• 가용 재고: 142개</p>
                          <p>• 예약 재고: 8개</p>
                          <p>• 안전 재고: 20개</p>
                        </div>
                      </div>
                    )
                  }
                ]}
              />
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">슬라이딩 탭 가이드</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 관련된 콘텐츠를 그룹화할 때 사용</li>
                <li>• 부드러운 슬라이딩 애니메이션으로 사용성 향상</li>
                <li>• 탭 개수는 2-5개가 적당</li>
                <li>• 각 탭의 콘텐츠 길이가 비슷할 때 효과적</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 14. Modal Component */}
        <section className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-8 shadow-lg border border-purple-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-lg">🪟</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">모달</h2>
              <p className="text-sm text-gray-500">오버레이 다이얼로그 및 팝업</p>
            </div>
          </div>
          
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">모달 예제</h3>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button
                    variant="primary"
                    onClick={() => setIsModalOpen(true)}
                  >
                    모달 열기
                  </Button>
                </div>
                
                <Modal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  title="상품 상세 정보"
                  size="medium"
                >
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">상품 설명</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        프리미엄 코튼 100%로 제작된 부드럽고 편안한 티셔츠입니다. 
                        데일리웨어로 착용하기 좋으며, 세탁 후에도 형태가 잘 유지됩니다.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">사이즈</label>
                        <select className="w-full p-2 border border-gray-300 rounded-lg">
                          <option>S</option>
                          <option>M</option>
                          <option>L</option>
                          <option>XL</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">색상</label>
                        <select className="w-full p-2 border border-gray-300 rounded-lg">
                          <option>화이트</option>
                          <option>블랙</option>
                          <option>그레이</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-3 pt-4">
                      <Button
                        variant="secondary"
                        onClick={() => setIsModalOpen(false)}
                      >
                        취소
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => setIsModalOpen(false)}
                      >
                        장바구니 담기
                      </Button>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">모달 사용 가이드</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 추가 정보 입력이나 확인이 필요할 때 사용</li>
                <li>• 현재 작업을 중단하지 않고 부가 작업 수행</li>
                <li>• ESC 키나 배경 클릭으로 닫기 가능</li>
                <li>• 모달 내용이 많을 경우 스크롤 가능</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 15. Toast Messages */}
        <section className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 shadow-lg border border-blue-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-lg">💬</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">토스트 메시지</h2>
              <p className="text-sm text-gray-500">일시적 알림 및 피드백 메시지</p>
            </div>
          </div>
          
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">토스트 타입별 예제</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="success"
                  onClick={() => showToast('작업이 성공적으로 완료되었습니다.', 'success')}
                >
                  성공 토스트
                </Button>
                <Button
                  variant="danger"
                  onClick={() => showToast('오류가 발생했습니다. 다시 시도해주세요.', 'error')}
                >
                  에러 토스트
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => showToast('주의가 필요한 상황입니다.', 'warning')}
                >
                  경고 토스트
                </Button>
                <Button
                  variant="primary"
                  onClick={() => showToast('새로운 알림이 있습니다.', 'info')}
                >
                  정보 토스트
                </Button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">토스트 사용 가이드</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 사용자 액션에 대한 즉시 피드백 제공</li>
                <li>• 자동으로 사라짐 (기본 3초)</li>
                <li>• 화면 우상단에 표시</li>
                <li>• 중요하지 않은 알림에 사용</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 16. Snackbar */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">16. 스낵바</h2>
          
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">스낵바 예제</h3>
              
              <div className="flex gap-4">
                <Button
                  variant="primary"
                  onClick={() => showSnackbar('파일이 삭제되었습니다.')}
                >
                  기본 스낵바
                </Button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">스낵바 사용 가이드</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 되돌리기 가능한 액션 후 사용</li>
                <li>• 화면 하단에 표시</li>
                <li>• 액션 버튼 제공 가능</li>
                <li>• 토스트보다 지속시간이 길음 (기본 4초)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 17. Alert Dialogs */}
        <section className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-lg">⚠️</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">알럿 다이얼로그</h2>
              <p className="text-sm text-gray-500">사용자 확인이 필요한 중요 메시지</p>
            </div>
          </div>
          
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">알럿 타입별 예제</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="success"
                  onClick={() => showAlert('성공', '데이터가 성공적으로 저장되었습니다.', 'success')}
                >
                  성공 알럿
                </Button>
                <Button
                  variant="danger"
                  onClick={() => showAlert('오류', '파일 업로드 중 오류가 발생했습니다.', 'error')}
                >
                  에러 알럿
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => showAlert('주의', '이 작업은 되돌릴 수 없습니다.', 'warning')}
                >
                  경고 알럿
                </Button>
                <Button
                  variant="primary"
                  onClick={() => showAlert('정보', '새로운 업데이트가 있습니다.', 'info')}
                >
                  정보 알럿
                </Button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">알럿 사용 가이드</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 중요한 정보나 확인이 필요한 경우</li>
                <li>• 사용자의 명시적 응답 필요</li>
                <li>• 모달 형태로 현재 작업 중단</li>
                <li>• 확인/취소 버튼 제공</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 18. Loading Animations */}
        <section className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-8 shadow-lg border border-green-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-lg">⚡</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">로딩 애니메이션</h2>
              <p className="text-sm text-gray-500">진행 상태 및 로딩 표시</p>
            </div>
          </div>
          
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">로딩 스피너 크기별 예제</h3>
              
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <h4 className="text-sm font-medium mb-3 text-gray-600">Small</h4>
                  <LoadingSpinner size="small" />
                </div>
                
                <div className="text-center">
                  <h4 className="text-sm font-medium mb-3 text-gray-600">Medium</h4>
                  <LoadingSpinner size="medium" />
                </div>
                
                <div className="text-center">
                  <h4 className="text-sm font-medium mb-3 text-gray-600">Large</h4>
                  <LoadingSpinner size="large" />
                </div>
                
                <div className="text-center">
                  <h4 className="text-sm font-medium mb-3 text-gray-600">With Text</h4>
                  <LoadingSpinner size="medium" text="로딩 중..." />
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">로딩 애니메이션 가이드</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 데이터 로딩이나 처리 중임을 표시</li>
                <li>• 예상 대기시간에 따라 크기 조절</li>
                <li>• 긴 작업 시 진행률 텍스트 추가</li>
                <li>• 브랜드 컬러 적용 가능</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 19. Table Component */}
        <section className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-lg border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-gray-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-lg">📊</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">테이블</h2>
              <p className="text-sm text-gray-500">데이터 표시 및 상호작용</p>
            </div>
          </div>
          
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">일반 테이블</h3>
              
              <Table
                columns={tableColumns}
                data={sampleTableData}
                onRowClick={(row) => showToast(`${row.name} 클릭됨`, 'info')}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">로딩 상태 테이블</h3>
              
              <div className="flex gap-4 mb-4">
                <Button
                  variant={tableLoading ? "secondary" : "primary"}
                  onClick={() => setTableLoading(!tableLoading)}
                >
                  {tableLoading ? '로딩 중지' : '로딩 시작'}
                </Button>
              </div>
              
              <Table
                columns={tableColumns}
                data={[]}
                loading={tableLoading}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">빈 테이블</h3>
              
              <Table
                columns={tableColumns}
                data={[]}
                emptyMessage="상품이 등록되지 않았습니다. 새 상품을 등록해보세요."
              />
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">테이블 사용 가이드</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 정형화된 데이터 목록 표시</li>
                <li>• 컬럼별 너비 지정 가능</li>
                <li>• 행 클릭 이벤트 지원</li>
                <li>• 로딩/빈 상태 처리</li>
                <li>• 반응형 디자인 적용</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 20. Validation Input Fields */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">20. 유효성 검사 입력 필드</h2>
          
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-700">유효성 검사 예제</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ValidationInput
                  label="이메일"
                  value={validationInputs.email}
                  onChange={(value) => setValidationInputs(prev => ({ ...prev, email: value }))}
                  type="email"
                  placeholder="example@email.com"
                  required
                  rules={[
                    {
                      test: (value) => value.includes('@'),
                      message: '이메일 형식이 올바르지 않습니다.'
                    },
                    {
                      test: (value) => value.length >= 5,
                      message: '이메일은 최소 5자 이상이어야 합니다.'
                    }
                  ]}
                  helperText="로그인에 사용할 이메일을 입력해주세요."
                />
                
                <ValidationInput
                  label="비밀번호"
                  value={validationInputs.password}
                  onChange={(value) => setValidationInputs(prev => ({ ...prev, password: value }))}
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  required
                  rules={[
                    {
                      test: (value) => value.length >= 8,
                      message: '비밀번호는 최소 8자 이상이어야 합니다.'
                    },
                    {
                      test: (value) => /[A-Z]/.test(value),
                      message: '대문자를 포함해야 합니다.'
                    },
                    {
                      test: (value) => /[0-9]/.test(value),
                      message: '숫자를 포함해야 합니다.'
                    },
                    {
                      test: (value) => /[!@#$%^&*]/.test(value),
                      message: '특수문자를 포함해야 합니다.'
                    }
                  ]}
                />
                
                <ValidationInput
                  label="사용자명"
                  value={validationInputs.username}
                  onChange={(value) => setValidationInputs(prev => ({ ...prev, username: value }))}
                  placeholder="사용자명을 입력하세요"
                  success={validationInputs.username.length >= 3 ? "사용 가능한 사용자명입니다." : undefined}
                  rules={[
                    {
                      test: (value) => value.length >= 3,
                      message: '사용자명은 최소 3자 이상이어야 합니다.'
                    },
                    {
                      test: (value) => /^[a-zA-Z0-9_]+$/.test(value),
                      message: '영문, 숫자, 언더스코어만 사용 가능합니다.'
                    }
                  ]}
                />
                
                <ValidationInput
                  label="비활성화된 필드"
                  value="disabled@example.com"
                  onChange={() => {}}
                  disabled
                  helperText="이 필드는 수정할 수 없습니다."
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">유효성 검사 입력 필드 가이드</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 실시간 유효성 검사 지원</li>
                <li>• 커스텀 검사 규칙 설정 가능</li>
                <li>• 성공/오류 상태 시각적 표시</li>
                <li>• 도움말 텍스트 제공</li>
                <li>• 필수 필드 표시 (*)</li>
                <li>• 접근성을 고려한 디자인</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Toast, Snackbar, Alert Components */}
        <Toast
          message={toastState.message}
          type={toastState.type}
          isVisible={toastState.visible}
          onClose={() => setToastState(prev => ({ ...prev, visible: false }))}
        />
        
        <Snackbar
          message={snackbarState.message}
          isVisible={snackbarState.visible}
          onClose={() => setSnackbarState(prev => ({ ...prev, visible: false }))}
          action={{
            label: '실행취소',
            onClick: () => {
              showToast('작업이 취소되었습니다.', 'info');
              setSnackbarState(prev => ({ ...prev, visible: false }));
            }
          }}
        />
        
        <Alert
          title={alertState.title}
          message={alertState.message}
          type={alertState.type}
          isOpen={alertState.visible}
          onClose={() => setAlertState(prev => ({ ...prev, visible: false }))}
          onConfirm={() => showToast('확인되었습니다.', 'success')}
        />

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