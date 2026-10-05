import { ArrowUpRight, Play } from "lucide-react";
import { news, lookGallery, teamPortraits, type NewsItem } from "@/data/news";

const dateLabel = (date: string) => new Date(`${date}T12:00:00+03:00`).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });

export function NewsCard({ item }: { item: NewsItem }) {
  return <article className="product-card news-card">
    <a className="news-card-link" href={`/news/${item.slug}`}>
      <div className="news-cover">
        <img src={item.image} alt={item.imageAlt} loading="lazy" decoding="async" width="1024" height="1536" />
        {item.kind === "video" && <span className="news-video-badge"><Play size={14} aria-hidden="true" fill={item.videoSrc ? "currentColor" : "none"} />{item.videoSrc ? "Видео" : "Видео скоро"}</span>}
      </div>
      <div className="product-text">
        <div className="news-meta"><span className="eyebrow">{item.category}</span><time dateTime={item.date}>{dateLabel(item.date)}</time></div>
        <h3>{item.title}</h3><p>{item.excerpt}</p>
        <span className="text-link">Подробнее <ArrowUpRight size={17} aria-hidden="true" /></span>
      </div>
    </a>
  </article>;
}

export function LatestNews() {
  return <section className="section wrap latest-news" aria-labelledby="latest-news-title">
    <div className="section-head"><div><span className="eyebrow">ЖИЗНЬ MODYOU</span><h2 id="latest-news-title">Последние новости</h2></div><a href="/news" className="text-link">Все новости <ArrowUpRight size={18} aria-hidden="true" /></a></div>
    <div className="product-grid news-grid">{news.slice(0, 3).map(item => <NewsCard key={item.slug} item={item} />)}</div>
  </section>;
}

export function NewsList() {
  return <section className="page wrap"><div className="page-intro"><span className="eyebrow">ЖИЗНЬ MODYOU</span><h1>Наши новости</h1><p>Знакомься с проектом, командой и образами, в которых есть своя история.</p></div>
    <div className="product-grid news-grid">{news.map(item => <NewsCard key={item.slug} item={item} />)}</div>
  </section>;
}

export function NewsArticle({ item }: { item: NewsItem }) {
  return <article className="page wrap news-article">
    <header className="page-intro"><div className="news-meta"><span className="eyebrow">{item.category}</span><time dateTime={item.date}>{dateLabel(item.date)}</time></div><h1>{item.title}</h1><p>{item.excerpt}</p></header>
    {item.kind === "video" && <>
      <div className="news-video-area">
        {item.videoSrc ? <video className="news-video" controls playsInline preload="metadata" poster={item.image} aria-label={item.title}><source src={item.videoSrc} />Твой браузер не поддерживает видео. <a href={item.videoSrc}>Открыть видео</a></video> : <div className="video-pending"><img src={item.image} alt={item.imageAlt} width="1024" height="1536" /><p>Видео скоро появится здесь.</p></div>}
      </div>
      <div className="news-body"><p>Мы создаём персонализированные куклы. В MODYOU пользователь участвует в создании образа: выбирает внешность, одежду, аксессуары и другие детали, которые отражают его стиль и интересы.</p><p>Начать можно с выбора <a className="inline-link" href="/create">формата STANDART или PRO</a>, а затем продолжить в конструкторе. Для вдохновения загляни в <a className="inline-link" href="/collection">коллекцию образов</a>.</p></div>
    </>}
    {item.kind === "gallery" && <><div className="news-body"><p>Один образ может рассказать об увлечении спортом, другой — о любимой одежде, третий — о традициях. На этих изображениях детали костюма и аксессуары задают характер каждой куклы.</p></div><div className="news-gallery">{lookGallery.map(look => <figure key={look.image}><a href={look.image} target="_blank" rel="noreferrer" className="original-image-link" aria-label={`Открыть оригинал: ${look.title}`}><img src={look.image} alt={look.title} width="1024" height="1536" loading="lazy" decoding="async" /><span>Рассмотреть образ <ArrowUpRight size={16} aria-hidden="true" /></span></a><figcaption><h2>{look.title}</h2><p>{look.description}</p></figcaption></figure>)}</div><div className="news-body"><p>Придумай собственное сочетание в <a className="inline-link" href="/constructor/standart">конструкторе куклы</a> или посмотри раздел <a className="inline-link" href="/clothing">«Создать одежду»</a>.</p></div></>}
    {item.kind === "team" && <><div className="news-body"><p>Над проектом MODYOU работают Олеся Пальниченко, Александра Вайшева, Ева Постаногова и Рузия Бадретдинова. В презентации каждая участница представлена в собственном кукольном образе.</p></div><div className="news-team-grid">{Object.entries(teamPortraits).map(([name, image]) => <figure key={name}><a href={image} target="_blank" rel="noreferrer" className="original-image-link" aria-label={`Открыть оригинал: ${name}`}><img src={image} alt={`Кукольный образ: ${name}`} width="1024" height="1536" loading="lazy" decoding="async" /><span>Рассмотреть образ <ArrowUpRight size={16} aria-hidden="true" /></span></a><figcaption>{name}</figcaption></figure>)}</div><div className="news-body"><p>Подробнее о замысле проекта — в разделе <a className="inline-link" href="/about#mission">«Наша миссия»</a>. А посмотреть, как складывается твой образ, можно в <a className="inline-link" href="/create">конструкторе MODYOU</a>.</p></div></>}
    <div className="news-article-footer"><a className="btn btn-ghost" href="/news">Все новости</a><a className="text-link" href="/create">Создать свой образ <ArrowUpRight size={17} aria-hidden="true" /></a></div>
  </article>;
}
