const app = {
    // 검색 엔진 수집을 위한 하드코딩된 게시글 데이터 (최적화된 6개 슬롯)
    posts: [
        {
            id: 1,
            title: "부산 카미스타 제조업 사옥 인테리어 - 158평 브랜드 서사 공간",
            image: "https://cdn.imweb.me/upload/S20230327c0ff5f00bb0c3/2fea2463e38e2.jpg",
            description: "부산 150평대 스포츠 웨어 제조업 오피스 시공 사례. 블랙 & 쿨 그레이 기반의 모던 시크 무드와 가변적 쇼룸 설계.",
            content: `
                <h3>공간으로 브랜드 서사를 구현한 부산 150평대 오피스</h3>
                <p><b>1. 디자인 컨셉: 브랜드 서사의 공간화</b><br>
                블랙 & 쿨 그레이 기반의 모던 시크 무드에 짙은 우드 텍스처를 더해 시각적 깊이감과 브랜드의 신뢰감을 구현했습니다. 단순 사무실을 넘어 스포츠웨어 브랜드의 역동성을 투영한 브랜딩 공간입니다.</p>
                <p><b>2. 공간 설계 핵심 포인트</b><br>
                폴딩도어 시스템을 통해 독립적 쇼룸과 개방형 이벤트 홀을 오가는 유연한 레이아웃을 구축했습니다. 매립형 유니폼 갤러리 월과 집중 조명을 활용해 브랜드 히스토리를 시각화했습니다.</p>
                <p><b>3. 관련 법령 및 준수 사항</b><br>
                건축물의 피난·방화구조 기준에 따른 불연·준불연 마감재 검토와 150평 이상 규모에 따른 소방 준공 기준을 완벽히 준수했습니다.</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p><a href="https://indecompany.imweb.me/A02/?q=YToxOntzOjEyOiJrZXl3b3JkX3R5cGUiO3M6MzoiYWxsIjt9&bmode=view&idx=169938782&t=board" target="_blank" style="color: #dd5828; font-weight: bold; text-decoration: none;">👉 부산사무실인테리어 본문 보러가기</a></p>
                <p><a href="https://pbn-2.pages.dev/" target="_blank" style="color: #dd5828; font-weight: bold; text-decoration: none;">👉 부산인테리어사례모음 보러가기</a></p>
                <p style="font-size: 12px; color: #888; margin-top: 10px;">출처: 인디컴퍼니 홈페이지</p>
            `
        },
        {
            id: 2,
            title: "센텀 라인하우센코리아 사무실 인테리어 - 25평 컴팩트 스마트 오피스",
            image: "https://cdn.imweb.me/upload/S20230327c0ff5f00bb0c3/c0ee45f29beac.png",
            description: "해운대 센텀 25평 사무실 시공 사례. 화이트 & 블루 컬러 테라피와 미니멀리즘 디자인으로 공간 효율 극대화.",
            content: `
                <h3>브랜드 정체성을 담은 20평대 현대적 업무 환경</h3>
                <p><b>1. 디자인 컨셉: 신뢰감 있는 비즈니스 이미지</b><br>
                화이트 베이스에 브랜드 상징색인 블루(Blue)를 포인트로 활용하여 시각적 확장감을 확보했습니다. 군더더기 없는 미니멀리즘 디자인으로 20평대 공간 효율을 극대화했습니다.</p>
                <p><b>2. 공간 설계 및 기능적 요소</b><br>
                순환형 동선 설계로 간섭을 최소화하고 유리 파티션을 활용해 개방감을 주었습니다. 매립형 슬림 엣지 조명으로 업무 몰입도를 높이는 환경을 제공합니다.</p>
                <p><b>3. 관련 법령 및 관리 규정</b><br>
                지식산업센터 공사 신고 및 승인 절차를 이행하고, 실 구획 변경에 따른 스프링클러 및 감지기 증설 등 소방 법규를 준수했습니다.</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p><a href="https://indecompany.imweb.me/A02/?q=YToxOntzOjEyOiJrZXl3b3JkX3R5cGUiO3M6MzoiYWxsIjt9&bmode=view&idx=166094211&t=board" target="_blank" style="color: #dd5828; font-weight: bold; text-decoration: none;">👉 부산사무실인테리어 본문 보러가기</a></p>
                <p><a href="https://pbn-2.pages.dev/" target="_blank" style="color: #dd5828; font-weight: bold; text-decoration: none;">👉 부산인테리어사례모음 보러가기</a></p>
                <p style="font-size: 12px; color: #888; margin-top: 10px;">출처: 인디컴퍼니 홈페이지</p>
            `
        },
        {
            id: 3,
            title: "부산 연제구 사무실 인테리어 - 30평 웜 화이트 & 우드 감성 오피스",
            image: "https://cdn.imweb.me/upload/S20230327c0ff5f00bb0c3/b86a7b9950617.jpg",
            description: "연제구 30평 사무실 인테리어. 웜 화이트와 우드의 조화로 고급스럽고 편안한 라운지 중심 공간 설계.",
            content: `
                <h3>따뜻한 감성과 효율적 레이아웃의 조화</h3>
                <p><b>1. 디자인 컨셉: 웜 화이트와 우드</b><br>
                따뜻한 웜 화이트 베이스에 우드 마감재를 매치하여 편안한 분위기를 조성했습니다. 유행을 타지 않는 기본 마감에 가구 스타일링으로 다채로움을 더했습니다.</p>
                <p><b>2. 공간 설계 및 레이아웃</b><br>
                벽체 구분을 최소화하여 답답함을 줄이고 휴게 공간(라운지), 카페테리아에 비중을 두어 직원 복지를 강화했습니다. 넉넉한 유격 공간 확보로 쾌적한 독립 업무 환경을 제공합니다.</p>
                <p><b>3. 시공 효율 및 디테일</b><br>
                가성비 높은 마감재를 활용해 30평 기준 약 10일 만에 공사를 완료하며 시공 효율을 극대화한 현장입니다.</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p><a href="https://indecompany.imweb.me/A02/?q=YToxOntzOjEyOiJrZXl3b3JkX3R5cGUiO3M6MzoiYWxsIjt9&bmode=view&idx=122712325&t=board" target="_blank" style="color: #dd5828; font-weight: bold; text-decoration: none;">👉 부산사무실인테리어 본문 보러가기</a></p>
                <p><a href="https://pbn-2.pages.dev/" target="_blank" style="color: #dd5828; font-weight: bold; text-decoration: none;">👉 부산인테리어사례모음 보러가기</a></p>
                <p style="font-size: 12px; color: #888; margin-top: 10px;">출처: 인디컴퍼니 홈페이지</p>
            `
        },
        {
            id: 4,
            title: "부산 명지 사옥 인테리어 - 하이엔드 내추럴 럭셔리 오피스 솔루션",
            image: "https://cdn.imweb.me/upload/S20230327c0ff5f00bb0c3/0f12857611c77.jpg",
            description: "명지신도시 대규모 사옥 프로젝트. 우드 필름과 곡선미를 활용한 프리미엄 수직 공간 브랜딩 사례.",
            content: `
                <h3>우드와 곡선미가 어우러진 하이엔드 사옥 인테리어</h3>
                <p>로비부터 5층까지 대규모 수직 공간을 하나의 브랜드 서사로 연결했습니다. 내추럴 럭셔리(Natural Luxury)를 지향하며 도심 속 자연의 온기를 담았습니다.</p>
                <p><b>1. 톤앤매너: 프리미엄 우드 무드</b><br>
                실제 원목의 질감을 구현한 우드 필름 마감으로 정돈된 이미지와 심리적 안정감을 동시에 확보했습니다.</p>
                <p><b>2. 핵심 디자인 포인트</b><br>
                계단 구조물과 플랜테리어를 결합하여 사옥의 상징적인 오브제를 완성했습니다. 곡선형 원형 회의실은 유연한 소통 분위기를 유도하며 시각적 리듬감을 부여합니다.</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p><a href="https://indecompany.imweb.me/A02/?q=YToxOntzOjEyOiJrZXl3b3JkX3R5cGUiO3M6MzoiYWxsIjt9&bmode=view&idx=166084218&t=board" target="_blank" style="color: #dd5828; font-weight: bold; text-decoration: none;">👉 부산사무실인테리어 본문 보러가기</a></p>
                <p><a href="https://pbn-2.pages.dev/" target="_blank" style="color: #dd5828; font-weight: bold; text-decoration: none;">👉 부산인테리어사례모음 보러가기</a></p>
                <p style="font-size: 12px; color: #888; margin-top: 10px;">출처: 인디컴퍼니 홈페이지</p>
            `
        },
        {
            id: 5,
            title: "명지 프레스티지바이오파마IDC 사옥 인테리어 - 바이오 기업의 기능미",
            image: "https://cdn.imweb.me/upload/S20230327c0ff5f00bb0c3/54460625eb866.jpg",
            description: "글로벌 바이오 사옥 인테리어. 흡음 설계 세미나실과 브랜드 아이덴티티를 담은 고품격 연구 공간.",
            content: `
                <h3>글로벌 바이오 기업의 위상과 정체성을 담은 공간</h3>
                <p><b>1. 세미나실: 고성능 흡음 설계</b><br>
                대규모 소통을 위해 벽면과 천장에 흡음 패널을 도입, 시각적 따뜻함과 청각적 안정감을 동시에 제공하는 고품격 강연 환경을 완성했습니다.</p>
                <p><b>2. VIP실 & 스태프실</b><br>
                VIP실은 스페셜 페인팅으로 하이엔드 무드를, 스태프실은 브랜드 컬러인 블루를 활용해 몰입형 오피스를 구축했습니다.</p>
                <p><b>3. 디자인 밸런스</b><br>
                우드와 메탈 소재를 믹스하여 미래지향적인 이미지와 인간 중심적인 따뜻함 사이의 균형을 맞춘 프로젝트입니다.</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p><a href="https://indecompany.imweb.me/A02/?q=YToxOntzOjEyOiJrZXl3b3JkX3R5cGUiO3M6MzoiYWxsIjt9&bmode=view&idx=166081237&t=board" target="_blank" style="color: #dd5828; font-weight: bold; text-decoration: none;">👉 부산사무실인테리어 본문 보러가기</a></p>
                <p><a href="https://pbn-2.pages.dev/" target="_blank" style="color: #dd5828; font-weight: bold; text-decoration: none;">👉 부산인테리어사례모음 보러가기</a></p>
                <p style="font-size: 12px; color: #888; margin-top: 10px;">출처: 인디컴퍼니 홈페이지</p>
            `
        },
        {
            id: 6,
            title: "명지 마리넥스 사무실 인테리어 - 38평 스마트 해양 오피스",
            image: "https://cdn.imweb.me/upload/S20230327c0ff5f00bb0c3/cf6c3fc010aac.jpg",
            description: "명지신도시 38평 사무실 시공 사례. 해양을 모티브로 한 딥블루 포인트와 개방감 있는 레이아웃.",
            content: `
                <h3>해양의 서사를 담은 스마트 오피스 솔루션</h3>
                <p><b>1. 톤앤매너: 화이트 & 딥블루 대비</b><br>
                슈퍼 화이트 톤으로 확장감을 주고, 딥블루 컬러를 포인트로 활용해 현대적이고 신뢰감 있는 브랜드 인상을 전달합니다.</p>
                <p><b>2. 디자인 모티브</b><br>
                수평선을 닮은 리니어 조명과 곡선형 가구 배치로 해양의 유연함을 표현했습니다. 유리 파티션으로 개방감과 독립성을 동시에 확보했습니다.</p>
                <p><b>3. 업무 최적화</b><br>
                눈부심 방지 LED 조명과 넉넉한 배선 통로 확보로 현대 오피스의 편의성을 극대화한 38평 스마트 워크스테이션입니다.</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p><a href="https://indecompany.imweb.me/A02/?q=YToxOntzOjEyOiJrZXl3b3JkX3R5cGUiO3M6MzoiYWxsIjt9&bmode=view&idx=166171577&t=board" target="_blank" style="color: #dd5828; font-weight: bold; text-decoration: none;">👉 부산사무실인테리어 본문 보러가기</a></p>
                <p><a href="https://pbn-2.pages.dev/" target="_blank" style="color: #dd5828; font-weight: bold; text-decoration: none;">👉 부산인테리어사례모음 보러가기</a></p>
                <p style="font-size: 12px; color: #888; margin-top: 10px;">출처: 인디컴퍼니 홈페이지</p>
            `
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
        }
    },

    showDetail(id) {
        const post = this.posts.find(p => p.id === id);
        if (!post) { location.hash = '#home'; return; }

        this.updateSEO(post);

        const otherPosts = this.posts.filter(p => p.id !== id).slice(0, 3);

        const content = document.getElementById('post-detail-content');
        if (!content) return;
        content.innerHTML = `
            <div class="post-content-area">
                <h2 style="color: #dd5828; margin-bottom: 20px; line-height: 1.4;">${post.title}</h2>
                ${post.image ? `<img src="${post.image}" style="width:100%; border-radius:8px; margin-bottom:20px;" alt="${post.title}">` : ''}
                <div class="detail-body">${post.content}</div>
            </div>

            <div class="related-posts">
                <h3 class="related-title">다른 게시물 더보기</h3>
                <div class="related-grid">
                    ${otherPosts.map(p => `
                        <div class="related-card" onclick="location.hash='#post/${p.id}'">
                            <div class="related-thumb" style="background-image: url('${p.image || ''}')"></div>
                            <div class="related-info">
                                <h4>${p.title}</h4>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div style="text-align: center; margin-top: 30px;">
                    <a href="#home" class="btn-more-view">전체 사례 보기</a>
                </div>
            </div>
        `;
        document.getElementById('detail-view').classList.remove('hidden');
        window.scrollTo(0, 0);
    },

    updateSEO(post = null) {
        const baseUrl = "https://officeinteriors.pages.dev/";
        const siteName = "부산 사무실 인테리어 사례";
        const defaultDesc = "부산 지역 사무실 인테리어 전문 시공 사례 모음. 사옥, 오피스, 사무실 등 업종별 맞춤 디자인과 합리적인 견적 정보를 확인하세요.";
        const defaultImg = "https://officeinteriors.pages.dev/og-image.jpg";

        let title, description, url, image, type;

        if (post) {
            title = `${post.title} | ${siteName}`;
            description = post.description || title;
            url = `${baseUrl}#post/${post.id}`;
            image = post.image || defaultImg;
            type = "article";
        } else {
            title = `${siteName} | 전문 시공 포트폴리오`;
            description = defaultDesc;
            url = baseUrl;
            image = defaultImg;
            type = "website";
        }

        document.title = title;
        const descMeta = document.querySelector('meta[name="description"]');
        if (descMeta) descMeta.setAttribute("content", description);
        
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', url);

        const ogTags = {
            'og:title': title,
            'og:description': description,
            'og:url': url,
            'og:image': image,
            'og:type': type
        };
        for (const [prop, val] of Object.entries(ogTags)) {
            let el = document.querySelector(`meta[property="${prop}"]`);
            if (el) el.setAttribute("content", val);
        }

        const twitterTags = {
            'twitter:title': title,
            'twitter:description': description,
            'twitter:url': url,
            'twitter:image': image
        };
        for (const [name, val] of Object.entries(twitterTags)) {
            let el = document.querySelector(`meta[name="${name}"]`);
            if (el) el.setAttribute("content", val);
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

    setupEventListeners() {
        const adminBtn = document.getElementById('admin-btn');
        if (adminBtn) adminBtn.addEventListener('click', () => location.hash = '#admin');
        
        const privacyBtn = document.getElementById('privacy-btn');
        if (privacyBtn) privacyBtn.addEventListener('click', () => this.toggleModal(true));
        
        const closeBtn = document.querySelector('.close');
        if (closeBtn) closeBtn.addEventListener('click', () => this.toggleModal(false));
        
        const fileInput = document.getElementById('post-image-file');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (readerEvent) => {
                        this.uploadedImage = readerEvent.target.result;
                        document.getElementById('image-preview').innerHTML = `<img src="${this.uploadedImage}" style="max-width:200px;">`;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        const postForm = document.getElementById('post-form');
        if (postForm) postForm.addEventListener('submit', (e) => this.handlePostSubmit(e));
        
        window.onclick = (event) => {
            const modal = document.getElementById('privacy-modal');
            if (event.target == modal) this.toggleModal(false);
        };
    },

    execCmd(command, value = null) {
        document.execCommand(command, false, value);
    },

    handlePostSubmit(e) {
        e.preventDefault();
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-body').innerHTML;

        const newPost = {
            id: Date.now(),
            title,
            image: this.uploadedImage || "",
            content,
            description: title
        };

        this.posts.unshift(newPost);
        this.renderPosts();
        alert("게시글이 임시 등록되었습니다.");
        location.hash = '#home';
    },

    toggleModal(show) {
        const modal = document.getElementById('privacy-modal');
        if (modal) modal.style.display = show ? 'block' : 'none';
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());
