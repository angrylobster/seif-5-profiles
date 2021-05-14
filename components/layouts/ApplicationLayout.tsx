import { LogoutOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import Layout from 'antd/lib/layout';
import { Content } from 'antd/lib/layout/layout';
import Router from 'next/router';
import React, { PropsWithChildren, ReactNode } from 'react';
import { UserProps } from '../../interfaces/auth';
import { frontendApiService } from '../../services/api';
import headerCssModule from '../../styles/modules/header.module.css';

type TitleProps = {
    title?: string;
}

export default function ApplicationLayout (props: PropsWithChildren<ReactNode> & TitleProps & UserProps): JSX.Element {
    const logout = () => {
        frontendApiService.post('api/auth/logout')
            .then(() => Router.push('/'))
            .catch(err => message.error(`${err.status ? err.status + ': ' : ''}${err.data || err.message}`));
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout.Header className={headerCssModule.header} >
                <Button 
                    icon={<LogoutOutlined />}
                    onClick={logout}
                >
                    Logout
                </Button>
            </Layout.Header>

            <Content>
                {props.children}
            </Content>
        </Layout>
    );
}