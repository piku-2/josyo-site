export const site = {
  name: '情報処理研究会',
  shortName: 'JYOUSHO',
  domain: 'jyousho-official-site.pages.dev',
  description: 'プログラミング、イラスト、動画、音楽の4つの班で、デジタル作品の制作と発表に取り組む情報処理研究会の公式サイトです。',
  nav: [
    { href: '/about', label: '私たちについて' },
    { href: '/teams', label: '班紹介' },
    { href: '/works', label: '作品' },
    { href: '/festival', label: '文化祭' },
  ],
};

export const teamLabels = {
  programming: 'プログラミング班',
  illustration: 'イラスト班',
  video: '動画班',
  music: '音楽班',
} as const;

export const teams = [
  {
    id: 'programming',
    name: 'プログラミング班',
    file: 'programming.exe',
    icon: 'code',
    description: 'Webサイト、アプリ、ゲームなどを作ります。',
    activity: 'PythonやJavaScriptなどを使い、ゲームやWebアプリを制作します。',
  },
  {
    id: 'illustration',
    name: 'イラスト班',
    file: 'illustration.png',
    icon: 'pen',
    description: 'キャラクター、背景、ロゴ、展示物のビジュアル制作に取り組みます。',
    activity: 'デジタル作画の練習から、Webや動画で使う素材づくりまで担当します。',
  },
  {
    id: 'video',
    name: '動画班',
    file: 'video.mp4',
    icon: 'video',
    description: '企画、撮影、編集を通して、活動紹介や作品発表の映像を制作します。',
    activity: '短編動画、告知映像、文化祭向けの展示映像などを形にします。',
  },
  {
    id: 'music',
    name: '音楽班',
    file: 'music.wav',
    icon: 'music',
    description: '作曲、編曲、効果音制作を中心に、作品の音づくりを進めます。',
    activity: 'ゲームや動画に合わせたBGM、ジングル、サウンド素材を制作します。',
  },
] as const;

export const festival = {
  year: '2026',
  date: '日程が決まり次第お知らせします',
  place: '1号館',
  time: '開催時間が決まり次第お知らせします',
  notice: '展示内容や来場案内は、準備状況に合わせて順次更新します。',
};
