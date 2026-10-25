// src/utils/content-loader.js
let currentLang = localStorage.getItem('lang') || 'zh'; // Default to Traditional Chinese
let contentCache = {};

export function getLang() { return currentLang; }

export function toggleLang() {
  currentLang = currentLang === 'en' ? 'zh' : 'en';
  localStorage.setItem('lang', currentLang);
  location.reload(); 
}

export function t(obj, key) {
  // If we have key_en or key_zh, return based on currentLang
  return obj[key + '_' + currentLang] || obj[key + '_zh'] || obj[key + '_en'] || obj[key];
}

export async function loadContent(page) {
  if (contentCache[page]) return contentCache[page];
  const jsonUrl = new URL(`../../content/${page}.json`, import.meta.url);
  const res = await fetch(jsonUrl);
  contentCache[page] = await res.json();
  return contentCache[page];
}
