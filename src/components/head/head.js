import Head from "next/head";

const CustomHead = ({ children, keywords, title }) => {
  return (
    <Head>
        <meta keywords={`двери, doors, ${keywords}`}></meta>
        <title>{title}</title>
        <link rel="shortcut icon" href="/assets/favicon.ico" />
        {children}
    </Head>
  )
}

export default CustomHead;