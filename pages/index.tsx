import React, { useState } from 'react'
import { Button, Form, Input, message, Typography } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import Router from 'next/router'
import { UserCredentials } from '../interfaces/auth'
import { redirectAuth } from '../libs/api'
import { frontendApiService } from '../services/api'
import useUser from '../hooks/useUser'
import PreloginLayout from '../components/layouts/PreloginLayout'

export default function Home (): JSX.Element {
    const { mutateUser } = useUser()
    const [isLoggingIn, setIsLoggingIn] = useState(false)

    const login = async (credentials: UserCredentials) => {
        try {
            setIsLoggingIn(true)
            const { data: user } = await frontendApiService.post('api/auth/login', { data: credentials })
            mutateUser(user)
            Router.push('profile')
        } catch (err) {
            message.error(`${err.status}: ${err.data}`)
            setIsLoggingIn(false)
        }
    }

    return (
        <PreloginLayout>
            <Form
                name="normal_login"
                className="login-form"
                onFinish={login}
            >
                <Form.Item>
                    <Typography.Title level={3} style={{ marginBottom: '0px' }}>
                                SEIF 5 Student Profiles
                    </Typography.Title>
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input 
                        prefix={<MailOutlined className="site-form-item-icon" />} 
                        placeholder="Email" 
                        disabled={isLoggingIn}
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        disabled={isLoggingIn}
                    />
                </Form.Item>

                <Form.Item>
                    <Typography.Link href="/reset-password">
                        Reset password
                    </Typography.Link>
                </Form.Item>

                <Form.Item>
                    <Button 
                        type="primary" 
                        htmlType="submit"
                        loading={isLoggingIn}
                    >
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </PreloginLayout>
    )
}

export const getServerSideProps = redirectAuth();