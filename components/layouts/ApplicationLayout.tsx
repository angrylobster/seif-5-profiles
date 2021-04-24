import { LogoutOutlined } from "@ant-design/icons";
import { Button, Col, message, Row, Tooltip, Typography } from "antd";
import Layout from "antd/lib/layout";
import { Content, Header } from "antd/lib/layout/layout";
import Router from "next/router";
import React, { PropsWithChildren, ReactNode } from "react";
import { UserProps } from "../../interfaces/auth";
import { frontendApiService } from "../../services/api";
import helpers from '../../styles/helpers.module.css';

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
        <Layout 
            className={helpers.fullHeight}
        >
            <Header>
                <Row>
                    <Col 
                        style={ {display: 'flex', alignItems: 'center' }}
                        span={20}
                    >
                        { props?.user?.email && 
                            <Typography.Title 
                                level={4}
                                style={{marginBottom: 0, color: 'white'}}
                            >
                                {props.user.name.first} {props.user.name.last}
                            </Typography.Title>
                        }
                    </Col>
                
                    <Col span={4} className="header-right">
                        <Tooltip title="Logout">
                            <Button 
                                onClick={logout}
                                shape="circle"
                                icon={<LogoutOutlined/>}
                                size="small"
                            />
                        </Tooltip>
                    </Col>
                </Row>
            </Header>

            <Content>
                {props.children}
            </Content>
        </Layout>
    );
}