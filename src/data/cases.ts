import type { CaseItem } from '../types';

// 画像は public/works/ に配置。GitHub Pages 等のサブパス配信に対応するため、
// 公開ベース（import.meta.env.BASE_URL）を前置してURLを組み立てる。
const asset = (p: string) => `${import.meta.env.BASE_URL}${p}`;

export const cases: CaseItem[] = [
  {
    before: asset('works/case1-before.jpg'),
    after: asset('works/case1-after.jpg'),
    label: '全塗装',
    no: 'CASE 01',
  },
  {
    before: asset('works/case2-before.jpg'),
    after: asset('works/case2-after.jpg'),
    label: '外壁塗装',
    no: 'CASE 02',
  },
  {
    before: asset('works/case3-before.jpg'),
    after: asset('works/case3-after.jpg'),
    label: '外壁塗装',
    no: 'CASE 03',
  },
  {
    before: asset('works/case4-before.jpg'),
    after: asset('works/case4-after.jpg'),
    label: '全塗装',
    no: 'CASE 04',
  },
  {
    before: asset('works/case5-before.jpg'),
    after: asset('works/case5-after.jpg'),
    label: '屋根塗装',
    no: 'CASE 05',
  },
  {
    before: asset('works/case6-before.jpg'),
    after: asset('works/case6-after.jpg'),
    label: '屋根塗装',
    no: 'CASE 06',
  },
];
