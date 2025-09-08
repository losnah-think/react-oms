"use client";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

// ---------- Mock Data (100개 이상) ----------
function generateProducts(count: number): Product[] {
  const suppliers = ["공급처A", "공급처B", "공급처C", "공급처D"];
  const categories = ["상의 > 티셔츠", "상의 > 셔츠", "하의 > 팬츠", "잡화"];
  const designers = ["디자이너A", "디자이너B", "디자이너C", "디자이너D"];
  const registrars = ["등록자A", "등록자B", "등록자C", "등록자D"];
  const shippingPolicies = ["기본", "특수 포장", "무료", "미지정"];
  const images = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
  ];
  
  const colors = ["블랙", "화이트", "네이비", "그레이", "베이지", "브라운"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  
  return Array.from({ length: count }, (_, i) => {
    // 옵션 개수를 1~6개 사이에서 랜덤하게 결정
    const variantCount = Math.floor(Math.random() * 6) + 1;
    
    const variants = Array.from({ length: variantCount }, (_, vIndex) => {
      let attrs: Record<string, string> = {};
      
      if (variantCount === 1) {
        // 단일 옵션인 경우
        attrs = { 기본옵션: "표준" };
      } else {
        // 다중 옵션인 경우
        if (variantCount <= 3) {
          // 색상만 있는 경우
          attrs = { 색상: colors[vIndex % colors.length] };
        } else {
          // 색상 + 사이즈 있는 경우
          const colorIndex = Math.floor(vIndex / sizes.length);
          const sizeIndex = vIndex % sizes.length;
          attrs = { 
            색상: colors[colorIndex % colors.length], 
            사이즈: sizes[sizeIndex] 
          };
        }
      }
      
      return {
        id: `V-${1000 + i}-${vIndex + 1}`,
        attrs,
        sku: `SKU-${1000 + i}-${vIndex + 1}`,
        price: 10000 + i * 100 + (vIndex * 1000),
        purchasePrice: 5000 + i * 50 + (vIndex * 500),
        barcode: [String(8800000000000 + i * 100 + vIndex)],
      };
    });

    return {
      id: `P-${1000 + i}`,
      name: `상품 ${i + 1}`,
      supplierName: suppliers[i % suppliers.length],
      category: categories[i % categories.length],
      code: `CODE-${1000 + i}`,
      shippingPolicy: shippingPolicies[i % shippingPolicies.length],
      createdAt: `2025-09-${String((i % 30) + 1).padStart(2, "0")}T${String((8 + (i % 12))).padStart(2, "0")}:00:00`,
      image: images[i % images.length],
      salePrice: 10000 + i * 100,
      purchasePrice: 5000 + i * 50,
      supplyPrice: 7000 + i * 70,
      marginPrice: 3000 + i * 30,
      variants,
      designer: designers[i % designers.length],
      registrar: registrars[i % registrars.length],
      stockManaged: i % 2 === 0,
    };
  });
}

const MOCK_PRODUCTS: Product[] = generateProducts(120);

// ---------- 기본 UI 컴포넌트 ----------
const krw = (n: number) =>
  new Intl.NumberFormat("ko-KR", { style: "currency", currency: "KRW", maximumFractionDigits: 0 }).format(n);

const Checkbox: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
  <input type="checkbox" className="h-4 w-4 accent-blue-500" checked={checked} onChange={(e) => onChange(e.target.checked)} />
);

const IconBtn: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className = "", ...rest }) => (
  <button
    {...rest}
    className={
      "px-3 py-2 rounded-xl text-sm border shadow-sm transition hover:shadow bg-white " +
      (rest.disabled ? "opacity-50 cursor-not-allowed " : "") +
      className
    }
  >
    {children}
  </button>
);

