const app = {
    // 하드코딩된 포스트 데이터
    posts: [
        {
            id: 1,
            title: "부산 카미스타 제조업 사옥 인테리어 - 158평 브랜드 서사 공간",
            image: "https://cdn.imweb.me/upload/S20230327c0ff5f00bb0c3/2fea2463e38e2.jpg",
            description: "부산 150평대 스포츠 웨어 제조업 오피스 시공 사례. 블랙 & 쿨 그레이 기반의 모던 시크 무드와 가변적 쇼룸 설계.",
            content: `<h3>공간으로 브랜드 서사를 구현한 부산 150평대 오피스</h3><p>중략...</p>`
        },
        {
            id: 2,
            title: "센텀 라인하우센코리아 사무실 인테리어 - 25평 컴팩트 스마트 오피스",
            image: "https://cdn.imweb.me/upload/S20230327c0ff5f00bb0c3/c0ee45f29beac.png",
            description: "해운대 센텀 25평 사무실 시공 사례. 화이트 & 블루 컬러 테라피와 미니멀리즘 디자인으로 공간 효율 극대화.",
            content: `<h3>브랜드 정체성을 담은 20평대 현대적 업무 환경</h3><p>중략...</p>`
        }
    ],

    init() {
        this.renderPosts();
        this.setupEventListeners();
        this.handleRouting();
        window.addEventListener('hashchange', () => this.handleRouting());
    },

    renderPosts() {
        const grid = document.getElementById('posts-grid');
        if (!grid) return;
        grid.innerHTML = this.posts.map(post => `
            <div class="post-card" onclick="location.hash='#post/${post.id}'">
                ${post.image ? `<img src="${post.image}" class="post-thumb" alt="${post.title}">` : `<div class="post-thumb" style="background: #dd5828; color: white; opacity: 0.1;"></div>`}
                <h3>${post.title}</h3>
            </div>
        `).join('');
    },

    handleRouting() {
        const hash = window.location.hash || '#home';
        const views = document.querySelectorAll('.view');
        views.forEach(v => v.classList.add('hidden'));

        if (hash === '#home') {
            document.getElementById('home-view').classList.remove('hidden');
            this.updateSEO();
        } else if (hash.startsWith('#post/')) {
            const id = parseInt(hash.split('/')[1]);
            this.showDetail(id);
        } else if (hash === '#admin') {
            this.showAdmin();
        } else if (hash === '#naver-crawler') {
            this.showNaverCrawler();
        }
    },

    showAdmin() {
        const pass = prompt("관리자 암호를 입력하세요:");
        if (pass === "1") {
            document.getElementById('admin-view').classList.remove('hidden');
        } else {
            alert("비밀번호가 틀렸습니다.");
            location.hash = '#home';
        }
    },

    showNaverCrawler() {
        const pass = prompt("admin 암호를 입력하세요:");
        if (pass === "2") {
            document.getElementById('naver-crawler-view').classList.remove('hidden');
        } else {
            alert("비밀번호가 틀렸습니다.");
            location.hash = '#home';
        }
    },

    updateSEO(post = null) {
        // SEO 로직 (기존과 동일)
        document.title = post ? post.title : "부산 사무실 인테리어 사례";
    },

    showDetail(id) {
        const post = this.posts.find(p => p.id === id);
        if (!post) { location.hash = '#home'; return; }
        const content = document.getElementById('post-detail-content');
        if (!content) return;
        content.innerHTML = `<h2>${post.title}</h2><div class="detail-body">${post.content}</div>`;
        document.getElementById('detail-view').classList.remove('hidden');
        window.scrollTo(0, 0);
    },

    setupEventListeners() {
        const adminBtn = document.getElementById('admin-btn');
        if (adminBtn) adminBtn.addEventListener('click', () => location.hash = '#admin');

        const realAdminBtn = document.getElementById('real-admin-btn');
        if (realAdminBtn) realAdminBtn.addEventListener('click', () => location.hash = '#naver-crawler');
        
        const privacyBtn = document.getElementById('privacy-btn');
        if (privacyBtn) privacyBtn.addEventListener('click', () => this.toggleModal(true));
        
        const closeBtn = document.querySelector('.close');
        if (closeBtn) closeBtn.addEventListener('click', () => this.toggleModal(false));

        const startCrawlBtn = document.getElementById('start-crawl-btn');
        if (startCrawlBtn) startCrawlBtn.addEventListener('click', () => this.startCrawl());

        const downloadExcelBtn = document.getElementById('download-excel-btn');
        if (downloadExcelBtn) downloadExcelBtn.addEventListener('click', () => this.downloadExcel());
    },

    async startCrawl() {
        const blogId = document.getElementById('blog-id-input').value.trim();
        if (!blogId) { alert("블로그 아이디를 입력하세요."); return; }

        const status = document.getElementById('crawl-status');
        const resultsArea = document.getElementById('crawler-results-area');
        const resultsBody = document.getElementById('results-body');
        const totalSpan = document.getElementById('total-count');
        const downloadBtn = document.getElementById('download-excel-btn');

        status.innerText = "모바일 버전 접속 시도 중...";
        resultsArea.classList.remove('hidden');
        resultsBody.innerHTML = '';
        this.crawlData = [];
        downloadBtn.disabled = true;

        try {
            // 모바일 포스트 목록 URL (party_p_pool 기준 테스트 최적화)
            let currentPage = 1;
            let hasNext = true;
            let totalProcessed = 0;

            while (hasNext) {
                status.innerText = `목록 수집 중... (페이지 ${currentPage})`;
                // 모바일 리스트 API (JSON 아님, HTML 파싱용)
                const listUrl = `https://m.blog.naver.com/PostList.naver?blogId=${blogId}&currentPage=${currentPage}`;
                const listContent = await this.fetchWithProxy(listUrl);
                
                const parser = new DOMParser();
                const doc = parser.parseFromString(listContent, 'text/html');
                
                // 모바일 버전의 게시글 목록 아이템 추출
                const postItems = doc.querySelectorAll('ul.list_post li');
                if (!postItems || postItems.length === 0) {
                    // 데스크탑 스킨인 경우 다른 셀렉터 시도
                    const otherItems = doc.querySelectorAll('.item');
                    if (!otherItems || otherItems.length === 0) {
                        hasNext = false;
                        break;
                    }
                }

                for (const item of postItems) {
                    const linkAnchor = item.querySelector('a.link');
                    if (!linkAnchor) continue;

                    const title = item.querySelector('.title')?.innerText.trim() || "제목 없음";
                    const logNo = linkAnchor.getAttribute('href').split('logNo=')[1]?.split('&')[0];
                    const fullUrl = `https://blog.naver.com/${blogId}/${logNo}`;

                    totalProcessed++;
                    status.innerText = `대기 중 (4~6초)... [${totalProcessed}번째 작업]`;
                    
                    // 4~6초 지연
                    await new Promise(res => setTimeout(resolve, Math.floor(Math.random() * 2001) + 4000));

                    status.innerText = `본문 추출 중: ${title}`;
                    const postData = await this.fetchPostDetail(blogId, logNo, title, fullUrl);
                    
                    this.crawlData.push(postData);
                    this.renderCrawlRow(postData, totalProcessed);
                    totalSpan.innerText = totalProcessed;
                }

                // 다음 페이지 체크 (party_p_pool은 9개라 1페이지면 끝)
                if (postItems.length < 10) {
                    hasNext = false;
                } else {
                    currentPage++;
                }
            }

            status.innerText = "모든 작업이 성공적으로 완료되었습니다!";
            downloadBtn.disabled = false;

        } catch (error) {
            console.error(error);
            status.innerText = `오류 발생: ${error.message}. (브라우저의 CORS 차단 가능성이 큽니다.)`;
        }
    },

    async fetchPostDetail(blogId, logNo, title, fullUrl) {
        const detailUrl = `https://m.blog.naver.com/PostView.naver?blogId=${blogId}&logNo=${logNo}`;
        try {
            const content = await this.fetchWithProxy(detailUrl);
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, 'text/html');

            // 모바일 본문 컨테이너 (.se-main-container 또는 .post_ct)
            const contentDiv = doc.querySelector('.se-main-container') || doc.querySelector('#post_1') || doc.querySelector('.post_ct');
            const contentText = contentDiv ? contentDiv.innerText : "본문을 찾을 수 없음";
            const charCount = contentText.replace(/\s/g, '').length;

            // 누락 여부 확인
            const isOmitted = await this.checkOmission(title, fullUrl);

            return { title, url: fullUrl, content: contentText, charCount, isOmitted };
        } catch (e) {
            return { title, url: fullUrl, content: "추출 실패", charCount: 0, isOmitted: "확인불가" };
        }
    },

    async checkOmission(title, targetUrl) {
        const searchUrl = `https://search.naver.com/search.naver?where=view&query=${encodeURIComponent(title)}`;
        try {
            const content = await this.fetchWithProxy(searchUrl);
            const logNo = targetUrl.split('/').pop();
            return content.includes(logNo) ? "정상" : "누락";
        } catch (e) {
            return "오류";
        }
    },

    async fetchWithProxy(url) {
        // AllOrigins 프록시 사용 (실패 시 에러 처리 강화)
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
        if (!response.ok) throw new Error("프록시 서버 응답 실패");
        const data = await response.json();
        return data.contents;
    },

    renderCrawlRow(data, index) {
        const resultsBody = document.getElementById('results-body');
        const tr = document.createElement('tr');
        const omissionColor = data.isOmitted === "정상" ? "#28a745" : (data.isOmitted === "누락" ? "#dc3545" : "#6c757d");
        tr.innerHTML = `
            <td style="padding: 10px; border: 1px solid #eee; text-align: center;">${index}</td>
            <td style="padding: 10px; border: 1px solid #eee;">${data.title}</td>
            <td style="padding: 10px; border: 1px solid #eee;"><a href="${data.url}" target="_blank">링크</a></td>
            <td style="padding: 10px; border: 1px solid #eee; text-align: center;">${data.charCount}</td>
            <td style="padding: 10px; border: 1px solid #eee; text-align: center; font-weight: bold; color: ${omissionColor}">${data.isOmitted}</td>
        `;
        resultsBody.appendChild(tr);
    },

    downloadExcel() {
        if (!this.crawlData || this.crawlData.length === 0) return;
        const excelData = this.crawlData.map((item, index) => ({
            "번호": index + 1,
            "제목": item.title,
            "URL": item.url,
            "글자수(공백제외)": item.charCount,
            "누락여부": item.isOmitted,
            "내용": item.content.substring(0, 5000)
        }));
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "결과");
        XLSX.writeFile(workbook, `blog_result.xlsx`);
    },

    toggleModal(show) {
        const modal = document.getElementById('privacy-modal');
        if (modal) modal.style.display = show ? 'block' : 'none';
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());
