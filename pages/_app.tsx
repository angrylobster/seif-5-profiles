import '../styles/globals.css';
import 'antd/dist/antd.css';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/GA-logo.png" />
                <title>SEIF 5 Student Profiles</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
