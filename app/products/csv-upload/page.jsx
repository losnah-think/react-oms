"use client";
import { useState } from 'react';
import { detectPlatform, transformPlatformData, sendToBackend, validateCSVFile, PLATFORM_MAPPINGS } from '../../../lib/csv-processor';

const CSVUploadPage = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [detectedPlatform, setDetectedPlatform] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState(''); // 사용자가 수동으로 선택한 플랫폼
  const [csvData, setCsvData] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [validationResult, setValidationResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // 파일 검증
    const validation = validateCSVFile(file);
    setValidationResult(validation);

    if (!validation.isValid) {
      alert('파일 검증 실패: ' + validation.errors.join(', '));
      return;
    }

    if (validation.warnings.length > 0) {
      console.warn('파일 경고:', validation.warnings);
    }

    setUploadedFile(file);
    analyzeCSVFile(file);
  };

  const analyzeCSVFile = async (file) => {
    setIsAnalyzing(true);
    
    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim()); // 빈 줄 제거
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      
      // 고급 플랫폼 감지
      const detection = detectPlatform(headers);
      
      // 데이터 파싱 (상위 5개 행만 미리보기)
      const dataRows = lines.slice(1, 6).map(line => {
        const cells = line.split(',').map(cell => cell.trim().replace(/"/g, ''));
        const rowObject = {};
        headers.forEach((header, index) => {
          rowObject[header] = cells[index] || '';
        });
        return rowObject;
      });

      setDetectedPlatform(detection.platform);
      setSelectedPlatform(detection.platform); // 자동 감지된 플랫폼을 기본값으로 설정
      setCsvData({ 
        headers, 
        dataRows: lines.slice(1, 6).map(line => 
          line.split(',').map(cell => cell.trim().replace(/"/g, ''))
        ), 
        totalRows: lines.length - 1,
        rawDataRows: dataRows // 객체 형태로도 저장
      });
      
      setAnalysisResult({
        ...detection,
        headers: headers.length,
        rows: lines.length - 1,
        characteristics: PLATFORM_MAPPINGS[detection.platform]?.characteristics || null
      });
    } catch (error) {
      console.error('CSV 분석 중 오류:', error);
      alert('CSV 파일 분석 중 오류가 발생했습니다.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getPlatformName = (platform) => {
    return PLATFORM_MAPPINGS[platform]?.name || '알 수 없음';
  };

  const handleProcessData = async () => {
    if (!uploadedFile || !csvData.rawDataRows) return;

    const finalPlatform = selectedPlatform || detectedPlatform; // 선택된 플랫폼 우선 사용
    if (!finalPlatform) {
      alert('플랫폼을 선택해주세요.');
      return;
    }

    setIsProcessing(true);
    
    try {
      // 전체 파일 다시 읽기
      const text = await uploadedFile.text();
      const lines = text.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      
      // 전체 데이터 파싱
      const allDataRows = lines.slice(1).map(line => {
        const cells = line.split(',').map(cell => cell.trim().replace(/"/g, ''));
        const rowObject = {};
        headers.forEach((header, index) => {
          rowObject[header] = cells[index] || '';
        });
        return rowObject;
      });

      // 플랫폼별 데이터 변환
      const transformedData = transformPlatformData(finalPlatform, allDataRows);
      
      // 백엔드로 전송 (실제로는 API 호출)
      console.log('Transformed Data:', transformedData);
      console.log('Platform:', finalPlatform);
      console.log('Total Rows:', transformedData.length);
      
      // 실제 환경에서는 아래 주석을 해제하여 백엔드 API 호출
      // const result = await sendToBackend(finalPlatform, transformedData);
      // console.log('Backend Response:', result);
      
      alert(`✅ ${getPlatformName(finalPlatform)} 데이터 ${transformedData.length}개 상품이 성공적으로 처리되었습니다!`);
      
    } catch (error) {
      console.error('데이터 처리 중 오류:', error);
      alert('❌ 데이터 처리 중 오류가 발생했습니다: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">CSV 상품 등록</h1>
        <p className="text-gray-600">
          쇼핑몰별 상품 데이터 CSV 파일을 업로드하면 자동으로 플랫폼을 감지하여 처리합니다.
        </p>
      </div>

      {/* 업로드 섹션 */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">📁 파일 업로드</h2>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <div className="space-y-4">
            <div className="text-4xl">📄</div>
            <div>
              <label className="cursor-pointer">
                <span className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  CSV 파일 선택
                </span>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-sm text-gray-500">
              또는 CSV 파일을 여기로 드래그 앤 드롭하세요
            </p>
          </div>
        </div>

        {uploadedFile && validationResult && (
          <div className="mt-4 space-y-2">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm">
                ✅ 파일 업로드됨: <strong>{uploadedFile.name}</strong> ({(uploadedFile.size / 1024).toFixed(1)} KB)
              </p>
            </div>
            {validationResult.warnings.length > 0 && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  ⚠️ 경고: {validationResult.warnings.join(', ')}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 분석 결과 */}
      {isAnalyzing && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="animate-spin text-blue-600">⟳</div>
            <span className="text-blue-800">CSV 파일을 분석 중입니다...</span>
          </div>
        </div>
      )}

      {analysisResult && (
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">🔍 분석 결과</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">자동 감지된 플랫폼</div>
              <div className="text-xl font-bold text-blue-600">
                {getPlatformName(analysisResult.platform)}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">감지 신뢰도</div>
              <div className={`text-xl font-bold ${analysisResult.confidence >= 80 ? 'text-green-600' : analysisResult.confidence >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                {analysisResult.confidence}%
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">컬럼 수</div>
              <div className="text-xl font-bold text-gray-800">
                {analysisResult.headers}개
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">데이터 행</div>
              <div className="text-xl font-bold text-gray-800">
                {analysisResult.rows}개
              </div>
            </div>
          </div>

          {/* 플랫폼 수동 선택 섹션 */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-yellow-900 mb-3">🎯 플랫폼 선택 (필수)</h3>
            <p className="text-yellow-800 text-sm mb-4">
              자동 감지 결과를 확인하고, 올바른 플랫폼을 선택해주세요. 잘못된 플랫폼 선택 시 데이터 처리에 문제가 발생할 수 있습니다.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(PLATFORM_MAPPINGS).map(([key, mapping]) => (
                <label key={key} className="cursor-pointer">
                  <input
                    type="radio"
                    name="platformSelect"
                    value={key}
                    checked={selectedPlatform === key}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    selectedPlatform === key
                      ? 'border-blue-500 bg-blue-50 text-blue-800'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  } ${key === detectedPlatform ? 'ring-2 ring-green-300' : ''}`}>
                    <div className="font-medium">{mapping.name}</div>
                    <div className="text-xs mt-1 opacity-75">
                      {mapping.requiredColumns.slice(0, 2).join(', ')}...
                    </div>
                    {key === detectedPlatform && (
                      <div className="text-xs text-green-600 font-medium mt-1">
                        🤖 자동 감지됨
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
            
            {selectedPlatform && selectedPlatform !== detectedPlatform && (
              <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-orange-800 text-sm">
                  ⚠️ 자동 감지 결과와 다른 플랫폼을 선택하셨습니다. 
                  <strong>{getPlatformName(selectedPlatform)}</strong>로 처리됩니다.
                </p>
              </div>
            )}
          </div>

          {/* 플랫폼별 특징 안내 */}
          {analysisResult.characteristics && (
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <h3 className="font-medium text-blue-900 mb-2">🎯 감지된 플랫폼 특징</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                <div><strong>인코딩:</strong> {analysisResult.characteristics.encoding}</div>
                <div><strong>구분자:</strong> {analysisResult.characteristics.delimiter}</div>
                <div><strong>헤더:</strong> {analysisResult.characteristics.hasHeader ? '있음' : '없음'}</div>
                <div><strong>가격 형식:</strong> {analysisResult.characteristics.priceFormat}</div>
              </div>
            </div>
          )}

          {/* 전체 플랫폼 감지 기준 안내 */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h3 className="font-medium text-gray-900 mb-2">📋 지원 플랫폼별 주요 컬럼</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {Object.entries(PLATFORM_MAPPINGS).map(([key, mapping]) => (
                <div key={key} className={key === selectedPlatform ? 'bg-blue-100 p-2 rounded' : ''}>
                  <strong>{mapping.name}:</strong> {mapping.requiredColumns.join(', ')}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 데이터 미리보기 */}
      {csvData.headers && (
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">👀 데이터 미리보기</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {csvData.headers.slice(0, 8).map((header, index) => (
                    <th
                      key={index}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                  {csvData.headers.length > 8 && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ... +{csvData.headers.length - 8}개 컬럼
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {csvData.dataRows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
                    {row.slice(0, 8).map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap max-w-32 truncate"
                        title={cell}
                      >
                        {cell || '-'}
                      </td>
                    ))}
                    {row.length > 8 && (
                      <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                        ...
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {csvData.totalRows > 5 && (
            <p className="mt-3 text-sm text-gray-500">
              ... 및 {csvData.totalRows - 5}개 행 더 있음
            </p>
          )}
        </div>
      )}

      {/* 처리 버튼 */}
      {analysisResult && (
        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                데이터 처리 준비 완료
              </h3>
              <p className="text-gray-600">
                {selectedPlatform ? (
                  <>
                    <strong>{getPlatformName(selectedPlatform)}</strong> 형식으로 {analysisResult.rows}개 상품을 처리합니다.
                    {selectedPlatform !== detectedPlatform && (
                      <span className="text-orange-600 ml-2">
                        (자동 감지: {getPlatformName(detectedPlatform)})
                      </span>
                    )}
                  </>
                ) : (
                  '위에서 플랫폼을 선택해주세요.'
                )}
              </p>
            </div>
            <button
              onClick={handleProcessData}
              disabled={isProcessing || !analysisResult || !selectedPlatform}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                isProcessing || !analysisResult || !selectedPlatform
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isProcessing ? (
                <>
                  <span className="animate-spin mr-2">⟳</span>
                  처리 중...
                </>
              ) : (
                '🚀 데이터 처리 시작'
              )}
            </button>
          </div>
          
          {!selectedPlatform && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">
                ⚠️ 데이터 처리를 위해 플랫폼을 선택해주세요.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 도움말 */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 사용 가이드</h3>
        <div className="space-y-2 text-blue-800 text-sm">
          <p>• <strong>지원 플랫폼:</strong> 자사, Cafe24, 위사몰, 고도몰5, 네이버 스마트스토어, 메이크샵</p>
          <p>• <strong>파일 형식:</strong> CSV 파일만 지원 (UTF-8 인코딩 권장)</p>
          <p>• <strong>자동 감지:</strong> 컬럼명을 분석하여 플랫폼을 자동으로 감지합니다</p>
          <p>• <strong>수동 선택:</strong> 자동 감지 결과를 확인하고 올바른 플랫폼을 직접 선택할 수 있습니다</p>
          <p>• <strong>자사 양식:</strong> 공급처, 상품코드, 상품명, 옵션명 등 자사 고유 컬럼을 인식합니다</p>
          <p>• <strong>데이터 처리:</strong> 백엔드에서 플랫폼별로 다른 로직으로 처리됩니다</p>
        </div>
        
        <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2">🏢 자사 양식 특징</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-blue-700">
            <div>• <strong>필수 컬럼:</strong> 공급처, 상품코드, 상품명, 옵션명</div>
            <div>• <strong>가격 정보:</strong> 대표판매가, 원가, 공급가, 마진금액</div>
            <div>• <strong>옵션 처리:</strong> 옵션명, 색상, 사이즈 분리 인식</div>
            <div>• <strong>재고 관리:</strong> 현재재고, 안정재고 구분</div>
            <div>• <strong>바코드:</strong> 최대 3개 바코드 지원</div>
            <div>• <strong>공급처 정보:</strong> 공급처명, 위치, 연락처 포함</div>
          </div>
          
          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-yellow-800 text-xs">
              💡 <strong>주의:</strong> 자동 감지가 정확하지 않을 수 있으니, 반드시 플랫폼 선택을 확인해주세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSVUploadPage;
