'use client';

import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { Modal } from '../../components/common/Modal';
import { Pagination } from '../../components/common/Pagination';
import { Icon3D } from '../../components/ui/Icons3D';
import { Illustration3D } from '../../components/ui/Illustrations3D';

interface Brand {
  id: string;
  name: string;
  nameEn: string;
  description?: string;
  website?: string;
  logo?: string;
  country: string;
  category: string;
  status: 'active' | 'inactive';
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

const SAMPLE_BRANDS: Brand[] = [
  {
    id: 'BRD-001',
    name: '나이키',
    nameEn: 'Nike',
    description: '글로벌 스포츠웨어 브랜드',
    website: 'https://nike.com',
    logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
    country: '미국',
    category: '스포츠/아웃도어',
    status: 'active',
    productCount: 1247,
    createdAt: '2024-01-15T09:30:00Z',
    updatedAt: '2024-03-20T14:22:00Z'
  },
  {
    id: 'BRD-002',
    name: '아디다스',
    nameEn: 'Adidas',
    description: '독일의 스포츠용품 제조업체',
    website: 'https://adidas.com',
    logo: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=100&h=100&fit=crop',
    country: '독일',
    category: '스포츠/아웃도어',
    status: 'active',
    productCount: 892,
    createdAt: '2024-01-20T11:15:00Z',
    updatedAt: '2024-03-18T16:45:00Z'
  },
  {
    id: 'BRD-003',
    name: 'LG전자',
    nameEn: 'LG Electronics',
    description: '한국의 전자제품 제조업체',
    website: 'https://lg.com',
    country: '한국',
    category: '전자제품',
    status: 'active',
    productCount: 2156,
    createdAt: '2024-02-01T08:20:00Z',
    updatedAt: '2024-03-22T10:30:00Z'
  },
  {
    id: 'BRD-004',
    name: '코카콜라',
    nameEn: 'Coca-Cola',
    description: '세계적인 음료 브랜드',
    website: 'https://coca-cola.com',
    country: '미국',
    category: '음료/식품',
    status: 'inactive',
    productCount: 45,
    createdAt: '2024-02-10T15:40:00Z',
    updatedAt: '2024-02-28T12:15:00Z'
  },
  {
    id: 'BRD-005',
    name: '삼성전자',
    nameEn: 'Samsung Electronics',
    description: '한국의 대표 전자제품 브랜드',
    website: 'https://samsung.com',
    country: '한국',
    category: '전자제품',
    status: 'active',
    productCount: 3421,
    createdAt: '2024-01-05T07:10:00Z',
    updatedAt: '2024-03-25T09:45:00Z'
  }
];

const COUNTRIES = ['전체', '한국', '미국', '독일', '일본', '중국', '기타'];
const CATEGORIES = ['전체', '스포츠/아웃도어', '전자제품', '음료/식품', '패션/의류', '화장품/뷰티', '기타'];
const STATUS_OPTIONS = ['전체', '활성', '비활성'];

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>(SAMPLE_BRANDS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('전체');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedStatus, setSelectedStatus] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // 폼 상태
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    description: '',
    website: '',
    country: '',
    category: '',
    status: 'active' as 'active' | 'inactive'
  });

  const itemsPerPage = 10;

  // 필터링된 브랜드 목록
  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         brand.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === '전체' || brand.country === selectedCountry;
    const matchesCategory = selectedCategory === '전체' || brand.category === selectedCategory;
    const matchesStatus = selectedStatus === '전체' || 
                         (selectedStatus === '활성' && brand.status === 'active') ||
                         (selectedStatus === '비활성' && brand.status === 'inactive');

    return matchesSearch && matchesCountry && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredBrands.length / itemsPerPage);
  const paginatedBrands = filteredBrands.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreateBrand = () => {
    const newBrand: Brand = {
      id: `BRD-${String(brands.length + 1).padStart(3, '0')}`,
      ...formData,
      productCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setBrands([...brands, newBrand]);
    setIsCreateModalOpen(false);
    setFormData({
      name: '',
      nameEn: '',
      description: '',
      website: '',
      country: '',
      category: '',
      status: 'active'
    });
    showSuccessToast('브랜드가 성공적으로 생성되었습니다.');
  };

  const handleEditBrand = () => {
    if (!editingBrand) return;

    const updatedBrands = brands.map(brand =>
      brand.id === editingBrand.id
        ? { ...brand, ...formData, updatedAt: new Date().toISOString() }
        : brand
    );

    setBrands(updatedBrands);
    setIsEditModalOpen(false);
    setEditingBrand(null);
    setFormData({
      name: '',
      nameEn: '',
      description: '',
      website: '',
      country: '',
      category: '',
      status: 'active'
    });
    showSuccessToast('브랜드가 성공적으로 수정되었습니다.');
  };

  const handleDeleteBrand = (brandId: string) => {
    if (window.confirm('정말로 이 브랜드를 삭제하시겠습니까?')) {
      setBrands(brands.filter(brand => brand.id !== brandId));
      showSuccessToast('브랜드가 성공적으로 삭제되었습니다.');
    }
  };

  const openEditModal = (brand: Brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      nameEn: brand.nameEn,
      description: brand.description || '',
      website: brand.website || '',
      country: brand.country,
      category: brand.category,
      status: brand.status
    });
    setIsEditModalOpen(true);
  };

  const showSuccessToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="브랜드 관리"
        description="상품 브랜드를 등록하고 관리할 수 있습니다"
        breadcrumb={[
          { label: '기초 관리', href: '/basic' },
          { label: '브랜드 관리', href: '/basic/brands' }
        ]}
      />

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">전체 브랜드</p>
              <p className="text-3xl font-bold text-blue-900">{brands.length}</p>
            </div>
            <div className="p-3 bg-blue-200 rounded-xl">
              <Icon3D.Basic />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">활성 브랜드</p>
              <p className="text-3xl font-bold text-green-900">
                {brands.filter(b => b.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-green-200 rounded-xl">
              <Icon3D.Success />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">총 상품수</p>
              <p className="text-3xl font-bold text-purple-900">
                {brands.reduce((sum, b) => sum + b.productCount, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-200 rounded-xl">
              <Icon3D.Products />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">국가</p>
              <p className="text-3xl font-bold text-orange-900">
                {new Set(brands.map(b => b.country)).size}
              </p>
            </div>
            <div className="p-3 bg-orange-200 rounded-xl">
              <Icon3D.Settings />
            </div>
          </div>
        </Card>
      </div>

      {/* 검색 및 필터 */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="브랜드명 또는 영문명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Icon3D.Search />
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">국가:</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                {COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">카테고리:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">상태:</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                {STATUS_OPTIONS.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <Icon3D.Plus />
              브랜드 추가
            </Button>
          </div>
        </div>
      </Card>

      {/* 브랜드 테이블 */}
      <Card>
        {filteredBrands.length > 0 ? (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead style={{ width: '80px' }}>로고</TableHead>
                  <TableHead>브랜드명</TableHead>
                  <TableHead>영문명</TableHead>
                  <TableHead>국가</TableHead>
                  <TableHead>카테고리</TableHead>
                  <TableHead className="text-right">상품수</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>최종수정일</TableHead>
                  <TableHead style={{ width: '120px' }}>액션</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedBrands.map((brand) => (
                  <TableRow key={brand.id}>
                    <TableCell>
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                        {brand.logo ? (
                          <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-gray-400 text-xs">No Logo</div>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div>
                        <div className="font-semibold text-gray-900">{brand.name}</div>
                        {brand.description && (
                          <div className="text-sm text-gray-500 truncate max-w-xs">{brand.description}</div>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="font-medium text-gray-700">{brand.nameEn}</span>
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {brand.country}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {brand.category}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <span className="font-semibold text-blue-600">
                        {brand.productCount.toLocaleString()}
                      </span>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={brand.status === 'active' ? 'success' : 'secondary'}
                        className="text-xs"
                      >
                        {brand.status === 'active' ? '활성' : '비활성'}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <span className="text-sm text-gray-500">
                        {new Date(brand.updatedAt).toLocaleDateString('ko-KR')}
                      </span>
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditModal(brand)}
                          className="p-2"
                        >
                          <Icon3D.Edit />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteBrand(brand.id)}
                          className="p-2 hover:bg-red-50 hover:border-red-200"
                        >
                          <Icon3D.Delete />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="p-4 border-t border-gray-200">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredBrands.length}
                itemsPerPage={itemsPerPage}
              />
            </div>
          </>
        ) : (
          <div className="p-12 text-center">
            <div className="mb-4 flex justify-center">
              <Illustration3D.EmptyBox />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">브랜드가 없습니다</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedCountry !== '전체' || selectedCategory !== '전체' || selectedStatus !== '전체'
                ? '검색 조건에 맞는 브랜드를 찾을 수 없습니다.'
                : '첫 번째 브랜드를 추가해보세요.'}
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Icon3D.Plus />
              브랜드 추가
            </Button>
          </div>
        )}
      </Card>

      {/* 브랜드 생성 모달 */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="새 브랜드 추가"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="브랜드명 *"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="브랜드명을 입력하세요"
            />
            <Input
              label="영문명"
              value={formData.nameEn}
              onChange={(e) => setFormData(prev => ({ ...prev, nameEn: e.target.value }))}
              placeholder="영문명을 입력하세요"
            />
          </div>

          <Input
            label="설명"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="브랜드 설명을 입력하세요"
          />

          <Input
            label="웹사이트"
            value={formData.website}
            onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
            placeholder="https://..."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">국가 *</label>
              <select
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">선택하세요</option>
                {COUNTRIES.filter(c => c !== '전체').map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">카테고리 *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">선택하세요</option>
                {CATEGORIES.filter(c => c !== '전체').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="active"
                  checked={formData.status === 'active'}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'active' }))}
                  className="mr-2"
                />
                활성
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="inactive"
                  checked={formData.status === 'inactive'}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'inactive' }))}
                  className="mr-2"
                />
                비활성
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsCreateModalOpen(false)}
            >
              취소
            </Button>
            <Button
              onClick={handleCreateBrand}
              disabled={!formData.name || !formData.country || !formData.category}
            >
              생성
            </Button>
          </div>
        </div>
      </Modal>

      {/* 브랜드 수정 모달 */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="브랜드 수정"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="브랜드명 *"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="브랜드명을 입력하세요"
            />
            <Input
              label="영문명"
              value={formData.nameEn}
              onChange={(e) => setFormData(prev => ({ ...prev, nameEn: e.target.value }))}
              placeholder="영문명을 입력하세요"
            />
          </div>

          <Input
            label="설명"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="브랜드 설명을 입력하세요"
          />

          <Input
            label="웹사이트"
            value={formData.website}
            onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
            placeholder="https://..."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">국가 *</label>
              <select
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">선택하세요</option>
                {COUNTRIES.filter(c => c !== '전체').map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">카테고리 *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">선택하세요</option>
                {CATEGORIES.filter(c => c !== '전체').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">상태</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="active"
                  checked={formData.status === 'active'}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'active' }))}
                  className="mr-2"
                />
                활성
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="inactive"
                  checked={formData.status === 'inactive'}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'inactive' }))}
                  className="mr-2"
                />
                비활성
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
            >
              취소
            </Button>
            <Button
              onClick={handleEditBrand}
              disabled={!formData.name || !formData.country || !formData.category}
            >
              수정
            </Button>
          </div>
        </div>
      </Modal>

      {/* 토스트 메시지 */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
