import '../styles/globals.css'
import 'antd/dist/antd.css'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import React from 'react'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return <Component {...pageProps} />
}

export default MyApp
