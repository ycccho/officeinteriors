# INDE_RENDER 2K 스케치업 실사 렌더링 최종 알고리즘 및 인수인계 마스터 문서 (v3.3)

> **목적**: 다른 프로젝트나 새 작업창에서 이어서 진행할 때, 지금까지 검증된 **모델·화질·단가·시행착오 교훈·절대 규칙·완성된 파이썬 엔진 코드**를 손실 없이 그대로 이어받기 위한 마스터 명세서입니다.

---

## 1. 최종 확정 엔진 및 모델 스펙 (변경 금지)

| 항목 | 확정 설정값 | 비고 |
| :--- | :--- | :--- |
| **최종 채택 모델** | `models/gemini-3.1-flash-image` | **유일하게 사용할 모델** (원본 유지력·가성비 최적) |
| **출력 해상도** | `"2K"` (`generationConfig.imageConfig.imageSize = "2K"`) | 원본 가로세로 비율 그대로 2K(약 2750~2850×1500px) 출력 |
| **배치 업로드 한도** | **최대 10장** (`MAX_BATCH_SIZE = 10`) | 한 번에 최대 10장 일괄 업로드 및 연속 변환 |
| **다중 이미지 현장 규칙** | **무조건 단일 현장(하나의 공간)**으로 처리 | 여러 장 업로드 시 서로 다른 현장을 올리는 일은 없음 |

### 영구 폐기 모델 (절대 사용 금지)
1. ❌ `models/gemini-3.1-flash-lite-image`
   - 장당 47원이나 `"2K"` 옵션을 무시하고 1K급 저화질로 출력되며, 퀄리티가 극도로 떨어져 폐기.
2. ❌ `models/gemini-3-pro-image`
   - 4K 렌더링 시 장당 338원이 소모되며, 원본 스케치업의 의도를 벗어나 과하게 재해석하므로 폐기.

---

## 2. 실측 과금(AI 스튜디오) 및 아르곤(Argon High) 토큰 소모 기록

| 테스트 구분 | 모델 및 해상도 | AI 스튜디오 실측 비용 | 아르곤(High) 토큰 소모 | 핵심 교훈 |
| :--- | :--- | :--- | :--- | :--- |
| 단일 2K 테스트 | `gemini-3.1-flash-image` (2K) | **141원 / 장** | 15% (채팅창 이미지 분석 포함) | 최종 채택 스펙 |
| 라이트 모델 테스트 | `gemini-3.1-flash-lite-image` | 47원 / 장 | 8% | 화질 불량으로 영구 폐기 |
| 프로 4K 테스트 | `gemini-3-pro-image` (4K) | 338원 / 장 | 7% | 원본 대비 과장 표현으로 영구 폐기 |
| **10장 배치 테스트** (SKF) | `gemini-3.1-flash-image` (2K × 10장) | 2,838원 → 4,243원 (**총 1,405원 = 장당 140.5원**) | **단 3%** (57% → 54%) | **폴더 경로만 전달해 파이썬으로 돌리면 아르곤 토큰이 거의 안 닳음** |
| **4장 배치 테스트** (ROINS) | `gemini-3.1-flash-image` (2K × 4장) | 4,243원 → 4,805원 (**총 562원 = 장당 140.5원**) | **15%** (54% → 39%) | **채팅창에 이미지 4장을 직접 첨부하면 비전 토큰이 15% 소모됨** |

> **[아르곤 토큰 절약 핵심 팁]**
> - 실제 이미지 생성은 구글 AI 스튜디오 서버(`gemini-3.1-flash-image`)가 수행합니다.
> - 채팅창에 이미지를 직접 첨부하거나 에이전트가 생성된 이미지를 `view_file`로 열어보면 아르곤 비전 토큰이 크게 소모됩니다.
> - 따라서 **이미지는 로컬 폴더에 넣고 폴더 경로만 전달**하며, 코드 설계·웹/PC 프로그램 제작에만 아르곤을 사용하는 것이 가장 효율적입니다.

---

## 3. 시행착오를 통해 확립한 핵심 교훈 (왜 오류들이 발생했는가?)

1. **프롬프트 내 '특정 사물 명사' 언급 금지 (명사 오염 현상)**
   - 프롬프트에 `시계(wall clocks)`, `복합기(printer/copier)`, `실링팬(ceiling fan)`, `펜던트 조명(pendant light)`, `특정 로고 이름(SKF, ROINS)` 같은 구체적인 사물 단어를 적어 넣으면(설령 "보존하라"거나 "추가하지 마라"는 문맥이더라도), 이미지 생성 AI가 해당 단어를 보고 **원본에 시계나 로고가 없는 다른 각도의 컷에도 시계·로고·조명을 억지로 그려 넣는 현상**이 발생함.
   - **해결책**: 공통 프롬프트에는 특정 사물 명사를 단 한 단어도 넣지 말고, 오직 추상적·보편적 규칙만 명시해야 함.

