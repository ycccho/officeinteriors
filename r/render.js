/**
 * ============================================================================
 * [GOLDEN MASTER v3.3] INDE_RENDER 2K Studio — Browser Engine
 * ============================================================================
 * - Active Model (ONLY): models/gemini-3.1-flash-image
 * - Active Resolution (ONLY): "2K" (generationConfig.imageConfig.imageSize = "2K")
 * - Batch Upload Limit: Up to 10 images per batch (MAX_BATCH_SIZE = 10)
 * - Multi-Image Policy: ALWAYS treated as a single project site
 * - API Key Default: Empty ("") as requested — zero accidental billing
 * ============================================================================
 */
(function () {
    'use strict';

    // 1. Locked Engine Constants (v3.3 Spec)
    const DEFAULT_API_KEY = ''; // 비워둠 (추후 사용 시 입력)
    const STORAGE_API_KEY = 'inde_render_v33_api_key';
    const FINAL_MODEL = 'gemini-3.1-flash-image';
    const FINAL_IMAGE_SIZE = '2K';
    const MAX_BATCH_SIZE = 10;
    const COST_PER_IMAGE_KRW = 140.5;

    // 2. Universal Zero-Invention & Crisp Text JSON Specification (v3.3)
    const UNIVERSAL_ZERO_INVENTION_JSON = {
        role: 'Deterministic Architectural PBR Renderer',
        task: 'Convert the attached 3D viewport capture into a realistic 2K architectural photograph by removing black CAD edge lines and polygon wireframe meshes, and applying realistic surface textures and natural lighting.',
        absolute_core_laws: {
            law_1_never_delete_existing: 'Do NOT remove or omit anything present in the original image. Every existing object, fixture, and structure in the original image must remain in its exact place.',
            law_2_never_invent_missing: 'Do NOT create or add anything that does not exist in the original image. Blank ceilings and blank walls must stay completely blank.',
            law_3_shared_space_and_ceiling_uniformity: 'Ceilings within the image, and any shared architectural areas (ceilings, walls, floors) appearing across 2 or more images of the same space, MUST maintain a strictly uniform color tone, brightness, and material finish.',
            law_4_crisp_text_and_lettering_preservation: 'Any text, lettering, or typography visible in the original image MUST be preserved with razor-sharp clarity — keep the exact original spelling, character shapes, font proportions, and color without garbling, warping, or blurring the letters.',
            law_5_polygon_mesh_cleanup: 'Remove black 3D triangulation wireframe lines on curved furniture and render them as smooth, realistic surfaces in their original color.'
        },
        structure_lock: {
            camera_and_framing: 'identical camera angle, focal length, perspective lines, and aspect ratio crop as the original image',
            geometry_and_layout: 'identical planes, recesses, grid lines, openings, and silhouettes as the original image'
        },
        photographic_setup: {
            camera_body: 'full-frame architectural camera, tripod-mounted and levelled',
            lens: '24mm perspective-control tilt-shift lens, strictly parallel vertical lines',
            aperture: 'f/8',
            iso: '100',
            exposure_technique: "balanced flambient architectural exposure faithful to the original image's brightness and color temperature with soft natural daylight and realistic contact shadows",
            white_balance: '4800K clean neutral daylight',
            depth_of_field: 'deep and tack-sharp from foreground to background'
        },
        output: {
            aspect_ratio: 'identical to the original input image',
            resolution: '2K'
        },
        negative_prompt: [
            'sketch outlines', 'black contour lines', 'CAD wireframe edges', 'polygon triangulation mesh',
            'added objects', 'deleted objects', 'garbled text', 'deformed letters', 'broken typography',
            'inconsistent ceiling color', 'inconsistent material tone', '3D render', 'CGI'
        ]
    };

    // 3. DOM Elements
    const apiKeyInput = document.getElementById('api-key-input');
    const toggleKeyVisBtn = document.getElementById('toggle-key-vis');
    const saveApiKeyBtn = document.getElementById('save-api-key-btn');
    const clearApiKeyBtn = document.getElementById('clear-api-key-btn');
    const apiStatusBadge = document.getElementById('api-status-badge');
    const customNoteInput = document.getElementById('custom-note-input');
    const estimatedCostBadge = document.getElementById('estimated-cost-badge');

    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('file-input');
    const queueCountBadge = document.getElementById('queue-count-badge');
    const clearQueueBtn = document.getElementById('clear-queue-btn');
    const uploadQueueEl = document.getElementById('upload-queue');

    const paletteBar = document.getElementById('palette-bar');
    const toggleJsonBtn = document.getElementById('toggle-json-btn');
    const jsonPreviewEl = document.getElementById('json-preview');
    const swatchCeiling = document.getElementById('swatch-ceiling');
    const swatchFloor = document.getElementById('swatch-floor');
    const swatchDark = document.getElementById('swatch-dark');
    const swatchWarm = document.getElementById('swatch-warm');
    const hexCeiling = document.getElementById('hex-ceiling');
    const hexFloor = document.getElementById('hex-floor');
    const hexDark = document.getElementById('hex-dark');
    const hexWarm = document.getElementById('hex-warm');

    const batchStatusText = document.getElementById('batch-status-text');
    const batchProgressBar = document.getElementById('batch-progress-bar');
    const startRenderBtn = document.getElementById('start-render-btn');
    const downloadAllBtn = document.getElementById('download-all-btn');

    const resultsSection = document.getElementById('results-section');
    const resultsGrid = document.getElementById('results-grid');

    // 4. State
    let queueItems = []; // { id, file, name, objectUrl, imgElement, width, height, jpegB64, smallRgbArray, status, renderedUrl, renderedBlob, renderWidth, renderHeight, elapsedSec }
    let currentMutualPalette = null;
    let isRendering = false;

    // 5. Initialize API Key State (Default Blank)
    function getActiveApiKey() {
        const inputVal = (apiKeyInput.value || '').trim();
        if (inputVal) return inputVal;
        return DEFAULT_API_KEY;
    }

    function refreshApiStatusBadge() {
        const key = getActiveApiKey();
        if (key) {
            apiStatusBadge.textContent = 'API 연결 준비됨';
            apiStatusBadge.classList.remove('pill-standby');
            apiStatusBadge.classList.add('pill-ready');
        } else {
            apiStatusBadge.textContent = 'API 미설정 (대기 모드)';
            apiStatusBadge.classList.add('pill-standby');
            apiStatusBadge.classList.remove('pill-ready');
        }
    }

    const savedKey = localStorage.getItem(STORAGE_API_KEY) || DEFAULT_API_KEY;
    apiKeyInput.value = savedKey;
    refreshApiStatusBadge();

    apiKeyInput.addEventListener('input', refreshApiStatusBadge);

    toggleKeyVisBtn.addEventListener('click', () => {
        if (apiKeyInput.type === 'password') {
            apiKeyInput.type = 'text';
            toggleKeyVisBtn.textContent = '숨김';
        } else {
            apiKeyInput.type = 'password';
            toggleKeyVisBtn.textContent = '표시';
        }
    });

    saveApiKeyBtn.addEventListener('click', () => {
        const key = (apiKeyInput.value || '').trim();
        if (key) {
            localStorage.setItem(STORAGE_API_KEY, key);
        } else {
            localStorage.removeItem(STORAGE_API_KEY);
        }
        refreshApiStatusBadge();
    });

    clearApiKeyBtn.addEventListener('click', () => {
        apiKeyInput.value = '';
        localStorage.removeItem(STORAGE_API_KEY);
        refreshApiStatusBadge();
    });

    customNoteInput.addEventListener('input', updateJsonPreview);

    toggleJsonBtn.addEventListener('click', () => {
        const isHidden = jsonPreviewEl.classList.toggle('hidden');
        toggleJsonBtn.textContent = isHidden
            ? '전송될 v3.3 JSON 프롬프트 보기 ▼'
            : '전송될 v3.3 JSON 프롬프트 접기 ▲';
    });

    // 6. Image Preprocessing & Mutual Palette Extraction (Exact Port of Python v3.3)
    function loadImageElement(objectUrl) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = objectUrl;
        });
    }

    function imageElementToJpegB64(img, maxW = 2048) {
        let targetW = img.naturalWidth || img.width;
        let targetH = img.naturalHeight || img.height;
        if (targetW > maxW) {
            targetH = Math.round(targetH * (maxW / targetW));
            targetW = maxW;
        }
        const canvas = document.createElement('canvas');
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, targetW, targetH);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.94);
        return dataUrl.split(',')[1];
    }

    function extractDownsampledRgb(img, sampleW = 160, sampleH = 90) {
        const canvas = document.createElement('canvas');
        canvas.width = sampleW;
        canvas.height = sampleH;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, sampleW, sampleH);
        const { data } = ctx.getImageData(0, 0, sampleW, sampleH);
        const pixels = [];
        for (let i = 0; i < data.length; i += 4) {
            pixels.push([data[i], data[i + 1], data[i + 2]]);
        }
        return pixels;
    }

    function toHex(r, g, b) {
        const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)));
        return (
            '#' +
            clamp(r).toString(16).padStart(2, '0').toUpperCase() +
            clamp(g).toString(16).padStart(2, '0').toUpperCase() +
            clamp(b).toString(16).padStart(2, '0').toUpperCase()
        );
    }

    function buildMutualPaletteSummary(items) {
        if (!items || items.length === 0) return null;

        const allPx = [];
        for (const item of items) {
            if (item.smallRgbArray) {
                for (const px of item.smallRgbArray) {
                    allPx.push(px);
                }
            }
        }

        function meanHex(predicate, fallback) {
            let sumR = 0, sumG = 0, sumB = 0, count = 0;
            for (let i = 0; i < allPx.length; i++) {
                const [r, g, b] = allPx[i];
                const lum = 0.299 * r + 0.587 * g + 0.114 * b;
                const maxC = Math.max(r, g, b);
                const minC = Math.min(r, g, b);
                const sat = maxC > 0 ? (maxC - minC) / maxC : 0;
                if (predicate(r, g, b, lum, sat)) {
                    sumR += r;
                    sumG += g;
                    sumB += b;
                    count++;
                }
            }
            if (count < 50) return fallback;
            return toHex(sumR / count, sumG / count, sumB / count);
        }

        const whiteCeilingHex = meanHex((r, g, b, lum, sat) => lum > 220 && sat < 0.10, '#F3F3F1');
        const floorTileHex = meanHex((r, g, b, lum, sat) => lum >= 135 && lum <= 195 && sat < 0.12, '#A8A6A1');
        const darkWoodHex = meanHex((r, g, b, lum, sat) => lum >= 55 && lum < 125 && r >= b, '#5A524B');
        const lightWoodOrWallHex = meanHex((r, g, b, lum, sat) => lum >= 140 && lum <= 220 && sat >= 0.10 && r > b, '#C9B9A6');

        return {
            rawHex: {
                ceiling: whiteCeilingHex,
                floor: floorTileHex,
                dark: darkWoodHex,
                warm: lightWoodOrWallHex
            },
            shared_space_uniformity_rule: {
                core_directive: 'Ceilings within the image, and any shared areas of the same space appearing across 2 or more images, MUST maintain uniform color tone and material finish:',
                uniform_ceiling_tone: `${whiteCeilingHex} (Uniform matte ceiling tone across all views)`,
                uniform_floor_tone: `${floorTileHex} (Uniform matte floor tile tone across all views)`,
                uniform_dark_surface_tone: `${darkWoodHex} (Uniform dark wood/panel tone across shared surfaces)`,
                uniform_warm_surface_tone: `${lightWoodOrWallHex} (Uniform light wood/wall tone across shared surfaces)`,
                uniform_lighting: 'Uniform 4800K neutral daylight balance and identical exposure across all views'
            }
        };
    }

    function buildPromptObject(mutualPaletteSpec, customNote) {
        const promptObj = JSON.parse(JSON.stringify(UNIVERSAL_ZERO_INVENTION_JSON));
        if (mutualPaletteSpec && mutualPaletteSpec.shared_space_uniformity_rule) {
            promptObj.multi_image_shared_space_consistency = mutualPaletteSpec.shared_space_uniformity_rule;
        }
        if (customNote && customNote.trim()) {
            promptObj.custom_user_directive = customNote.trim();
        }
        return promptObj;
    }

    function updateJsonPreview() {
        if (queueItems.length === 0) {
            paletteBar.classList.add('hidden');
            return;
        }
        paletteBar.classList.remove('hidden');
        currentMutualPalette = buildMutualPaletteSummary(queueItems);

        if (currentMutualPalette) {
            const { ceiling, floor, dark, warm } = currentMutualPalette.rawHex;
            swatchCeiling.style.backgroundColor = ceiling;
            swatchFloor.style.backgroundColor = floor;
            swatchDark.style.backgroundColor = dark;
            swatchWarm.style.backgroundColor = warm;
            hexCeiling.textContent = ceiling;
            hexFloor.textContent = floor;
            hexDark.textContent = dark;
            hexWarm.textContent = warm;
        }

        const promptObj = buildPromptObject(
            queueItems.length > 1 ? currentMutualPalette : null,
            customNoteInput.value
        );
        jsonPreviewEl.textContent = JSON.stringify(promptObj, null, 2);
    }

    // 7. Queue Management & UI Rendering
    async function addFilesToQueue(fileList) {
        if (isRendering) return;
        const incoming = Array.from(fileList).filter((f) => f.type.startsWith('image/'));
        if (incoming.length === 0) return;

        const availableSlots = MAX_BATCH_SIZE - queueItems.length;
        if (availableSlots <= 0) {
            alert(`최대 ${MAX_BATCH_SIZE}장까지만 한꺼번에 업로드할 수 있습니다.`);
            return;
        }

        const filesToProcess = incoming.slice(0, availableSlots);
        if (incoming.length > availableSlots) {
            alert(`최대 ${MAX_BATCH_SIZE}장 제한으로 인해 앞의 ${availableSlots}장만 추가되었습니다.`);
        }

        for (const file of filesToProcess) {
            const objectUrl = URL.createObjectURL(file);
            try {
                const img = await loadImageElement(objectUrl);
                const jpegB64 = imageElementToJpegB64(img, 2048);
                const smallRgbArray = extractDownsampledRgb(img, 160, 90);
                queueItems.push({
                    id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
                    file,
                    name: file.name,
                    objectUrl,
                    width: img.naturalWidth || img.width,
                    height: img.naturalHeight || img.height,
                    jpegB64,
                    smallRgbArray,
                    status: 'waiting',
                    renderedUrl: null,
                    renderedBlob: null,
                    renderWidth: 0,
                    renderHeight: 0,
                    elapsedSec: null
                });
            } catch (err) {
                console.error('이미지 로드 실패:', file.name, err);
                URL.revokeObjectURL(objectUrl);
            }
        }

        renderQueueUI();
        updateJsonPreview();
    }

    function removeQueueItem(id) {
        if (isRendering) return;
        const idx = queueItems.findIndex((item) => item.id === id);
        if (idx !== -1) {
            if (queueItems[idx].objectUrl) URL.revokeObjectURL(queueItems[idx].objectUrl);
            if (queueItems[idx].renderedUrl) URL.revokeObjectURL(queueItems[idx].renderedUrl);
            queueItems.splice(idx, 1);
            renderQueueUI();
            updateJsonPreview();
            renderResultsGallery();
        }
    }

    function clearQueue() {
        if (isRendering) return;
        for (const item of queueItems) {
            if (item.objectUrl) URL.revokeObjectURL(item.objectUrl);
            if (item.renderedUrl) URL.revokeObjectURL(item.renderedUrl);
        }
        queueItems = [];
        currentMutualPalette = null;
        batchProgressBar.style.width = '0%';
        renderQueueUI();
        updateJsonPreview();
        renderResultsGallery();
    }

    function renderQueueUI() {
        const count = queueItems.length;
        queueCountBadge.textContent = `${count} / ${MAX_BATCH_SIZE}장`;
        const totalCost = Math.round(count * COST_PER_IMAGE_KRW);
        estimatedCostBadge.textContent = `예상 비용: 약 ${totalCost.toLocaleString('ko-KR')}원 (장당 약 140.5원)`;

        clearQueueBtn.disabled = count === 0 || isRendering;
        startRenderBtn.disabled = count === 0 || isRendering;

        const completedCount = queueItems.filter((i) => i.status === 'done').length;
        downloadAllBtn.disabled = completedCount === 0 || isRendering;

        if (count === 0) {
            batchStatusText.textContent = '이미지를 업로드하면 2K 일괄 변환 준비가 완료됩니다.';
        } else if (!isRendering) {
            batchStatusText.textContent =
                count > 1
                    ? `단일 현장 ${count}장 상호 팔레트 동기화 준비 완료 (공통 천장·바닥·벽 색감 고정)`
                    : `단일 컷 2K 변환 준비 완료`;
        }

        uploadQueueEl.innerHTML = '';
        queueItems.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'queue-card';

            let statusLabel = '대기 중';
            let statusClass = 'status-waiting';
            if (item.status === 'running') {
                statusLabel = '2K 렌더링 중...';
                statusClass = 'status-running';
            } else if (item.status === 'done') {
                statusLabel = `완료 (${item.elapsedSec}s)`;
                statusClass = 'status-done';
            } else if (item.status === 'error') {
                statusLabel = '오류';
                statusClass = 'status-error';
            }

            card.innerHTML = `
                <div class="queue-thumb-wrap">
                    <img src="${item.objectUrl}" alt="${item.name}" class="queue-thumb">
                    <span class="queue-index-badge">#${index + 1}</span>
                    <button type="button" class="queue-remove-btn" data-id="${item.id}" title="제거">✕</button>
                </div>
                <div class="queue-meta">
                    <div class="queue-filename" title="${item.name}">${item.name}</div>
                    <div class="queue-sub">
                        <span>${item.width}×${item.height}</span>
                        <span class="${statusClass}">${statusLabel}</span>
                    </div>
                </div>
            `;
            uploadQueueEl.appendChild(card);
        });

        uploadQueueEl.querySelectorAll('.queue-remove-btn').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                removeQueueItem(btn.getAttribute('data-id'));
            });
        });
    }

    // 8. Dropzone Events
    dropzone.addEventListener('click', () => {
        if (!isRendering) fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
            addFilesToQueue(e.target.files);
            fileInput.value = '';
        }
    });

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (!isRendering) dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (!isRendering && e.dataTransfer && e.dataTransfer.files) {
            addFilesToQueue(e.dataTransfer.files);
        }
    });

    clearQueueBtn.addEventListener('click', clearQueue);

    // 9. API Call: Single 2K Render (Strictly 1 Image in inlineData)
    async function generateSingle2K(targetSketchB64, mutualPaletteSpec, customNote, apiKey) {
        const promptObj = buildPromptObject(mutualPaletteSpec, customNote);

        const parts = [
            {
                text:
                    'TARGET_IMAGE (Absolute Rules: 1. Do NOT delete any object in the original. ' +
                    '2. Do NOT invent anything not in the original. ' +
                    '3. Keep ceiling and shared-space color/material strictly uniform across views. ' +
                    '4. Keep all visible text/letters sharp and identical to the original without distortion):\n' +
                    JSON.stringify(promptObj, null, 2)
            },
            {
                inlineData: {
                    mimeType: 'image/jpeg',
                    data: targetSketchB64
                }
            }
        ];

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${FINAL_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`;
        const payload = {
            contents: [{ parts }],
            generationConfig: {
                responseModalities: ['IMAGE'],
                imageConfig: {
                    imageSize: FINAL_IMAGE_SIZE
                }
            }
        };

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errText}`);
        }

        const respData = await response.json();
        const candidates = respData.candidates || [];
        for (const cand of candidates) {
            const candParts = (cand.content && cand.content.parts) || [];
            for (const part of candParts) {
                if (part.inlineData && part.inlineData.data) {
                    const b64Data = part.inlineData.data;
                    const mimeType = part.inlineData.mimeType || 'image/png';
                    const byteChars = atob(b64Data);
                    const byteNumbers = new Uint8Array(byteChars.length);
                    for (let i = 0; i < byteChars.length; i++) {
                        byteNumbers[i] = byteChars.charCodeAt(i);
                    }
                    const blob = new Blob([byteNumbers], { type: mimeType });
                    return blob;
                }
            }
        }

        throw new Error('모델 응답에서 이미지 데이터를 찾을 수 없습니다.');
    }

    // 10. Batch Execution Loop
    startRenderBtn.addEventListener('click', async () => {
        if (isRendering || queueItems.length === 0) return;

        const apiKey = getActiveApiKey();
        if (!apiKey) {
            alert('현재 API 키가 비워져 있습니다(과금 방지 대기 상태).\n실제 렌더링을 실행하려면 상단 입력란에 Google AI Studio API 키를 입력해 주세요.');
            apiKeyInput.focus();
            return;
        }

        isRendering = true;
        renderQueueUI();

        const mutualPaletteSpec = queueItems.length > 1 ? currentMutualPalette : null;
        const customNote = customNoteInput.value || '';
        const total = queueItems.length;

        for (let idx = 0; idx < total; idx++) {
            const item = queueItems[idx];
            item.status = 'running';
            batchStatusText.textContent = `[${idx + 1}/${total}] 2K 실사 렌더링 진행 중: ${item.name} ...`;
            renderQueueUI();

            const t0 = performance.now();
            try {
                const blob = await generateSingle2K(item.jpegB64, mutualPaletteSpec, customNote, apiKey);
                const renderedUrl = URL.createObjectURL(blob);
                const renImg = await loadImageElement(renderedUrl);

                if (item.renderedUrl) URL.revokeObjectURL(item.renderedUrl);
                item.renderedBlob = blob;
                item.renderedUrl = renderedUrl;
                item.renderWidth = renImg.naturalWidth || renImg.width;
                item.renderHeight = renImg.naturalHeight || renImg.height;
                item.elapsedSec = ((performance.now() - t0) / 1000).toFixed(1);
                item.status = 'done';
            } catch (err) {
                console.error(`렌더링 오류 (${item.name}):`, err);
                item.status = 'error';
                alert(`[${item.name}] 렌더링 중 오류가 발생했습니다:\n${err.message}`);
                break;
            }

            const pct = Math.round(((idx + 1) / total) * 100);
            batchProgressBar.style.width = `${pct}%`;
            renderQueueUI();
            renderResultsGallery();
        }

        isRendering = false;
        const doneCount = queueItems.filter((i) => i.status === 'done').length;
        batchStatusText.textContent = `렌더링 완료: 총 ${total}장 중 ${doneCount}장 2K 변환 성공`;
        renderQueueUI();
        renderResultsGallery();
    });

    // 11. Results Gallery & Interactive Before/After Comparison Slider
    function getOutputFilename(originalName, index) {
        const base = originalName.replace(/\.[^/.]+$/, '');
        return `${base}_View_${String(index + 1).padStart(2, '0')}_2K_Render.png`;
    }

    function triggerDownload(url, filename) {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    function renderResultsGallery() {
        const completed = queueItems
            .map((item, idx) => ({ item, idx }))
            .filter(({ item }) => item.status === 'done' && item.renderedUrl);

        if (completed.length === 0) {
            resultsSection.classList.add('hidden');
            resultsGrid.innerHTML = '';
            return;
        }

        resultsSection.classList.remove('hidden');
        resultsGrid.innerHTML = '';

        completed.forEach(({ item, idx }) => {
            const outName = getOutputFilename(item.name, idx);
            const sizeMB = item.renderedBlob ? (item.renderedBlob.size / (1024 * 1024)).toFixed(2) : '0.00';

            const card = document.createElement('div');
            card.className = 'result-card';
            card.innerHTML = `
                <div class="result-header">
                    <div>
                        <span class="result-title">#${idx + 1} ${outName}</span>
                        <span class="result-meta">${item.renderWidth}×${item.renderHeight} (2K) · ${sizeMB} MB · ${item.elapsedSec}초</span>
                    </div>
                    <button type="button" class="btn-primary single-download-btn">2K PNG 다운로드</button>
                </div>
                <div class="compare-container">
                    <img src="${item.renderedUrl}" alt="After 2K Render" class="compare-img">
                    <div class="compare-before-wrap">
                        <img src="${item.objectUrl}" alt="Before SketchUp" class="compare-img">
                    </div>
                    <span class="compare-label label-before">원본 (SketchUp)</span>
                    <span class="compare-label label-after">2K 실사 (gemini-3.1-flash-image)</span>
                    <div class="compare-divider"></div>
                    <div class="compare-handle">↔</div>
                    <input type="range" min="0" max="100" value="50" class="compare-range" aria-label="Before After 비교 슬라이더">
                </div>
            `;

            const rangeInput = card.querySelector('.compare-range');
            const beforeWrap = card.querySelector('.compare-before-wrap');
            const divider = card.querySelector('.compare-divider');
            const handle = card.querySelector('.compare-handle');
            const downloadBtn = card.querySelector('.single-download-btn');

            rangeInput.addEventListener('input', () => {
                const val = Number(rangeInput.value);
                const rightInset = 100 - val;
                beforeWrap.style.clipPath = `inset(0 ${rightInset}% 0 0)`;
                divider.style.left = `${val}%`;
                handle.style.left = `${val}%`;
            });

            downloadBtn.addEventListener('click', () => {
                triggerDownload(item.renderedUrl, outName);
            });

            resultsGrid.appendChild(card);
        });
    }

    downloadAllBtn.addEventListener('click', () => {
        queueItems.forEach((item, idx) => {
            if (item.status === 'done' && item.renderedUrl) {
                const outName = getOutputFilename(item.name, idx);
                setTimeout(() => triggerDownload(item.renderedUrl, outName), idx * 250);
            }
        });
    });
})();
