import Head from "next/head";

const CustomHead = ({ children, keywords, title,customDescription }) => {
  const basicKeywords = 'двери, doors, двери портал, магазин дверей,';
  const basicDescription = `Двери портал. Купить двери с индивидуальным подходом к каждому покупателю. Широкий выбор товара, качественный продукт, быстрая доставка, надёжные поставщики. Замеры, установка, монтаж и прочие сопутствующие виды услуг по демократичной цене.`

  return (
    <Head>
      <meta keywords={`${basicKeywords} ${keywords}`} />
      <meta name='description' content={customDescription ? customDescription : basicDescription} />
      <title>{title}</title>
      <link rel="shortcut icon" href="/favicon.ico" />
      {children}
    </Head>
  )
}

export default CustomHead;