2. **다른 컷의 이미지를 `inlineData`로 함께 넘기는 것 금지 (공간/조명 침범 현상)**
   - 1번 컷의 렌더링 완성본 전체나 크롭된 이미지 조각(스와치 이미지)을 2~10번 컷 호출 시 `inlineData`로 같이 첨부하면, 1번 컷에 있던 유리벽·전등·벽시계 형태가 다른 컷의 막힌 벽이나 빈 천장을 뚫고 침범함.
   - **해결책**: API 호출 시 `inlineData`에는 **오직 현재 변환할 스케치업 원본 이미지 딱 1장만** 전송하고, 다중 이미지 간 색감·자재 통일은 **모든 업로드 이미지를 사전 스캔해 추출한 공통 RGB HEX 색상 코드(JSON 텍스트)**로만 전달함.

---

## 4. 절대 고정 5대 원칙 (Universal Core Laws)

1. **원본 사물 삭제 금지 (`law_1_never_delete_existing`)**
   - 원본 이미지에 있는 사물, 모니터 화면 속 로고, 스탠드 위 오브제, 가구, 설비는 단 하나도 지우거나 생략하지 않는다.
2. **원본에 없는 사물 창작 금지 (`law_2_never_invent_missing`)**
   - 원본에 없는 천장 전등, 실링팬, 시계, 로고, 복합기, 유리벽 등을 절대 지어내지 않는다. 빈 천장과 막힌 벽은 그대로 유지한다.
3. **천장 및 다중 이미지 공통 장소 색감·자재 균일화 (`law_3_shared_space_and_ceiling_uniformity`)**
   - 이미지 내의 천장이나, 2장 이상의 이미지에서 동일한 장소의 부분(천장, 바닥 타일, 우드/도장 벽체 등)이 보일 때 각도에 따라 색감이나 자재(예: 흰색 가구가 갑자기 원목이나 메탈로 변하는 현상)가 달라지지 않고 균일해야 한다.
4. **텍스트·글자 깨짐 방지 및 원본 그대로 유지 (`law_4_crisp_text_and_lettering_preservation`)**
   - 원본 이미지에 적힌 영문/한글 텍스트나 입체 글자는 획이 깨지거나 뭉개지지 않게 원본 철자, 폰트 형태, 원본 색상(천장 색이 번지지 않도록)을 선명하게 그대로 가져온다.
5. **곡면 가구 검은색 3D 폴리곤 그물망 제거 (`law_5_polygon_mesh_cleanup`)**
   - 스케치업 곡면 가구(검은 가죽 소파·암체어 등)에 촘촘하게 그어진 검은색 3D 삼각 폴리곤 와이어프레임 선을 깔끔히 지우고 매끄러운 실제 가죽/패브릭 질감으로 마감한다.

---

## 5. 완성된 골든 마스터 파이썬 엔진 코드 (`v3.3`)

아래 코드는 `d:\REA\INDE_RENDER_2K_GOLDEN_ALGORITHM.py`와 동일한 최종 완성본이며, 향후 내부 직원용 **웹 애플리케이션** 또는 **PC 프로그램**의 백엔드 코어 모듈로 그대로 임포트하여 사용할 수 있습니다.