// ---------- ProductCard ----------
const ProductCard: React.FC<{
  product: Product;
  selected: boolean;
  onToggleSelect: (checked: boolean) => void;
}> = ({ product, selected, onToggleSelect }) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const hasMulti = product.variants.length > 1;
  const firstV = product.variants[0];

  return (
    <div
      className="group border rounded-2xl bg-white shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer"
      onClick={() => router.push(`/products/${product.id}`)}
    >
      <div className="flex gap-4 p-4">
        <div className="flex items-start pt-1" onClick={(e) => e.stopPropagation()}>
          <Checkbox checked={selected} onChange={onToggleSelect} />
        </div>
        <div className="h-32 w-32 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-100 border">
          <img
            src={product.image || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="font-semibold text-gray-900 truncate text-base">{product.name}</div>
              <div className="mt-1 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1 text-sm text-gray-600">
                <div><span className="text-gray-500">사입상품명</span> | {product.code}</div>
                <div><span className="text-gray-500">상품 분류</span> | {product.category || "미입력"}</div>
                <div><span className="text-gray-500">배송비정책</span> | {product.shippingPolicy || "미지정"}</div>
                <div><span className="text-gray-500">판매가</span> | {krw(product.salePrice)}</div>
                <div><span className="text-gray-500">원가</span> | {krw(product.purchasePrice)}</div>
                <div className="text-gray-400"><span className="text-gray-500">등록일자</span> | {new Date(product.createdAt).toLocaleString("ko-KR")}</div>
              </div>
              <div className="mt-2 flex items-center gap-2 flex-wrap text-xs">
                <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-gray-600 bg-white/70">코드: {product.code.split(",")[0]}</span>
                <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-gray-600 bg-white/70">옵션 {product.variants.length}개</span>
                {firstV?.barcode?.length ? (
                  <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-gray-600 bg-white/70">바코드 {firstV.barcode.length}개(대표)</span>
                ) : null}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <IconBtn onClick={(e) => {e.stopPropagation(); alert(`수정: ${product.id}`);}}>✏️</IconBtn>
              <IconBtn onClick={(e) => {e.stopPropagation(); alert(`삭제: ${product.id}`);}}>🗑️</IconBtn>
            </div>
          </div>

          {/* Single variant summary */}
          {!hasMulti && (
            <div className="mt-3 rounded-xl border bg-gray-50 p-3">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-700">
                {firstV.attrs["기본옵션"] ? (
                  <>
                    <div><span className="text-gray-500">옵션</span>: {firstV.attrs["기본옵션"]}</div>
                    <div><span className="text-gray-500">SKU</span>: {firstV.sku}</div>
                    <div><span className="text-gray-500">가격</span>: {krw(firstV.price)}</div>
                    <div><span className="text-gray-500">바코드</span>: {firstV.barcode.join(", ") || "-"}</div>
                  </>
                ) : (
                  <>
                    {Object.entries(firstV.attrs).map(([k, v]) => (
                      <div key={k}><span className="text-gray-500">{k}</span>: {String(v)}</div>
                    ))}
                    <div><span className="text-gray-500">SKU</span>: {firstV.sku}</div>
                    <div><span className="text-gray-500">가격</span>: {krw(firstV.price)}</div>
                    <div><span className="text-gray-500">바코드</span>: {firstV.barcode.join(", ") || "-"}</div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Multi variants table */}
          {hasMulti && (
            <div className="mt-3">
              <button
                onClick={(e) => {e.stopPropagation(); setExpanded((v) => !v);}}
                className="text-sm px-3 py-2 rounded-lg border bg-white hover:bg-gray-50 transition"
              >
                {expanded ? "옵션 접기" : "옵션 펼치기"}
              </button>

              {expanded && (
                <div className="mt-3 overflow-hidden rounded-xl border">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-500">
                      <tr>
                        <th className="py-2 pl-3 pr-2 text-left">#</th>
                        {Object.keys(product.variants[0].attrs).map((k) => (
                          <th key={k} className="py-2 px-2 text-left">{k}</th>
                        ))}
                        <th className="py-2 px-2 text-left">SKU</th>
                        <th className="py-2 px-2 text-right">가격</th>
                        <th className="py-2 px-2 text-left">바코드(최대3)</th>
                        <th className="py-2 px-3 text-right">액션</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.variants.map((v, i) => (
                        <tr key={v.id} className="border-t">
                          <td className="py-2 pl-3 pr-2 text-gray-500">{i + 1}</td>
                          {Object.values(v.attrs).map((val, idx) => (
                            <td key={idx} className="py-2 px-2">{String(val)}</td>
                          ))}
                          <td className="py-2 px-2 font-mono text-xs">{v.sku}</td>
                          <td className="py-2 px-2 text-right">{krw(v.price)}</td>
                          <td className="py-2 px-2 text-gray-600">{(v.barcode || []).slice(0, 3).join(", ") || "-"}</td>
                          <td className="py-2 px-3 text-right">
                            <button
                              className="text-xs px-2 py-1 border rounded-lg hover:bg-gray-50"
                              onClick={(e) => {e.stopPropagation(); alert(`옵션 수정: ${v.id}`);}}
                            >
                              수정
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ---------- ProductList ----------
const ProductList: React.FC = () => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // 필터링
  const filtered = useMemo(() => {
    let list = [...MOCK_PRODUCTS];
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((p) => 
        p.name.toLowerCase().includes(q) || 
        p.code.toLowerCase().includes(q) || 
        p.variants.some((v) => v.sku.toLowerCase().includes(q))
      );
    }
    list.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    return list;
  }, [query]);

  // 페이징
  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleAll = (checked: boolean) => setSelected(checked ? paged.map((p) => p.id) : []);
  const toggleOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelected(prev => [...new Set([...prev, id])]);
    } else {
      setSelected(prev => prev.filter(x => x !== id));
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* 헤더 */}
      <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">📦 상품 관리</h2>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/products/new"
              className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              ➕ 상품 등록
            </Link>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 overflow-auto p-6">
        {/* 검색 */}
        <div className="mb-6 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <input 
                value={query} 
                onChange={e => setQuery(e.target.value)} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="상품명, 코드, SKU 검색..." 
              />
            </div>
            <div className="text-sm text-gray-600">
              총 {total.toLocaleString()}건
            </div>
          </div>
        </div>

        {/* 일괄 작업 */}
        <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox checked={selected.length === paged.length && paged.length > 0} onChange={toggleAll} />
              <span className="text-sm">전체 선택</span>
            </div>
            <div className="flex gap-2">
              <IconBtn disabled={selected.length === 0} onClick={() => alert(`선택 삭제: ${selected.join(", ")}`)}>
                🗑️ 선택 삭제
              </IconBtn>
            </div>
          </div>
        </div>

        {/* 상품 목록 */}
        <div className="space-y-4">
          {paged.map((p) => (
            <ProductCard key={p.id} product={p} selected={selected.includes(p.id)} onToggleSelect={(c) => toggleOne(p.id, c)} />
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <button 
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50" 
              disabled={page === 1} 
              onClick={() => setPage(page - 1)}
            >
              이전
            </button>
            <div className="text-sm text-gray-600">
              페이지 {page} / {totalPages}
            </div>
            <button 
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50" 
              disabled={page === totalPages} 
              onClick={() => setPage(page + 1)}
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
