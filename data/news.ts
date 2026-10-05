export type NewsItem = {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  kind: "video" | "gallery" | "team";
  videoSrc?: string;
};

export const news: NewsItem[] = [
  {
    slug: "istoriya-sozdaniya-nashey-kukly",
    category: "О проекте",
    date: "2026-10-05",
    title: "История создания нашей куклы",
    excerpt: "В основе MODYOU — персонализированная кукла и образ, который ты создаёшь сам.",
    image: "/images/news/pink-look.png",
    imageAlt: "Образ MODYOU в розовом платье и подарочной коробке",
    kind: "video",
    // Add the original video URL here when the video file is supplied.
    // Keep the original bytes, dimensions, duration and playback speed.
  },
  {
    slug: "tri-obraza-modyou",
    category: "Образы",
    date: "2026-10-05",
    title: "Три образа, три настроения",
    excerpt: "Спорт, любимый стиль и традиционный костюм: рассматриваем детали образов MODYOU.",
    image: "/images/news/traditional-look.png",
    imageAlt: "Кукла MODYOU в зелёном костюме с золотистым орнаментом",
    kind: "gallery",
  },
  {
    slug: "komanda-modyou",
    category: "Команда",
    date: "2026-10-05",
    title: "Знакомьтесь: команда MODYOU",
    excerpt: "Четыре участницы проекта — и их собственные кукольные образы.",
    image: "/images/team/olesya-palnichenko.png",
    imageAlt: "Кукольный образ Олеси Пальниченко из презентации команды",
    kind: "team",
  },
];

export const teamPortraits: Record<string, string> = {
  "Олеся Пальниченко": "/images/team/olesya-palnichenko.png",
  "Александра Вайшева": "/images/team/aleksandra-vaysheva.png",
  "Ева Постаногова": "/images/team/eva-postanogova.png",
  "Рузия Бадретдинова": "/images/team/ruziya-badretdinova.png",
};

export const lookGallery = [
  { image: "/images/news/hockey-look.png", title: "Спортивное настроение", description: "Зелёная хоккейная форма и детали любимой команды." },
  { image: "/images/news/pink-look.png", title: "Розовый акцент", description: "Платье, сумочка и аксессуары в одной цветовой истории." },
  { image: "/images/news/traditional-look.png", title: "Традиционный костюм", description: "Зелёный и бордовый цвета, золотистый орнамент и головной убор." },
];
