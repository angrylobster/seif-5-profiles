import React, { PropsWithChildren } from 'react';
import { Layout, Row } from "antd";
import helpers from '../../styles/helpers.module.css';
import { Content } from 'antd/lib/layout/layout';

export default function PreloginLayout (props: PropsWithChildren<React.ReactNode>): JSX.Element {
    return (
        <Layout className={helpers.fullHeight}>
            <Content>
                <Row
                    className={helpers.fullHeight}
                    justify="center"
                    align="middle"
                >
                    {props.children}
                </Row>
            </Content>
        </Layout>
    );
}