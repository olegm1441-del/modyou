export type Product = { id:string; title:string; description:string; image:string; tags:string[]; price:string };
export const initialContent = {
  heroTitle: "Твоя кукла. Твоя история. Твой стиль.",
  heroText: "Создай куклу, которая похожа на тебя или рассказывает историю человека, которого ты любишь.",
  standart: { name:"STANDARD", subtitle:"Базовая персонализация", description:"Первый шаг к образу, который говорит о тебе.", includes:"Выбор куклы из доступных вариантов;Подбор одежды и образа в рамках Standard;Персонализация по согласованным пожеланиям;Согласование итогового дизайна;Изготовление и передача готовой куклы", price:"от 6 000 ₽", time:"от 3 дней" },
  pro: { name:"PRO", subtitle:"Максимум индивидуальности", description:"Больше пространства для деталей, характера и истории.", includes:"Индивидуальная концепция образа;Расширенный подбор одежды, аксессуаров и деталей;Проработка уникального дизайна;Согласование индивидуальных элементов;Изготовление по утверждённому дизайну", price:"от 15 000 ₽", time:"от 10 дней" },
  products: [
    {id:"look-01",title:"Розовое настроение",description:"Нежный образ с игривыми деталями.",image:"/images/doll-18.png",tags:["Новинки","Идеи для подарка"],price:"от 5 000 ₽"},
    {id:"look-02",title:"Моя история",description:"Образ, с которого начинается знакомство.",image:"/images/doll-20.png",tags:["Популярные"],price:"от 3 000 ₽"},
    {id:"look-03",title:"Образ мечты",description:"Индивидуальность в каждой детали.",image:"/images/doll-18.png",tags:["Идеи для подарка"],price:"от 5 000 ₽"},
    {id:"look-04",title:"Нежный акцент",description:"Мягкие цвета и собственный характер.",image:"/images/doll-20.png",tags:["Новинки","Популярные"],price:"от 3 000 ₽"},
  ] as Product[],
  reviews: [ {quote:"[Здесь будет отзыв клиента]",name:"[Имя]",city:"[Город]"}, {quote:"[Здесь будет отзыв клиента]",name:"[Имя]",city:"[Город]"} ],
  team: ["Олеся Пальниченко","Александра Вайшева","Ева Постаногова","Рузия Бадретдинова"],
  faq: [ {q:"Как создать куклу?",a:"[Ответ будет добавлен после утверждения процесса]"}, {q:"Чем отличаются STANDART и PRO?",a:"[Описание различий будет добавлено после утверждения комплектации]"}, {q:"Можно ли создать собственную одежду?",a:"[Условия будут добавлены после утверждения]"}, {q:"Как оформить заказ и следить за ним?",a:"[Условия оформления и доставки будут добавлены после утверждения]"} ],
  contact:"Новости проекта и новые образы — в нашем официальном Telegram-канале.",
};
export type Content = typeof initialContent;
export const categories = ["Внешность","Волосы","Лицо","Одежда","Обувь","Аксессуары","Цвета","Детали","История персонажа"];
export const choices:Record<string,string[]> = {
  "Внешность":["Образ 01","Образ 02","Образ 03"],"Волосы":["Светлые","Тёмные","Каштановые"],"Лицо":["Вариант 01","Вариант 02","Вариант 03"],"Одежда":["Розовый образ","Повседневный","Свой дизайн"],"Обувь":["Пара 01","Пара 02","Пара 03"],"Аксессуары":["Без аксессуара","Аксессуар 01","Аксессуар 02"],"Цвета":["Розовый","Сиреневый","Голубой"],"Детали":["Деталь 01","Деталь 02","Деталь 03"]
};

// Keep collection estimates editable here and in the existing content editor.
export const collectionPriceNote = "Предварительная цена куклы в показанном образе, не утверждённый прайс. Полный индивидуальный заказ рассчитывается отдельно по тарифу Standard или Pro; комплектацию и итоговую стоимость согласуем перед заказом.";
export const tariffNote = "Стоимость и сроки ориентировочные и зависят от сложности заказа. Состав услуги предварительный: доступные детали, итоговый дизайн, цену и срок согласуем до изготовления.";
export const projectChannel = "https://t.me/ModYoukzn";

// Upgrade only old placeholder values; preserve the owner's edits and saved looks.
export function refreshContent(saved: Content): Content {
  const result = { ...initialContent, ...saved };
  for (const key of ["standart", "pro"] as const) {
    result[key] = { ...initialContent[key], ...saved[key] };
    for (const field of ["includes", "price", "time"] as const) {
      if (!result[key][field] || result[key][field].startsWith("[")) result[key][field] = initialContent[key][field];
    }
    if (result[key].name === "STANDART") result[key].name = "STANDARD";
  }
  result.products = (saved.products || initialContent.products).map(product => ({ ...product, price: !product.price || product.price.startsWith("[") ? initialContent.products.find(p => p.id === product.id)?.price || "По запросу" : product.price }));
  if (!result.contact || result.contact.startsWith("[")) result.contact = initialContent.contact;
  return result;
}
