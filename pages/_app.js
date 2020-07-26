import 'styles/styles.scss'
import Head from "next/head";
import Header from "@core/header/Header";
import Footer from "@core/footer/Footer";
import Masks from "../components/masks/Masks";

const MyApp = ({ Component, pageProps }) => {

  return (
    <div className="app-content">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="description" content="" />
        <meta name="keywords" content="" />
      </Head>
      <Masks/>

      <Header/>
      <main className="main">
        <Component {...pageProps} />
      </main>
      <Footer/>
    </div>
  )
}

export default MyApp