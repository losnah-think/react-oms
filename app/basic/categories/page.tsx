"use client";
import React, { useState } from 'react';
import { 
  PageHeader,
  Button,
  Card,
  Input,
  Badge,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  SearchFilterBar,
  Pagination,
  Modal,
  EmptyState,
  useToast
} from '../../components';

interface Category {
  id: string;
  name: string;
  description: string;
  level: number;
  parentId?: string;
  isActive: boolean;
  productCount: number;
  createdAt: string;
}

const SAMPLE_CATEGORIES: Category[] = [
  {
    id: 'cat-001',
    name: '의류',
    description: '모든 의류 상품',
    level: 1,
    isActive: true,
    productCount: 156,
    createdAt: '2025-09-01T10:00:00'
  },
  {
    id: 'cat-002',
    name: '상의',
    description: '셔츠, 블라우스, 티셔츠 등',
    level: 2,
    parentId: 'cat-001',
    isActive: true,
    productCount: 89,
    createdAt: '2025-09-02T10:00:00'
  },
  {
    id: 'cat-003',
    name: '하의',
    description: '바지, 스커트, 반바지 등',
    level: 2,
    parentId: 'cat-001',
    isActive: true,
    productCount: 67,
    createdAt: '2025-09-03T10:00:00'
  },
  {
    id: 'cat-004',
    name: '악세서리',
    description: '모든 악세서리 상품',
    level: 1,
    isActive: false,
    productCount: 23,
    createdAt: '2025-09-04T10:00:00'
  }
];

export default function CategoriesPage() {
  const [categories] = useState<Category[]>(SAMPLE_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const { addToast } = useToast();

  const itemsPerPage = 10;
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage);

  const handleCreateCategory = () => {
    // 실제로는 API 호출
    addToast('success', `새 카테고리 "${newCategoryName}"가 생성되었습니다.`);
    setIsModalOpen(false);
    setNewCategoryName('');
    setNewCategoryDescription('');
  };

  const handleDeleteCategory = (categoryId: string, categoryName: string) => {
    // 실제로는 API 호출
    addToast('success', `카테고리 "${categoryName}"가 삭제되었습니다.`);
  };

  const handleToggleActive = (categoryId: string, categoryName: string, isActive: boolean) => {
    // 실제로는 API 호출
    addToast('info', `카테고리 "${categoryName}"가 ${isActive ? '활성화' : '비활성화'}되었습니다.`);
  };

  const breadcrumb = [
    { label: '홈', href: '/' },
    { label: '기초 관리', href: '/basic' },
    { label: '카테고리 관리' }
  ];

  return (
    <div className="h-full flex flex-col">
      <PageHeader
        title="카테고리 관리"
        description="상품 카테고리를 관리하고 계층 구조를 설정할 수 있습니다."
        breadcrumb={breadcrumb}
        action={
          <Button 
            variant="primary" 
            onClick={() => setIsModalOpen(true)}
            icon="➕"
          >
            새 카테고리 추가
          </Button>
        }
      />

      <div className="flex-1 p-6">
        <Card>
          <SearchFilterBar
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            placeholder="카테고리명, 설명으로 검색..."
            actions={
              <>
                <Button variant="outline" size="sm">
                  📤 내보내기
                </Button>
                <Button variant="outline" size="sm">
                  🔄 새로고침
                </Button>
              </>
            }
          />

          {displayedCategories.length === 0 ? (
            <EmptyState
              icon="📂"
              title="카테고리가 없습니다"
              description="첫 번째 카테고리를 추가해보세요."
              action={
                <Button 
                  variant="primary" 
                  onClick={() => setIsModalOpen(true)}
                >
                  카테고리 추가
                </Button>
              }
            />
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>카테고리명</TableHead>
                    <TableHead>설명</TableHead>
                    <TableHead>레벨</TableHead>
                    <TableHead>상품 수</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>등록일</TableHead>
                    <TableHead className="text-right">액션</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {category.level === 2 && (
                            <span className="text-gray-400 ml-4">└</span>
                          )}
                          {category.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {category.description}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={category.level === 1 ? 'primary' : 'secondary'}
                          size="sm"
                        >
                          Level {category.level}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-blue-600">
                          {category.productCount}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={category.isActive ? 'success' : 'secondary'}
                          size="sm"
                        >
                          {category.isActive ? '활성' : '비활성'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-500">
                        {new Date(category.createdAt).toLocaleDateString('ko-KR')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <Button 
                            variant="outline" 
                            size="xs"
                            onClick={() => handleToggleActive(
                              category.id, 
                              category.name, 
                              !category.isActive
                            )}
                          >
                            {category.isActive ? '비활성화' : '활성화'}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="xs"
                            onClick={() => addToast('info', '수정 기능은 준비중입니다.')}
                          >
                            수정
                          </Button>
                          <Button 
                            variant="danger" 
                            size="xs"
                            onClick={() => handleDeleteCategory(category.id, category.name)}
                          >
                            삭제
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={filteredCategories.length}
                itemsPerPage={itemsPerPage}
              />
            </>
          )}
        </Card>
      </div>

      {/* 새 카테고리 추가 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="새 카테고리 추가"
        size="md"
        footer={
          <>
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
            >
              취소
            </Button>
            <Button 
              variant="primary"
              onClick={handleCreateCategory}
              disabled={!newCategoryName.trim()}
            >
              생성
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="카테고리명"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="카테고리명을 입력하세요"
            fullWidth
          />
          <Input
            label="설명"
            value={newCategoryDescription}
            onChange={(e) => setNewCategoryDescription(e.target.value)}
            placeholder="카테고리 설명을 입력하세요"
            fullWidth
          />
        </div>
      </Modal>
    </div>
  );
}