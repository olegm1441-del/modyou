export type NewsItem = {
  slug: string;
  category: string;
  date?: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  kind: "video" | "gallery" | "team" | "story" | "image";
  body?: string[];
  sourceUrl?: string;
  sourceLabel?: string;
  listed?: boolean;
  videoSrc?: string;
};

const publications: NewsItem[] = [
  {
    slug: "promo-nashego-komyuniti",
    category: "Комьюнити",
    date: "2026-10-13",
    title: "Творчество без границ: промо нашего комьюнити",
    excerpt: "Покупатели MODYOU сняли своё промо о настроении, творчестве и ценностях, которые нас объединяют.",
    image: "/images/news/community-promo.png",
    imageAlt: "Кадр из оригинального проморолика сообщества MODYOU",
    kind: "video",
    videoSrc: "/videos/community-promo.mp4",
    sourceUrl: "https://t.me/ModYoukzn",
    sourceLabel: "Канал MODYOU в Telegram",
    body: [
      "Что будет, если дать волю творчеству наших подписчиков? Получится вот такая пушка! 🔥",
      "Несколько наших классных покупателей собрались вместе и сняли настоящее промо для нашего бренда. И знаете, что самое удивительное? В кадре нет ни одной куклы!",
      "Ребята решили сделать акцент на настроении, вайбе и ценностях, которые нас всех объединяют. И это попало прямо в сердечко 💔 Ведь наш бренд — это не просто игрушки на полке, это крутое творческое комьюнити.",
      "Ребята, вы лучшие! Спасибо за вашу энергию и креатив!",
      "Обязательно включите звук и зацените их задумку! Как вам? 👇🎧",
      "#наше_комьюнити #UGC #ModYou",
    ],
  },
  {
    slug: "obraz-ko-dnyu-tatarstana",
    category: "Образы",
    date: "2026-10-13",
    title: "MODYOU × Татарстан: образ ко Дню Республики",
    excerpt: "Кукла-девочка в национальном костюме: индивидуальный дизайн, вдохновлённый культурой и традициями Татарстана.",
    image: "/images/clothing/traditional.jpg",
    imageAlt: "Кукла-девочка MODYOU в зелёном национальном костюме с золотистым орнаментом",
    kind: "image",
    body: ["Ко Дню Республики Татарстан мы представляем особенный образ куклы-девочки в национальном костюме. В нём индивидуальный дизайн встречается с культурой и традициями нашего региона.", "Зелёный и бордовый цвета, золотистый орнамент и головной убор задают характер образа. Для MODYOU это способ рассказать о родном крае через одежду и детали."],
  },
  {
    slug: "hokkeynyy-harakter",
    category: "Образы",
    date: "2026-10-13",
    title: "Хоккейный характер в новом образе MODYOU",
    excerpt: "Кукла-мальчик в зелёной хоккейной форме: спортивное настроение и внимание к деталям.",
    image: "/images/clothing/hockey-boy.jpg",
    imageAlt: "Кукла-мальчик MODYOU в хоккейной форме, шарфе и кепке",
    kind: "image",
    body: ["Представляем спортивный образ MODYOU: куклу-мальчика в хоккейной форме. Зелёный цвет, шарф, кепка и хоккейная клюшка складываются в характерный образ болельщика.", "Этот образ показывает, как увлечение спортом может стать частью персонального дизайна куклы. Любимые цвета, одежда и аксессуары помогают рассказать свою историю."],
  },
  {
    slug: "istoriya-sozdaniya-nashey-kukly",
    category: "О проекте",
    date: "2026-10-05",
    title: "История создания нашей куклы",
    excerpt: "В основе MODYOU — персонализированная кукла и образ, который ты создаёшь сам.",
    image: "/images/news/pink-look.png",
    imageAlt: "Образ MODYOU в розовом платье и подарочной коробке",
    kind: "story",
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
    listed: false,
  },
];

// Keep the existing team article accessible via old links, but remove it from news feeds.
export const allNews = publications;
export const news = publications.filter(item => item.listed !== false);

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
