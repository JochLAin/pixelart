import type { AppProps } from 'next/app'
import Head from "next/head";
import "../stylesheets/index.scss";

export default function App({ Component, pageProps }: AppProps) {
    return <>
        <Head>
            <title>Pixel Art - Jochlain</title>
            {/*<script src={`https://kit.fontawesome.com/${process.env.FA_KIT_TOKEN}.js`} crossOrigin="anonymous" />*/}
        </Head>
        <Component {...pageProps} />
    </>;
}
