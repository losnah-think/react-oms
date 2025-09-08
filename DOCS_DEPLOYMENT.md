# 문서 사이트 배포 가이드

React OMS의 사용자 가이드 및 정책서를 MkDocs를 사용해서 온라인으로 배포하는 방법을 안내합니다.

## 🌐 배포 방법 3가지

### 1️⃣ GitHub Pages 자동 배포 (권장)

#### 설정 방법
1. **GitHub 저장소 생성**
   ```bash
   # 새 저장소 생성
   git init
   git remote add origin https://github.com/your-username/react-oms-docs.git
   ```

2. **파일 업로드**
   ```bash
   git add .
   git commit -m "Add MkDocs documentation"
   git push origin main
   ```

3. **GitHub Pages 활성화**
   - GitHub 저장소 → Settings → Pages
   - Source: **GitHub Actions** 선택
   - 자동으로 배포 진행됩니다

#### 배포 URL
```
https://your-username.github.io/react-oms-docs/
```

### 2️⃣ Netlify 배포

#### 설정 방법
1. **Netlify 연동**
   - https://netlify.com 에서 GitHub 저장소 연결

2. **빌드 설정**
   ```yaml
   # netlify.toml
   [build]
     command = "pip install -r requirements.txt && mkdocs build"
     publish = "site"
   
   [build.environment]
     PYTHON_VERSION = "3.9"
   ```

3. **자동 배포**
   - 코드 push시 자동으로 배포됩니다

### 3️⃣ 로컬 개발 서버

#### 개발용 실행
```bash
# 의존성 설치
pip install -r requirements.txt

# 개발 서버 실행
mkdocs serve --dev-addr=127.0.0.1:8080

# 브라우저에서 접속
http://127.0.0.1:8080
```

## 📝 문서 작성 및 관리

### 문서 구조
```
docs/
├── index.md                    # 메인 페이지
├── overview.md                 # 시스템 개요
├── quick-start.md             # 빠른 시작 가이드
├── guide/                     # 사용자 가이드
│   ├── products/
│   │   └── register.md        # 상품 등록 가이드
│   └── ...
├── policy/                    # 정책 문서
│   ├── field-specs.md         # 필드 규격
│   └── input-rules.md         # 입력 규칙
└── stylesheets/
    └── extra.css              # 커스텀 스타일
```

### 새 문서 추가하기

1. **파일 생성**
   ```bash
   # 예: 새로운 가이드 추가
   touch docs/guide/products/list.md
   ```

2. **네비게이션 업데이트**
   ```yaml
   # mkdocs.yml의 nav 섹션에 추가
   nav:
     - 사용자 가이드:
       - 상품 관리:
         - 상품 목록: guide/products/list.md  # 추가
   ```

3. **자동 배포**
   - 파일을 commit & push하면 자동으로 배포됩니다

### Markdown 작성 가이드

#### 기본 문법
```markdown
# 제목 1
## 제목 2
### 제목 3

**굵은 글씨**
*기울임*

- 목록 1
- 목록 2

1. 순서 목록
2. 순서 목록

[링크](https://example.com)
![이미지](images/example.png)
```

#### 고급 기능 (Material 테마)

##### 알림 박스
```markdown
!!! info "정보"
    중요한 정보를 강조할 때 사용합니다.

!!! warning "경고"
    주의해야 할 내용을 표시합니다.

!!! danger "위험"
    치명적인 오류나 금지사항을 표시합니다.

!!! tip "팁"
    유용한 팁을 제공할 때 사용합니다.
```

##### 탭 기능
```markdown
=== "탭 1"
    첫 번째 탭의 내용

=== "탭 2"
    두 번째 탭의 내용
```

##### 코드 블록
```markdown
```python
def hello_world():
    print("Hello, World!")
```
```

##### 테이블
```markdown
| 항목 | 설명 | 비고 |
|------|------|------|
| 상품명 | 필수 | 2-100자 |
| 가격 | 필수 | 100원 이상 |
```

## 🎨 커스터마이징

