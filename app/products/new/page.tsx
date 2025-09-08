"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// 폼 데이터 타입
interface ProductFormData {
  // 기본 정보
  supplierName: string;
  productName: string;
  englishProductName: string;
  hsCode: string;
  purchaseProductName: string;
  productCode: string;
  category: string;
  origin: string;
  cost: number;
  salePrice: number;
  supplyPrice: number;
  description: string;
  
  // 이미지
  mainImage: string;
  descriptionImages: string[];
  
  // 기타 정보
  showProductNameOnInvoice: boolean;
  taxType: string;
  designer: string;
  registrar: string;
  memos: string[];
  isOutOfStock: boolean;
  retailPrice: number;
  dimensions: { width: number; height: number; depth: number };
  weight: number;
  brand: string;
  productYear: string;
  season: string;
  consumerPrice: number;
}

// 옵션 데이터 타입
interface VariantData {
  barcode: string;
  optionName: string;
  optionCode: string;
  safeStock: number;
  cost: number;
  salePrice: number;
  supplyPrice: number;
  location: string;
  isForSale: boolean;
  isOutOfStock: boolean;
  managementLevel: string;
  note: string;
  inventorySync: boolean;
  dimensions: { width: number; height: number; depth: number };
  weight: number;
  color: string;
  size: string;
}

// 폼 컴포넌트들
const FormSection: React.FC<{ title: string; icon: string; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
    <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <span>{icon}</span>
        {title}
      </h3>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

const FormField: React.FC<{
  label: string;
  required?: boolean;
  children: React.ReactNode;
  description?: string;
}> = ({ label, required = false, children, description }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
    {description && (
      <p className="text-xs text-gray-500">{description}</p>
    )}
  </div>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }> = ({ 
  error, className = "", ...props 
}) => (
  <input
    {...props}
    className={`block w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
      error 
        ? 'border-red-300 bg-red-50' 
        : 'border-gray-300 bg-white hover:border-gray-400'
    } ${className}`}
  />
);

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }> = ({ 
  error, className = "", children, ...props 
}) => (
  <select
    {...props}
    className={`block w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
      error 
        ? 'border-red-300 bg-red-50' 
        : 'border-gray-300 bg-white hover:border-gray-400'
    } ${className}`}
  >
    {children}
  </select>
);

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }> = ({ 
  error, className = "", ...props 
}) => (
  <textarea
    {...props}
    className={`block w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
      error 
        ? 'border-red-300 bg-red-50' 
        : 'border-gray-300 bg-white hover:border-gray-400'
    } ${className}`}
  />
);

