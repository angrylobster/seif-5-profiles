import { LockOutlined } from '@ant-design/icons'
import { Button, Input, message, Typography } from 'antd'
import Form from 'antd/lib/form/Form'
import FormItem from 'antd/lib/form/FormItem'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import Router from 'next/router'
import React, { useState } from 'react'
import PreloginLayout from "../components/layouts/PreloginLayout"
import { ChangePasswordDto, PasswordResetProps, PasswordResetQuery, User, UserProps } from '../interfaces/auth'
import { HttpResponse } from '../interfaces/http'
import { sendRedirect } from '../libs/api'
import { backendApiService, frontendApiService } from '../services/api'

export default function ResetPassword (props: UserProps & PasswordResetProps): JSX.Element {
    const [isLoading, setIsLoading] = useState(false)

    const resetPassword = async (data: ChangePasswordDto) => {
        data.passwordResetId = props.passwordResetId
        setIsLoading(true)
        await frontendApiService.post('api/auth/change-password', { data })
            .then(() => {
                message.success('Changed password')
                Router.push('/')
            })
            .catch(err => message.error(`${err.status}: ${err.data || err.message}`))
            .finally(() => setIsLoading(false))
    }

    return (
        <PreloginLayout>
            <Form
                name="change_password"
                className="login-form"
                onFinish={resetPassword}
            >
                <FormItem>
                    <Typography.Title level={3} style={{ marginBottom: '0px' }}>
                        Hello, {props.user.name.first} {props.user.name.last}
                    </Typography.Title>
                </FormItem>

                <FormItem
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your password!' },
                    ]}

                >
                    <Input 
                        prefix={<LockOutlined className="site-form-item-icon" />} 
                        placeholder="New Password" 
                        disabled={isLoading}
                        type="password"
                    />
                </FormItem>

                <FormItem
                    name="confirmPassword"
                    rules={[
                        { required: true, message: 'Please input your password!' },
                        ({ getFieldValue }) => ({
                            validator (_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Passwords do not match!'));
                            },
                        }),
                    ]}
                    dependencies={['password']}
                >
                    <Input 
                        prefix={<LockOutlined className="site-form-item-icon" />} 
                        placeholder="Confirm New Password" 
                        disabled={isLoading}
                        type="password"
                    />
                </FormItem>

                <FormItem>
                    <Button 
                        block
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                    >
                        Set new password
                    </Button>
                </FormItem>
            </Form>
        </PreloginLayout>
    )
}

export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<unknown>> {
    const query = context.query as PasswordResetQuery
    if (!query.id) sendRedirect(context.res, '/')
    const user = await backendApiService.get<HttpResponse<Pick<User, 'name'>>>('auth/change-password', { params: { passwordResetId: query.id } })
        .then(res => res.data)
        .catch(() => sendRedirect(context.res, '/'))
    return { props: { user, passwordResetId: query.id } }
}