```python
"""
================================================================================
[GOLDEN MASTER v3.3] UNIVERSAL ZERO-INVENTION 2K RENDER & SINGLE-SITE BATCH ENGINE
================================================================================
- Active Model (ONLY): models/gemini-3.1-flash-image
- Active Resolution (ONLY): "2K" (generationConfig.imageConfig.imageSize = "2K")
- Batch Upload Limit: Up to 10 images per batch (MAX_BATCH_SIZE = 10)
- Multi-Image Policy: ALWAYS treated as a single project site
- Verified Cost: 140.5 ~ 141 KRW per 2K image
================================================================================
"""

import urllib.request
import urllib.error
import json
import base64
import os
import time
from io import BytesIO
from PIL import Image
import numpy as np

# Google AI Studio API Key (비워둠 — 추후 사용 시 입력)
API_KEY = ""
FINAL_MODEL = "gemini-3.1-flash-image"
FINAL_IMAGE_SIZE = "2K"
MAX_BATCH_SIZE = 10

UNIVERSAL_ZERO_INVENTION_JSON = {
  "role": "Deterministic Architectural PBR Renderer",
  "task": "Convert the attached 3D viewport capture into a realistic 2K architectural photograph by removing black CAD edge lines and polygon wireframe meshes, and applying realistic surface textures and natural lighting.",
  "absolute_core_laws": {
    "law_1_never_delete_existing": "Do NOT remove or omit anything present in the original image. Every existing object, fixture, and structure in the original image must remain in its exact place.",
    "law_2_never_invent_missing": "Do NOT create or add anything that does not exist in the original image. Blank ceilings and blank walls must stay completely blank.",
    "law_3_shared_space_and_ceiling_uniformity": "Ceilings within the image, and any shared architectural areas (ceilings, walls, floors) appearing across 2 or more images of the same space, MUST maintain a strictly uniform color tone, brightness, and material finish.",
    "law_4_crisp_text_and_lettering_preservation": "Any text, lettering, or typography visible in the original image MUST be preserved with razor-sharp clarity — keep the exact original spelling, character shapes, font proportions, and color without garbling, warping, or blurring the letters.",
    "law_5_polygon_mesh_cleanup": "Remove black 3D triangulation wireframe lines on curved furniture and render them as smooth, realistic surfaces in their original color."
  },
  "structure_lock": {
    "camera_and_framing": "identical camera angle, focal length, perspective lines, and aspect ratio crop as the original image",
    "geometry_and_layout": "identical planes, recesses, grid lines, openings, and silhouettes as the original image"
  },
  "photographic_setup": {
    "camera_body": "full-frame architectural camera, tripod-mounted and levelled",
    "lens": "24mm perspective-control tilt-shift lens, strictly parallel vertical lines",
    "aperture": "f/8",
    "iso": "100",
    "exposure_technique": "balanced flambient architectural exposure faithful to the original image's brightness and color temperature with soft natural daylight and realistic contact shadows",
    "white_balance": "4800K clean neutral daylight",
    "depth_of_field": "deep and tack-sharp from foreground to background"
  },
  "output": {
    "aspect_ratio": "identical to the original input image",
    "resolution": "2K"
  },
  "negative_prompt": [
    "sketch outlines", "black contour lines", "CAD wireframe edges", "polygon triangulation mesh",
    "added objects", "deleted objects", "garbled text", "deformed letters", "broken typography",
    "inconsistent ceiling color", "inconsistent material tone", "3D render", "CGI"
  ]
}


def image_file_to_jpeg_b64(source_path: str, max_w: int = 2048) -> str:
    with Image.open(source_path) as im:
        im = im.convert("RGB")
        if im.width > max_w:
            new_h = round(im.height * (max_w / im.width))
            im = im.resize((max_w, new_h), Image.Resampling.LANCZOS)
        buf = BytesIO()
        im.save(buf, format="JPEG", quality=94)
        return base64.b64encode(buf.getvalue()).decode("utf-8")


def build_mutual_palette_summary(image_paths: list) -> dict:
    """
    업로드된 모든 이미지(동일 현장)의 픽셀 분포를 상호 분석하여,
    천장·바닥·벽체 등 공통 영역의 대표 RGB HEX 톤을 추출합니다.
    """
    sampled_pixels = []
    for p in image_paths:
        with Image.open(p) as im:
            im_small = im.convert("RGB").resize((160, 90), Image.Resampling.BILINEAR)
            arr = np.array(im_small).reshape(-1, 3)
            sampled_pixels.append(arr)
    all_px = np.vstack(sampled_pixels)

    r, g, b = all_px[:, 0].astype(float), all_px[:, 1].astype(float), all_px[:, 2].astype(float)
    lum = 0.299 * r + 0.587 * g + 0.114 * b
    max_c = np.maximum(np.maximum(r, g), b)
    min_c = np.minimum(np.minimum(r, g), b)
    sat = np.divide(max_c - min_c, max_c, out=np.zeros_like(max_c), where=max_c > 0)

    def mean_hex(mask, fallback="#CCCCCC"):
        if np.sum(mask) < 50:
            return fallback
        m = np.mean(all_px[mask], axis=0).astype(int)
        return f"#{m[0]:02X}{m[1]:02X}{m[2]:02X}"

    white_ceiling_hex = mean_hex((lum > 220) & (sat < 0.10), "#F3F3F1")
    floor_tile_hex = mean_hex((lum >= 135) & (lum <= 195) & (sat < 0.12), "#A8A6A1")
    dark_wood_hex = mean_hex((lum >= 55) & (lum < 125) & (r >= b), "#5A524B")
    light_wood_or_wall_hex = mean_hex((lum >= 140) & (lum <= 220) & (sat >= 0.10) & (r > b), "#C9B9A6")

    return {
        "shared_space_uniformity_rule": {
            "core_directive": "Ceilings within the image, and any shared areas of the same space appearing across 2 or more images, MUST maintain uniform color tone and material finish:",
            "uniform_ceiling_tone": f"{white_ceiling_hex} (Uniform matte ceiling tone across all views)",
            "uniform_floor_tone": f"{floor_tile_hex} (Uniform matte floor tile tone across all views)",
            "uniform_dark_surface_tone": f"{dark_wood_hex} (Uniform dark wood/panel tone across shared surfaces)",
            "uniform_warm_surface_tone": f"{light_wood_or_wall_hex} (Uniform light wood/wall tone across shared surfaces)",
            "uniform_lighting": "Uniform 4800K neutral daylight balance and identical exposure across all views"
        }
    }


def generate_single_2k(
    target_sketch_b64: str,
    output_path: str,
    mutual_palette_spec: dict = None,
    custom_note: str = ""
) -> bytes:
    prompt_obj = dict(UNIVERSAL_ZERO_INVENTION_JSON)
    if mutual_palette_spec:
        prompt_obj["multi_image_shared_space_consistency"] = mutual_palette_spec["shared_space_uniformity_rule"]
    if custom_note:
        prompt_obj["custom_user_directive"] = custom_note

    parts = [
        {
            "text": (
                "TARGET_IMAGE (Absolute Rules: 1. Do NOT delete any object in the original. "
                "2. Do NOT invent anything not in the original. "
                "3. Keep ceiling and shared-space color/material strictly uniform across views. "
                "4. Keep all visible text/letters sharp and identical to the original without distortion):\n"
                + json.dumps(prompt_obj, ensure_ascii=False, indent=2)
            )
        },
        {"inlineData": {"mimeType": "image/jpeg", "data": target_sketch_b64}}
    ]

    endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/{FINAL_MODEL}:generateContent?key={API_KEY}"
    payload = {
        "contents": [{"parts": parts}],
        "generationConfig": {
            "responseModalities": ["IMAGE"],
            "imageConfig": {
                "imageSize": FINAL_IMAGE_SIZE
            }
        }
    }

    req = urllib.request.Request(
        endpoint,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST"
    )

    with urllib.request.urlopen(req, timeout=180) as resp:
        resp_data = json.loads(resp.read().decode("utf-8"))

    for cand in resp_data.get("candidates", []):
        for part in cand.get("content", {}).get("parts", []):
            if "inlineData" in part and "data" in part["inlineData"]:
                img_bytes = base64.b64decode(part["inlineData"]["data"])
                with open(output_path, "wb") as f:
                    f.write(img_bytes)
                return img_bytes

    raise RuntimeError(f"No image returned from {FINAL_MODEL}: {resp_data}")


def generate_batch_consistent_2k(
    image_paths: list,
    output_dir: str,
    custom_note: str = ""
) -> list:
    """
    최대 10장의 동일 현장 스케치업 이미지를 일괄 입력받아
    천장 및 공통 영역의 색감·자재 일관성을 유지하며 2K 실사로 변환합니다.
    """
    if not image_paths:
        raise ValueError("No input images provided.")
    if len(image_paths) > MAX_BATCH_SIZE:
        raise ValueError(f"Batch size exceeds maximum limit of {MAX_BATCH_SIZE} images (received {len(image_paths)}).")

    os.makedirs(output_dir, exist_ok=True)
    mutual_palette = build_mutual_palette_summary(image_paths) if len(image_paths) > 1 else None
    results = []

    total = len(image_paths)
    for idx, src_path in enumerate(image_paths):
        base_name = os.path.splitext(os.path.basename(src_path))[0]
        out_path = os.path.join(output_dir, f"{base_name}_2K_Render.png")
        print(f"[{idx+1}/{total}] Processing: {os.path.basename(src_path)} -> {os.path.basename(out_path)} ...", flush=True)
        t0 = time.time()

        sketch_b64 = image_file_to_jpeg_b64(src_path, max_w=2048)
        generate_single_2k(
            target_sketch_b64=sketch_b64,
            output_path=out_path,
            mutual_palette_spec=mutual_palette,
            custom_note=custom_note
        )

        elapsed = time.time() - t0
        with Image.open(out_path) as out_im:
            w, h = out_im.size
        print(f"    -> DONE ({elapsed:.1f}s) | Resolution: {w}x{h} | Size: {os.path.getsize(out_path):,} bytes", flush=True)
        results.append(out_path)

    return results
```

---

## 6. 다음 프로젝트 이어하기 가이드 (웹 / PC 내부 프로그램 구축)

새 프로젝트에서 이 문서를 첨부하고 바로 지시하실 수 있는 다음 단계 요약입니다:
1. **내부 직원 전용 UI 구축 (웹 vs PC 프로그램 선택)**:
   - 드래그 앤 드롭으로 **최대 10장** 동시 업로드
   - 업로드된 이미지가 2장 이상이면 자동으로 `build_mutual_palette_summary()` 실행(단일 현장 색감·천장 균일화 자동 적용)
   - 변환 전/후 비교 슬라이더(Before & After) 및 일괄 다운로드(ZIP 또는 폴더 저장) 제공
   - 추가 요청사항(선택 입력란: `custom_note`) 지원
