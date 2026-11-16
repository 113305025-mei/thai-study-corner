# AGENTS.md — Thai Study Corner

## 1. Project mission
Thai Study Corner is a small, beginner-friendly website for learning practical Thai vocabulary and phrases. Each topic should contain a few useful Thai expressions, Chinese explanations, pronunciation hints, and realistic examples. The project is intended to grow one topic at a time without rewriting the website.

## 2. Audience and language
- Primary audience: Chinese-speaking beginners interested in Thai.
- UI text: Traditional Chinese (Taiwan). Thai expressions use Thai script.
- Tone: friendly, clear, concise; avoid complicated grammatical explanations.
- Do not invent claims about Thai culture. Check unclear translations before publishing.

## 3. Tech stack and publication
- Static site: HTML, CSS, and vanilla JavaScript, with no frameworks, build tools, or external dependencies.
- GitHub Pages hosts the site from the main branch root.
- All relative links must work when hosted at `https://USERNAME.github.io/REPOSITORY/` (do not use leading-slash absolute paths).
- Do not include secrets, tokens, analytics trackers, or user data.

## 4. File layout
```
index.html               Home page, category navigation, content rendering
css/style.css            All layout, colors, typography, responsive rules
js/app.js                Fetches lesson data, renders cards, filters/searches
content/lessons.json     Single source of truth for lesson content
AGENTS.md                Rules for humans and AI contributors
README.md                Setup, preview, publication instructions
```

## 5. Visual design rules
- Cozy learning-journal aesthetic: cream background, deep green text, warm orange highlights.
- Rounded cards, ample whitespace, readable type; no aggressive motion effects.
- Mobile-first layout; cards reflow gracefully on narrow screens.
- Keep contrast readable and interactive controls keyboard-accessible.
- Use semantic HTML; every button needs a clear label; include visible focus styles.

## 6. Content schema (mandatory)
Each object in `content/lessons.json` must have exactly these main fields:
- `id`: unique lowercase kebab-case string (example `ordering-food`); never change an existing ID.
- `category`: one of `日常生活`, `餐廳點餐`, `旅遊交通`.
- `title`: short Traditional Chinese topic name.
- `description`: a one-sentence overview in Traditional Chinese.
- `items`: array of **3–6** expressions. Each item has exactly:
  - `thai`: Thai text
  - `pronunciation`: friendly Chinese pronunciation approximation (note: not phonetic IPA)
  - `chinese`: Traditional Chinese meaning
  - `example`: one brief usage note or sentence in Traditional Chinese

Example:
```json
{
  "id": "new-topic",
  "category": "日常生活",
  "title": "新主題",
  "description": "這是主題介紹。",
  "items": [
    {"thai": "สวัสดี", "pronunciation": "薩瓦迪", "chinese": "你好", "example": "見面時常用的招呼語。"},
    {"thai": "ขอบคุณ", "pronunciation": "考坤", "chinese": "謝謝", "example": "用來表示感謝。"},
    {"thai": "ใช่", "pronunciation": "菜", "chinese": "是", "example": "回答是非問題時使用。"}
  ]
}
```

## 7. How an AI should add a new topic
1. Read this entire `AGENTS.md` and inspect `content/lessons.json`.
2. Choose an existing category. For a new category, first update the allowed categories in this file and update any code that depends on them.
3. Pick an unused, meaningful `id`; add one complete topic object to the JSON array. Include 3–6 useful, nonduplicate expressions.
4. Check Thai spelling and Chinese meanings carefully. Pronunciation aids are approximations, so do not present them as exact phonetics.
5. **Do not** hard-code a topic's content into `index.html` or `js/app.js`. The site should display it automatically from JSON.
6. Preserve existing topic IDs, files, layouts, and feature behavior unless change is requested.
7. Validate JSON syntax and manually test that the new topic appears in the topic list, search, and category filters on desktop and mobile.
8. When done, summarize modified files, the new topic ID, and the testing performed.

## 8. How an AI should modify styles or functionality
- Keep CSS in `css/style.css`; JavaScript in `js/app.js`.
- Prefer minimal changes; do not introduce libraries or frameworks without an explicit request.
- Protect against HTML injection: render user-facing lesson text via `textContent`, not unsanitized `innerHTML`.
- If a lesson fails to load, show a helpful visible error message instead of an empty screen.
- Preserve keyboard access and mobile layout.

## 9. Definition of done
- `index.html` loads without console errors when served over HTTP.
- Topic cards render from `content/lessons.json` and filter/search as expected.
- No broken relative paths, no horizontal overflow at phone widths.
- New content can be added by editing **only** `content/lessons.json`.
- README explains local preview and GitHub Pages publication.
