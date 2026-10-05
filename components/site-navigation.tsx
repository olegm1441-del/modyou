import { ArrowUpRight, ChevronRight } from "lucide-react";
import { news } from "@/data/news";

const labels: Record<string, string> = {
  "/": "Главная", "/create": "Создать куклу", "/collection": "Коллекция", "/clothing": "Создать одежду", "/about": "О нас", "/faq": "Вопрос-ответ", "/news": "Наши новости", "/my-look": "Мой образ", "/favorites": "Избранное", "/cart": "Корзина", "/checkout": "Оформление заказа", "/tracking": "Отслеживание заказа", "/account": "Личный кабинет", "/app": "Приложение", "/editor": "Редактор контента", "/constructor/standart": "Конструктор STANDART", "/constructor/pro": "Конструктор PRO", "/info/privacy": "Политика конфиденциальности", "/info/terms": "Пользовательское соглашение", "/info/delivery": "Условия доставки", "/info/payment": "Оплата",
};
type Link = [label: string, href: string];
const related: Record<string, Link[]> = {
  "/create": [["Примеры образов", "/collection"], ["Как создать куклу", "/#how"], ["Ответы на вопросы", "/faq"]],
  "/constructor": [["Мой сохранённый образ", "/my-look"], ["Идеи из коллекции", "/collection"], ["Одежда и детали", "/clothing"]],
  "/collection": [["Создать свой образ", "/create"], ["Три образа MODYOU", "/news/tri-obraza-modyou"], ["Сохранённое", "/favorites"]],
  "/clothing": [["Вернуться к своему образу", "/my-look"], ["Найти вдохновение", "/collection"], ["Корзина", "/cart"]],
  "/about": [["Новости проекта", "/news"], ["Образы MODYOU", "/collection"], ["Создать куклу", "/create"]],
  "/faq": [["Как всё устроено", "/#how"], ["Выбрать формат", "/create"], ["О проекте", "/about"]],
  "/news": [["Коллекция образов", "/collection"], ["Наша команда", "/about#team"], ["Создать куклу", "/create"]],
  "/my-look": [["Одежда для образа", "/clothing"], ["Избранное", "/favorites"], ["Перейти в корзину", "/cart"]],
  "/favorites": [["Ещё образы", "/collection"], ["Создать свою куклу", "/create"], ["Мой образ", "/my-look"]],
  "/cart": [["Продолжить выбор", "/collection"], ["Мой образ", "/my-look"], ["О доставке", "/info/delivery"]],
  "/checkout": [["Вернуться в корзину", "/cart"], ["Об оплате", "/info/payment"], ["О доставке", "/info/delivery"]],
  "/tracking": [["Личный кабинет", "/account"], ["Вопросы о заказе", "/faq"], ["Новости MODYOU", "/news"]],
  "/account": [["Создать новый образ", "/create"], ["Мои заказы", "/tracking"], ["Сохранённые образы", "/favorites"]],
  "/app": [["Конструктор на сайте", "/create"], ["Новости проекта", "/news"], ["Ответы на вопросы", "/faq"]],
  "/editor": [["Посмотреть главную", "/"], ["Коллекция", "/collection"], ["О проекте", "/about"]],
  "/info": [["Помощь с заказом", "/faq"], ["Корзина", "/cart"], ["Контакты", "/about#contacts"]],
};

export function Breadcrumbs({ path, productTitle }: { path: string; productTitle?: string }) {
  if (path === "/") return null;
  const story = news.find(n => path === `/news/${n.slug}`);
  const parents: Link[] = [["Главная", "/"]];
  if (story) parents.push(["Наши новости", "/news"]);
  else if (path.startsWith("/collection/")) parents.push(["Коллекция", "/collection"]);
  else if (path.startsWith("/constructor/")) parents.push(["Создать куклу", "/create"]);
  else if (path === "/checkout") parents.push(["Корзина", "/cart"]);
  const title = story?.title || productTitle || labels[path] || "Страница не найдена";
  return <nav className="wrap breadcrumbs" aria-label="Путь по сайту"><ol>{parents.map(([label, href]) => <li key={href}><a href={href}>{label}</a><ChevronRight size={13} aria-hidden="true" /></li>)}<li aria-current="page">{title}</li></ol></nav>;
}

export function RelatedLinks({ path }: { path: string }) {
  const key = related[path] ? path : `/${path.split("/")[1]}`;
  const links = related[key];
  if (!links) return null;
  return <aside className="wrap related-links" aria-label="Связанные разделы"><span className="eyebrow">ПРОДОЛЖИТЬ ЗНАКОМСТВО</span><nav>{links.map(([label, href]) => <a href={href} key={href}>{label}<ArrowUpRight size={16} aria-hidden="true" /></a>)}</nav></aside>;
}
