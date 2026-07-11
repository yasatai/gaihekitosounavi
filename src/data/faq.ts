import type { FaqItem } from '../types';
// FAQの内容は faq.json を単一の情報源とし、ビルド時の構造化データ（FAQPage）生成
// （scripts/gen-seo.mjs）と共有する。
import items from './faq.json';

export const faqItems: FaqItem[] = items;
