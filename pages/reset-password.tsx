import { MailOutlined } from '@ant-design/icons'
import { Button, Input, message, Typography } from 'antd'
import Form from 'antd/lib/form/Form'
import FormItem from 'antd/lib/form/FormItem'
import Router from 'next/router'
import React, { useState } from 'react'
import PreloginLayout from "../components/layouts/PreloginLayout"
import { UserCredentials } from '../interfaces/auth'
import { frontendApiService } from '../services/api'

export default function ResetPassword (): JSX.Element {
    const [isLoading, setIsLoading] = useState(false)
    const [isPasswordReset, setIsPasswordReset] = useState(false)

    const resetPassword = (data: Pick<UserCredentials, 'email'>) => {
        setIsLoading(true)
        frontendApiService.post('api/auth/reset-password', { data })
            .then(() => {
                message.success('Password reset email sent! Please check your inbox for details')
                setIsPasswordReset(true)
            })
            .catch(err => message.error(`${err.status}: ${err.data || err.message}`))
            .finally(() => setIsLoading(false))
    }

    return (
        <PreloginLayout>
            <Form
                name="reset_password"
                className="login-form"
                onFinish={resetPassword}
            >
                <FormItem>
                    <Typography.Title level={3} style={{ marginBottom: '0px' }}>
                        Reset password email
                    </Typography.Title>
                </FormItem>

                <FormItem
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input 
                        prefix={<MailOutlined className="site-form-item-icon" />} 
                        placeholder="Email" 
                        disabled={isLoading}
                    />
                </FormItem>

                <FormItem>
                    <Button 
                        block
                        type="primary"
                        htmlType="submit"
                        disabled={isPasswordReset}
                        loading={isLoading}
                    >
                        Reset password
                    </Button>

                    <Button
                        block
                        type="default"
                        htmlType="button"
                        onClick={() => Router.replace('/')}
                        style={{marginTop: '8px'}}
                    >
                        Go back
                    </Button>

                </FormItem>
            </Form>
        </PreloginLayout>
    )
}