const ProductRegistration = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");
  const [variants, setVariants] = useState<VariantData[]>([]);
  const [optionType, setOptionType] = useState<'single' | 'multiple' | null>(null); // 옵션 타입 선택

  const [formData, setFormData] = useState<ProductFormData>({
    supplierName: "",
    productName: "",
    englishProductName: "",
    hsCode: "",
    purchaseProductName: "",
    productCode: "",
    category: "",
    origin: "",
    cost: 0,
    salePrice: 0,
    supplyPrice: 0,
    description: "",
    mainImage: "",
    descriptionImages: ["", "", "", ""],
    showProductNameOnInvoice: true,
    taxType: "과세",
    designer: "",
    registrar: "",
    memos: Array(15).fill(""),
    isOutOfStock: false,
    retailPrice: 0,
    dimensions: { width: 0, height: 0, depth: 0 },
    weight: 0,
    brand: "",
    productYear: "",
    season: "",
    consumerPrice: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // 필수 필드 검증
    if (!formData.productName.trim()) {
      newErrors.productName = "상품명은 필수입니다";
    }
    if (!formData.category) {
      newErrors.category = "상품분류는 필수입니다";
    }
    if (!formData.brand) {
      newErrors.brand = "브랜드는 필수입니다";
    }
    if (formData.cost < 0) {
      newErrors.cost = "원가는 0 이상이어야 합니다";
    }
    if (formData.salePrice <= 0) {
      newErrors.salePrice = "판매가는 0보다 커야 합니다";
    }
    if (formData.consumerPrice > 0 && formData.salePrice > formData.consumerPrice) {
      newErrors.salePrice = "판매가는 소비자가보다 낮아야 합니다";
    }

    // 옵션 검증
    variants.forEach((variant, index) => {
      if (!variant.barcode.trim()) {
        newErrors[`variant_${index}_barcode`] = "바코드는 필수입니다";
      }
      if (!variant.optionCode.trim()) {
        newErrors[`variant_${index}_optionCode`] = "옵션코드는 필수입니다";
      }
      if (variant.salePrice <= 0) {
        newErrors[`variant_${index}_salePrice`] = "판매단가는 0보다 커야 합니다";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (isDraft = false) => {
    setIsSubmitting(true);
    
    try {
      if (!isDraft && !validateForm()) {
        return;
      }

      // 상품 데이터 생성
      const productData = {
        ...formData,
        variants,
        status: isDraft ? 'draft' : 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // 실제 구현에서는 API 호출
      console.log('상품 데이터:', productData);
      
      // 임시로 로컬 스토리지에 저장
      const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
      const newProduct = {
        ...productData,
        id: Date.now().toString(),
      };
      existingProducts.push(newProduct);
      localStorage.setItem('products', JSON.stringify(existingProducts));

      if (isDraft) {
        alert('임시저장이 완료되었습니다.');
      } else {
        alert('상품 등록이 완료되었습니다.');
        router.push('/products');
      }
    } catch (error) {
      console.error('저장 오류:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: "basic", name: "기본 정보", icon: "📋" },
    { id: "pricing", name: "가격 정보", icon: "💰" },
    { id: "images", name: "이미지 관리", icon: "🖼️" },
    { id: "variants", name: "옵션 관리", icon: "⚙️" },
    { id: "additional", name: "추가 정보", icon: "📝" }
  ];

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addVariant = () => {
    const newVariant: VariantData = {
      barcode: "",
      optionName: optionType === 'single' ? "기본옵션" : "",
      optionCode: "",
      safeStock: 0,
      cost: 0,
      salePrice: 0,
      supplyPrice: 0,
      location: "",
      isForSale: true,
      isOutOfStock: false,
      managementLevel: "A",
      note: "",
      inventorySync: true,
      dimensions: { width: 0, height: 0, depth: 0 },
      weight: 0,
      color: optionType === 'single' ? "" : "",
      size: optionType === 'single' ? "" : ""
    };
    setVariants([...variants, newVariant]);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const updateVariant = (index: number, field: keyof VariantData, value: any) => {
    const updated = variants.map((variant, i) => 
      i === index ? { ...variant, [field]: value } : variant
    );
    setVariants(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 헤더 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← 상품 목록
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <nav className="flex items-center space-x-2 text-sm text-gray-500">
                <span>상품 관리</span>
                <span>›</span>
                <span className="text-gray-900 font-medium">상품 등록</span>
              </nav>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleSave(true)}
                disabled={isSubmitting}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                📋 {isSubmitting ? '저장중...' : '임시저장'}
              </button>
              <button 
                onClick={() => handleSave(false)}
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ✅ {isSubmitting ? '등록중...' : '등록완료'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-6">
        {/* 페이지 헤더 */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            ➕ 상품 등록
          </h1>
          <p className="text-gray-600 mt-2">새로운 상품을 등록하고 옵션을 설정해보세요</p>
          <div className="text-xs text-gray-400 mt-1">현재 탭: {activeTab}</div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    console.log('Tab clicked:', tab.id);
                    setActiveTab(tab.id);
                  }}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {tab.icon}
                    {tab.name}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {/* 기본 정보 탭 */}
            {activeTab === "basic" && (
              <div className="space-y-8">
                <FormSection title="필수 정보" icon="🔴">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="상품명" required>
                      <Input 
                        placeholder="상품명을 입력하세요"
                        value={formData.productName}
                        onChange={(e) => handleInputChange('productName', e.target.value)}
                        error={!!errors.productName}
                      />
                      {errors.productName && (
                        <p className="text-red-500 text-xs mt-1">{errors.productName}</p>
                      )}
                    </FormField>
                    
                    <FormField label="상품코드" required description="미입력시 자동 생성됩니다">
                      <Input 
                        placeholder="PRD-20250101-001"
                        value={formData.productCode}
                        onChange={(e) => handleInputChange('productCode', e.target.value)}
                      />
                    </FormField>

                    <FormField label="상품분류" required>
                      <Select 
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        error={!!errors.category}
                      >
                        <option value="">분류를 선택하세요</option>
                        <option value="상의 > 티셔츠">상의 &gt; 티셔츠</option>
                        <option value="상의 > 셔츠">상의 &gt; 셔츠</option>
                        <option value="하의 > 팬츠">하의 &gt; 팬츠</option>
                        <option value="하의 > 스커트">하의 &gt; 스커트</option>
                        <option value="잡화">잡화</option>
                      </Select>
                      {errors.category && (
                        <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                      )}
                    </FormField>

                    <FormField label="브랜드" required>
                      <Select 
                        value={formData.brand}
                        onChange={(e) => handleInputChange('brand', e.target.value)}
                        error={!!errors.brand}
                      >
                        <option value="">브랜드를 선택하세요</option>
                        <option value="Premium Basic">Premium Basic</option>
                        <option value="Fashion House">Fashion House</option>
                        <option value="Style Plus">Style Plus</option>
                        <option value="Modern Wear">Modern Wear</option>
                      </Select>
                      {errors.brand && (
                        <p className="text-red-500 text-xs mt-1">{errors.brand}</p>
                      )}
                    </FormField>
                  </div>
                </FormSection>

                <FormSection title="선택 정보" icon="⭕">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="공급처">
                      <Select 
                        value={formData.supplierName}
                        onChange={(e) => handleInputChange('supplierName', e.target.value)}
                      >
                        <option value="">공급처를 선택하세요</option>
                        <option value="공급처A">공급처A</option>
                        <option value="공급처B">공급처B</option>
                        <option value="공급처C">공급처C</option>
                        <option value="공급처D">공급처D</option>
                      </Select>
                    </FormField>

                    <FormField label="영문상품명" description="물류 연계 시 필수">
                      <Input 
                        placeholder="English Product Name"
                        value={formData.englishProductName}
                        onChange={(e) => handleInputChange('englishProductName', e.target.value)}
                      />
                    </FormField>

                    <FormField label="HS_CODE" description="국제통관 시 필요">
                      <Input 
                        placeholder="0000000000"
                        value={formData.hsCode}
                        onChange={(e) => handleInputChange('hsCode', e.target.value)}
                      />
                    </FormField>

                    <FormField label="사입상품명" description="내부용, 외부 전송 금지">
                      <Input 
                        placeholder="내부 사용 상품명"
                        value={formData.purchaseProductName}
                        onChange={(e) => handleInputChange('purchaseProductName', e.target.value)}
                      />
                    </FormField>

                    <FormField label="원산지">
                      <Select 
                        value={formData.origin}
                        onChange={(e) => handleInputChange('origin', e.target.value)}
                      >
                        <option value="">원산지를 선택하세요</option>
                        <option value="KR">대한민국</option>
                        <option value="CN">중국</option>
                        <option value="VN">베트남</option>
                        <option value="ID">인도네시아</option>
                        <option value="TH">태국</option>
                      </Select>
                    </FormField>

                    <FormField label="면세여부" required>
                      <Select 
                        value={formData.taxType}
                        onChange={(e) => handleInputChange('taxType', e.target.value)}
                      >
                        <option value="과세">과세</option>
                        <option value="면세">면세</option>
                        <option value="영세">영세</option>
                      </Select>
                    </FormField>
                  </div>
                </FormSection>

                <FormSection title="상품 설명" icon="📝">
                  <FormField label="상품 설명" description="최대 2000자, HTML/script 금지">
                    <Textarea 
                      rows={6}
                      placeholder="상품에 대한 자세한 설명을 입력하세요..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                  </FormField>
                </FormSection>
              </div>
            )}

            {/* 가격 정보 탭 */}
            {activeTab === "pricing" && (
              <div className="space-y-8">
                <FormSection title="가격 설정" icon="💰">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="원가" required description="음수 입력 불가">
                      <Input 
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0"
                        value={formData.cost}
                        onChange={(e) => handleInputChange('cost', parseFloat(e.target.value) || 0)}
                        error={!!errors.cost}
                      />
                      {errors.cost && (
                        <p className="text-red-500 text-xs mt-1">{errors.cost}</p>
                      )}
                    </FormField>

                    <FormField label="대표판매가" required description="소비자가보다 낮아야 함">
                      <Input 
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0"
                        value={formData.salePrice}
                        onChange={(e) => handleInputChange('salePrice', parseFloat(e.target.value) || 0)}
                        error={!!errors.salePrice}
                      />
                      {errors.salePrice && (
                        <p className="text-red-500 text-xs mt-1">{errors.salePrice}</p>
                      )}
                    </FormField>

                    <FormField label="대표공급가">
                      <Input 
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0"
                        value={formData.supplyPrice}
                        onChange={(e) => handleInputChange('supplyPrice', parseFloat(e.target.value) || 0)}
                      />
                    </FormField>

                    <FormField label="마진금액" description="판매가-공급가로 자동 계산">
                      <Input 
                        type="number"
                        value={formData.salePrice - formData.supplyPrice}
                        readOnly
                        className="bg-gray-50"
                      />
                    </FormField>

                    <FormField label="시중가">
                      <Input 
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0"
                        value={formData.retailPrice}
                        onChange={(e) => handleInputChange('retailPrice', parseFloat(e.target.value) || 0)}
                      />
                    </FormField>

                    <FormField label="소비자가" description="판매가보다 높아야 함">
                      <Input 
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0"
                        value={formData.consumerPrice}
                        onChange={(e) => handleInputChange('consumerPrice', parseFloat(e.target.value) || 0)}
                      />
                    </FormField>
                  </div>
                </FormSection>

                {/* 가격 요약 */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <h4 className="text-lg font-semibold text-blue-900 mb-4">💡 가격 요약</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-sm text-blue-600">원가</div>
                      <div className="text-lg font-bold text-blue-900">
                        {formData.cost.toLocaleString()}원
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-blue-600">판매가</div>
                      <div className="text-lg font-bold text-blue-900">
                        {formData.salePrice.toLocaleString()}원
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-blue-600">마진</div>
                      <div className="text-lg font-bold text-green-600">
                        {(formData.salePrice - formData.supplyPrice).toLocaleString()}원
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-blue-600">마진률</div>
                      <div className="text-lg font-bold text-green-600">
                        {formData.salePrice > 0 ? Math.round(((formData.salePrice - formData.supplyPrice) / formData.salePrice) * 100) : 0}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 옵션 관리 탭 */}
            {activeTab === "variants" && (
              <div className="space-y-6">
                {/* 옵션 타입 선택 */}
                <FormSection title="옵션 설정 방식" icon="🎯">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div 
                        onClick={() => {
                          setOptionType('single');
                          if (variants.length === 0) {
                            // 단일 옵션 자동 추가
                            setVariants([{
                              barcode: "",
                              optionName: "기본옵션",
                              optionCode: "STD",
                              safeStock: 0,
                              cost: 0,
                              salePrice: 0,
                              supplyPrice: 0,
                              location: "",
                              isForSale: true,
                              isOutOfStock: false,
                              managementLevel: "A",
                              note: "",
                              inventorySync: true,
                              dimensions: { width: 0, height: 0, depth: 0 },
                              weight: 0,
                              color: "",
                              size: ""
                            }]);
                          }
                        }}
                        className={`cursor-pointer p-6 border-2 rounded-xl transition-all ${
                          optionType === 'single' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-3xl mb-3">📦</div>
                          <h4 className="font-semibold text-gray-900 mb-2">단일 상품</h4>
                          <p className="text-sm text-gray-600">색상, 사이즈 등의 옵션이 없는 단일 상품</p>
                          <div className="mt-3 text-xs text-gray-500">
                            • 바로 판매 가능한 완성품<br/>
                            • 옵션 선택 없이 구매 가능<br/>
                            • 간편한 재고 관리
                          </div>
                        </div>
                      </div>

                      <div 
                        onClick={() => setOptionType('multiple')}
                        className={`cursor-pointer p-6 border-2 rounded-xl transition-all ${
                          optionType === 'multiple' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-3xl mb-3">🎨</div>
                          <h4 className="font-semibold text-gray-900 mb-2">다중 옵션</h4>
                          <p className="text-sm text-gray-600">색상, 사이즈 등 여러 옵션이 있는 상품</p>
                          <div className="mt-3 text-xs text-gray-500">
                            • 색상별, 사이즈별 구분<br/>
                            • 옵션별 개별 가격 설정<br/>
                            • 옵션별 재고 관리 가능
                          </div>
                        </div>
                      </div>
                    </div>

                    {optionType && (
                      <div className={`p-4 rounded-lg ${optionType === 'single' ? 'bg-green-50 border border-green-200' : 'bg-purple-50 border border-purple-200'}`}>
                        <div className={`text-sm font-medium ${optionType === 'single' ? 'text-green-800' : 'text-purple-800'} mb-1`}>
                          {optionType === 'single' ? '✅ 단일 상품으로 설정됨' : '🎨 다중 옵션 상품으로 설정됨'}
                        </div>
                        <div className={`text-xs ${optionType === 'single' ? 'text-green-600' : 'text-purple-600'}`}>
                          {optionType === 'single' 
                            ? '기본옵션 1개로 자동 설정됩니다. 필요시 옵션 정보를 수정해주세요.' 
                            : '필요한 만큼 옵션을 추가할 수 있습니다. 최소 1개 이상의 옵션이 필요합니다.'
                          }
                        </div>
                      </div>
                    )}
                  </div>
                </FormSection>

                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    상품 옵션 ({variants.length}개)
                    {optionType === 'single' && variants.length > 0 && (
                      <span className="ml-2 text-sm font-normal text-gray-600">[단일 상품]</span>
                    )}
                    {optionType === 'multiple' && (
                      <span className="ml-2 text-sm font-normal text-gray-600">[다중 옵션]</span>
                    )}
                  </h3>
                  
                  <div className="flex items-center gap-3">
                    {optionType === 'multiple' && (
                      <div className="text-sm text-gray-600">
                        💡 1개만 등록해도 됩니다
                      </div>
                    )}
                    <button 
                      onClick={addVariant}
                      disabled={optionType === 'single' && variants.length >= 1}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      ➕ 옵션 추가
                    </button>
                  </div>
                </div>

                {optionType === 'single' && variants.length >= 1 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="text-sm text-yellow-800">
                      ℹ️ <strong>단일 상품 정책:</strong> 단일 상품은 1개의 옵션만 등록 가능합니다. 
                      다중 옵션이 필요하시면 위에서 "다중 옵션"을 선택해주세요.
                    </div>
                  </div>
                )}

                {variants.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <div className="text-6xl mb-4">⚙️</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">옵션이 없습니다</h3>
                    <p className="text-gray-600 mb-4">
                      {optionType === 'single' 
                        ? '단일 상품은 기본옵션 1개가 자동으로 추가됩니다' 
                        : '색상, 사이즈 등의 옵션을 추가해보세요'
                      }
                    </p>
                    <button 
                      onClick={addVariant}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {optionType === 'single' ? '기본 옵션 추가' : '첫 번째 옵션 추가'}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {variants.map((variant, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-gray-900">
                            {optionType === 'single' ? '기본 옵션' : `옵션 #${index + 1}`}
                          </h4>
                          {(optionType === 'multiple' || (optionType === 'single' && variants.length > 1)) && (
                            <button 
                              onClick={() => removeVariant(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              🗑️ 삭제
                            </button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField label="바코드" required>
                            <Input 
                              placeholder="8801234567890"
                              value={variant.barcode}
                              onChange={(e) => updateVariant(index, 'barcode', e.target.value)}
                            />
                          </FormField>

                          <FormField label="옵션코드" required>
                            <Input 
                              placeholder={optionType === 'single' ? 'STD' : 'OPT-001'}
                              value={variant.optionCode}
                              onChange={(e) => updateVariant(index, 'optionCode', e.target.value)}
                            />
                          </FormField>

                          <FormField label="옵션명" required>
                            <Input 
                              placeholder={optionType === 'single' ? '기본옵션' : '화이트/M'}
                              value={variant.optionName}
                              onChange={(e) => updateVariant(index, 'optionName', e.target.value)}
                              readOnly={optionType === 'single'}
                              className={optionType === 'single' ? 'bg-gray-50' : ''}
                            />
                          </FormField>

                          <FormField label="원가">
                            <Input 
                              type="number"
                              min="0"
                              value={variant.cost}
                              onChange={(e) => updateVariant(index, 'cost', parseFloat(e.target.value) || 0)}
                            />
                          </FormField>

                          <FormField label="판매단가" required>
                            <Input 
                              type="number"
                              min="0"
                              value={variant.salePrice}
                              onChange={(e) => updateVariant(index, 'salePrice', parseFloat(e.target.value) || 0)}
                            />
                          </FormField>

                          <FormField label="공급가">
                            <Input 
                              type="number"
                              min="0"
                              value={variant.supplyPrice}
                              onChange={(e) => updateVariant(index, 'supplyPrice', parseFloat(e.target.value) || 0)}
                            />
                          </FormField>

                          {optionType === 'multiple' && (
                            <>
                              <FormField label="색상">
                                <Input 
                                  placeholder="화이트"
                                  value={variant.color}
                                  onChange={(e) => updateVariant(index, 'color', e.target.value)}
                                />
                              </FormField>

                              <FormField label="사이즈">
                                <Input 
                                  placeholder="M"
                                  value={variant.size}
                                  onChange={(e) => updateVariant(index, 'size', e.target.value)}
                                />
                              </FormField>
                            </>
                          )}

                          <FormField label="안전재고">
                            <Input 
                              type="number"
                              min="0"
                              value={variant.safeStock}
                              onChange={(e) => updateVariant(index, 'safeStock', parseInt(e.target.value) || 0)}
                            />
                          </FormField>

                          <FormField label="재고위치">
                            <Input 
                              placeholder="창고A-01"
                              value={variant.location}
                              onChange={(e) => updateVariant(index, 'location', e.target.value)}
                            />
                          </FormField>

                          <FormField label="관리등급">
                            <Select 
                              value={variant.managementLevel}
                              onChange={(e) => updateVariant(index, 'managementLevel', e.target.value)}
                            >
                              <option value="A">A등급</option>
                              <option value="B">B등급</option>
                              <option value="C">C등급</option>
                            </Select>
                          </FormField>

                          <FormField label="비고">
                            <Input 
                              placeholder="특이사항 입력"
                              value={variant.note}
                              onChange={(e) => updateVariant(index, 'note', e.target.value)}
                            />
                          </FormField>
                        </div>

                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                          <label className="flex items-center">
                            <input 
                              type="checkbox"
                              checked={variant.isForSale}
                              onChange={(e) => updateVariant(index, 'isForSale', e.target.checked)}
                              className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-700">판매여부</span>
                          </label>

                          <label className="flex items-center">
                            <input 
                              type="checkbox"
                              checked={variant.inventorySync}
                              onChange={(e) => updateVariant(index, 'inventorySync', e.target.checked)}
                              className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-700">재고연동</span>
                          </label>

                          <label className="flex items-center">
                            <input 
                              type="checkbox"
                              checked={variant.isOutOfStock}
                              onChange={(e) => updateVariant(index, 'isOutOfStock', e.target.checked)}
                              className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-700">품절상품</span>
                          </label>
                        </div>

                        {/* 옵션별 크기/무게 정보 */}
                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <h5 className="text-sm font-medium text-gray-900 mb-3">물리적 속성</h5>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <FormField label="크기 (WxHxD)">
                              <div className="flex gap-1">
                                <Input 
                                  placeholder="W"
                                  type="number"
                                  min="0"
                                  step="0.1"
                                  value={variant.dimensions.width}
                                  onChange={(e) => updateVariant(index, 'dimensions', {
                                    ...variant.dimensions,
                                    width: parseFloat(e.target.value) || 0
                                  })}
                                />
                                <Input 
                                  placeholder="H"
                                  type="number"
                                  min="0"
                                  step="0.1"
                                  value={variant.dimensions.height}
                                  onChange={(e) => updateVariant(index, 'dimensions', {
                                    ...variant.dimensions,
                                    height: parseFloat(e.target.value) || 0
                                  })}
                                />
                                <Input 
                                  placeholder="D"
                                  type="number"
                                  min="0"
                                  step="0.1"
                                  value={variant.dimensions.depth}
                                  onChange={(e) => updateVariant(index, 'dimensions', {
                                    ...variant.dimensions,
                                    depth: parseFloat(e.target.value) || 0
                                  })}
                                />
                              </div>
                            </FormField>

                            <FormField label="무게 (g)">
                              <Input 
                                type="number"
                                min="0"
                                step="0.1"
                                value={variant.weight}
                                onChange={(e) => updateVariant(index, 'weight', parseFloat(e.target.value) || 0)}
                              />
                            </FormField>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 옵션 요약 */}
                {variants.length > 0 && (
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                    <h4 className="text-lg font-semibold text-blue-900 mb-4">📊 옵션 요약</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-sm text-blue-600">
                          {optionType === 'single' ? '상품 타입' : '총 옵션 수'}
                        </div>
                        <div className="text-2xl font-bold text-blue-900">
                          {optionType === 'single' ? '단일상품' : `${variants.length}개`}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-blue-600">판매 가능</div>
                        <div className="text-2xl font-bold text-green-600">
                          {variants.filter(v => v.isForSale).length}개
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-blue-600">평균 판매가</div>
                        <div className="text-2xl font-bold text-blue-900">
                          {variants.length > 0 
                            ? Math.round(variants.reduce((sum, v) => sum + v.salePrice, 0) / variants.length).toLocaleString()
                            : 0}원
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-blue-600">총 안전재고</div>
                        <div className="text-2xl font-bold text-orange-600">
                          {variants.reduce((sum, v) => sum + v.safeStock, 0)}개
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "images" && (
              <div className="space-y-8">
                <FormSection title="대표 이미지" icon="🖼️">
                  <FormField label="메인 이미지" required description="권장 크기: 800x800px, 최대 5MB">
                    <div className="flex items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="text-center">
                        <div className="text-4xl mb-2">�</div>
                        <div className="text-sm font-medium text-gray-900 mb-1">이미지 업로드</div>
                        <div className="text-xs text-gray-500">드래그하거나 클릭하여 업로드</div>
                      </div>
                    </div>
                  </FormField>
                </FormSection>

                <FormSection title="상세 이미지" icon="🖼️">
                  <FormField label="상세 이미지" description="최대 4개, 권장 크기: 1200x1200px">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map((index) => (
                        <div key={index} className="aspect-square border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl mb-1">📷</div>
                            <div className="text-xs text-gray-500">이미지 {index}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </FormField>
                </FormSection>

                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <h4 className="text-sm font-semibold text-yellow-800 mb-2">💡 이미지 가이드</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• 대표 이미지는 상품 목록에서 썸네일로 사용됩니다</li>
                    <li>• 지원 형식: JPG, PNG, GIF (최대 5MB)</li>
                    <li>• 정사각형 비율을 권장합니다</li>
                    <li>• 배경은 흰색 또는 투명을 권장합니다</li>
                  </ul>
                </div>
              </div>
            )}

            {/* 추가 정보 탭 */}
            {activeTab === "additional" && (
              <div className="space-y-8">
                <FormSection title="물리적 속성" icon="📏">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <FormField label="크기 (cm)" description="포장 크기 기준">
                        <div className="grid grid-cols-3 gap-2">
                          <Input 
                            placeholder="가로"
                            type="number"
                            min="0"
                            step="0.1"
                            value={formData.dimensions.width}
                            onChange={(e) => handleInputChange('dimensions', {
                              ...formData.dimensions,
                              width: parseFloat(e.target.value) || 0
                            })}
                          />
                          <Input 
                            placeholder="세로"
                            type="number"
                            min="0"
                            step="0.1"
                            value={formData.dimensions.height}
                            onChange={(e) => handleInputChange('dimensions', {
                              ...formData.dimensions,
                              height: parseFloat(e.target.value) || 0
                            })}
                          />
                          <Input 
                            placeholder="높이"
                            type="number"
                            min="0"
                            step="0.1"
                            value={formData.dimensions.depth}
                            onChange={(e) => handleInputChange('dimensions', {
                              ...formData.dimensions,
                              depth: parseFloat(e.target.value) || 0
                            })}
                          />
                        </div>
                      </FormField>

                      <FormField label="무게 (g)" description="배송비 계산용">
                        <Input 
                          type="number"
                          min="0"
                          step="0.1"
                          placeholder="0"
                          value={formData.weight}
                          onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                        />
                      </FormField>
                    </div>

                    <div className="space-y-4">
                      <FormField label="상품 연도" description="제조/출시 년도">
                        <Select 
                          value={formData.productYear}
                          onChange={(e) => handleInputChange('productYear', e.target.value)}
                        >
                          <option value="">연도 선택</option>
                          {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                            <option key={year} value={year.toString()}>{year}</option>
                          ))}
                        </Select>
                      </FormField>

                      <FormField label="시즌" description="상품 시즌">
                        <Select 
                          value={formData.season}
                          onChange={(e) => handleInputChange('season', e.target.value)}
                        >
                          <option value="">시즌 선택</option>
                          <option value="봄">봄 (Spring)</option>
                          <option value="여름">여름 (Summer)</option>
                          <option value="가을">가을 (Fall)</option>
                          <option value="겨울">겨울 (Winter)</option>
                          <option value="사계절">사계절 (All Season)</option>
                        </Select>
                      </FormField>
                    </div>
                  </div>
                </FormSection>

                <FormSection title="담당자 정보" icon="👥">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="디자이너" description="상품 디자인 담당자">
                      <Select 
                        value={formData.designer}
                        onChange={(e) => handleInputChange('designer', e.target.value)}
                      >
                        <option value="">디자이너 선택</option>
                        <option value="김디자인">김디자인</option>
                        <option value="이창작">이창작</option>
                        <option value="박아트">박아트</option>
                        <option value="최스타일">최스타일</option>
                      </Select>
                    </FormField>

                    <FormField label="등록자" description="시스템 자동 입력">
                      <Input 
                        value="관리자"
                        readOnly
                        className="bg-gray-50"
                      />
                    </FormField>
                  </div>
                </FormSection>

                <FormSection title="메모 관리" icon="📝">
                  <FormField label="내부 메모" description="최대 15개, 외부 노출 안됨">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {formData.memos.slice(0, 6).map((memo, index) => (
                        <Input
                          key={index}
                          placeholder={`메모 ${index + 1}`}
                          value={memo}
                          onChange={(e) => {
                            const newMemos = [...formData.memos];
                            newMemos[index] = e.target.value;
                            handleInputChange('memos', newMemos);
                          }}
                        />
                      ))}
                    </div>
                  </FormField>
                </FormSection>

                <FormSection title="기타 설정" icon="⚙️">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input 
                          type="checkbox"
                          checked={formData.showProductNameOnInvoice}
                          onChange={(e) => handleInputChange('showProductNameOnInvoice', e.target.checked)}
                          className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">거래명세서에 상품명 표시</span>
                      </label>
                    </div>

                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input 
                          type="checkbox"
                          checked={formData.isOutOfStock}
                          onChange={(e) => handleInputChange('isOutOfStock', e.target.checked)}
                          className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">품절 상품</span>
                      </label>
                    </div>
                  </div>
                </FormSection>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRegistration;