### 테마 색상 변경
```yaml
# mkdocs.yml
theme:
  name: material
  palette:
    primary: blue      # 메인 컬러
    accent: indigo     # 강조 컬러
```

### 로고 변경
```yaml
theme:
  icon:
    logo: material/store  # Material 아이콘
    # 또는 커스텀 로고:
    # logo: assets/logo.png
```

### 커스텀 CSS
```css
/* docs/stylesheets/extra.css */
.md-typeset h1 {
    color: #1976d2;
}

.md-header {
    background-color: #2196f3;
}
```

## 📈 SEO 및 분석

### 메타데이터 설정
```yaml
# mkdocs.yml
site_name: React OMS 사용자 가이드
site_description: 완벽한 쇼핑몰 관리 시스템 문서
site_author: React OMS Team
site_url: https://your-username.github.io/react-oms-docs/
```

### Google Analytics
```yaml
# mkdocs.yml
google_analytics:
  - 'UA-XXXXXXXX-X'
  - 'auto'
```

### 검색 최적화
```yaml
plugins:
  - search:
      lang: ko
      separator: '[\s\-\.]+|(?=[A-Z])'
```

## 🔧 고급 설정

### 다국어 지원
```yaml
theme:
  language: ko

nav:
  - 한국어:
    - 시작하기: index.md
  - English:
    - Getting Started: en/index.md
```

### PDF 출력 지원
```bash
# 플러그인 설치
pip install mkdocs-pdf-export-plugin

# mkdocs.yml에 추가
plugins:
  - pdf-export:
      verbose: true
      media_type: print
      enabled_if_env: ENABLE_PDF_EXPORT
```

### 댓글 시스템 (Disqus)
```yaml
# mkdocs.yml
extra:
  disqus: 'your-disqus-shortname'
```

## 🚀 성능 최적화

### 이미지 최적화
```markdown
<!-- 반응형 이미지 -->
![상품 등록](images/product-register.png){: style="max-width:800px"}

<!-- 썸네일 -->
[![썸네일](images/thumb.png){: style="width:200px"}](images/full-size.png)
```

### 캐싱 설정
```yaml
# mkdocs.yml
plugins:
  - minify:
      minify_html: true
      minify_js: true
      minify_css: true
```

## 📊 배포 현황

### 현재 배포된 문서들

✅ **완성된 문서:**
- 메인 페이지 (index.md)
- 시스템 개요 (overview.md)  
- 빠른 시작 가이드 (quick-start.md)
- 상품 등록 가이드 (guide/products/register.md)
- 필드 규격 정책 (policy/field-specs.md)
- 입력 규칙 정책 (policy/input-rules.md)

🔄 **작업 중인 문서:**
- 상품 목록 가이드
- 쇼핑몰 연동 가이드
- API 레퍼런스
- 에러 코드 정의

### 접속 정보

**로컬 개발 서버:**
```
http://127.0.0.1:8080
```

**GitHub Pages (배포 후):**
```
https://your-username.github.io/react-oms-docs/
```

## 🛠️ 문제 해결

### 일반적인 문제들

#### 1. 빌드 에러
```bash
# 캐시 정리
mkdocs build --clean

# 의존성 재설치  
pip install -r requirements.txt --force-reinstall
```

#### 2. 이미지 표시 안됨
```markdown
<!-- 절대 경로 사용 -->
![이미지](../images/example.png)

<!-- 상대 경로 확인 -->
![이미지](./images/example.png)
```

#### 3. 한글 폰트 문제
```css
/* docs/stylesheets/extra.css */
.md-typeset {
  font-family: "Malgun Gothic", "맑은 고딕", sans-serif;
}
```

### 지원 및 도움

- **MkDocs 공식 문서**: https://mkdocs.org
- **Material 테마 문서**: https://squidfunk.github.io/mkdocs-material/
- **GitHub Issues**: 문제 신고 및 요청

---

**📚 문서가 성공적으로 배포되었습니다!**
지금 http://127.0.0.1:8080 에서 확인하실 수 있습니다.
