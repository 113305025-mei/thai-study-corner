'use strict';
const allowedCategories = ['日常生活', '餐廳點餐', '旅遊交通'];
const grid = document.querySelector('#lesson-grid');
const filters = document.querySelector('#filters');
const search = document.querySelector('#search');
const statusEl = document.querySelector('#status');
const countEl = document.querySelector('#lesson-count');
let lessons = [];
let category = '全部';
function el(tag, className, content) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
}
function drawFilters() {
  filters.replaceChildren();
  for (const name of ['全部', ...allowedCategories]) {
    const button = el('button', `filter-btn${name === category ? ' active' : ''}`, name);
    button.type = 'button';
    button.setAttribute('aria-pressed', String(name === category));
    button.addEventListener('click', () => { category = name; drawFilters(); render(); });
    filters.append(button);
  }
}
function createCard(lesson, query) {
  const card = el('article', 'lesson-card');
  card.append(el('span', 'card-tag', lesson.category), el('h3', '', lesson.title), el('p', 'card-desc', lesson.description));
  const list = el('ul', 'phrases');
  const matchedItems = lesson.items.filter(item => !query || [item.thai,item.pronunciation,item.chinese,item.example].some(value => value.toLowerCase().includes(query)));
  const displayItems = matchedItems.length ? matchedItems : lesson.items;
  for (const item of displayItems) {
    const line = el('li', 'phrase');
    const top = el('div', 'phrase-top');
    top.append(el('span', 'thai', item.thai), el('span', 'pronunciation', item.pronunciation));
    line.append(top, el('div', 'translation', item.chinese), el('p', 'example', item.example));
    list.append(line);
  }
  card.append(list);
  return card;
}
function render() {
  const query = search.value.trim().toLowerCase();
  const result = lessons.filter(lesson =>
    (category === '全部' || lesson.category === category) &&
    (!query || [lesson.title,lesson.description,lesson.category,...lesson.items.flatMap(item => [item.thai,item.pronunciation,item.chinese,item.example])].some(value => value.toLowerCase().includes(query)))
  );
  grid.replaceChildren(...result.map(lesson => createCard(lesson, query)));
  countEl.textContent = `${result.length} 個主題`;
  statusEl.textContent = result.length ? '' : '沒有找到符合的內容，換個關鍵字試試看吧！';
}
function validate(data) {
  if (!Array.isArray(data)) throw Error('課程資料必須是陣列');
  const ids = new Set();
  for (const lesson of data) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(lesson.id) || ids.has(lesson.id)) throw Error('課程 ID 格式錯誤或重複');
    ids.add(lesson.id);
    if (!allowedCategories.includes(lesson.category) || !lesson.title || !lesson.description || !Array.isArray(lesson.items) || lesson.items.length < 3 || lesson.items.length > 6) throw Error('課程內容格式有誤');
    for (const item of lesson.items) if (!['thai','pronunciation','chinese','example'].every(key => typeof item[key] === 'string' && item[key].trim())) throw Error('缺少必要的詞彙欄位');
  }
  return data;
}
async function initialize() {
  drawFilters();
  try {
    const response = await fetch('content/lessons.json');
    if (!response.ok) throw Error(`HTTP ${response.status}`);
    lessons = validate(await response.json());
    render();
  } catch (error) {
    countEl.textContent = '載入失敗';
    statusEl.textContent = '課程資料無法載入。請確認網站經由 HTTP 開啟，且 content/lessons.json 檔案存在。';
    console.error('Lesson loading failed:', error);
  }
}
search.addEventListener('input', render);
initialize();
