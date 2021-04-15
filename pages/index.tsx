import React from 'react'
import { Layout, Row } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import LoginForm from '../components/login/LoginForm'
import helpers from '../styles/helpers.module.css'

function Home (): JSX.Element {
    return (
        <Layout className={helpers.fullHeight}>
            <Content>
                <Row
                    className={helpers.fullHeight}
                    justify="center"
                    align="middle"
                >
                    <LoginForm />
                </Row>
            </Content>
        </Layout>
    )
}

export default Home
