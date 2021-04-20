import { MailOutlined } from '@ant-design/icons'
import { Button, Input, message, Typography } from 'antd'
import Form from 'antd/lib/form/Form'
import FormItem from 'antd/lib/form/FormItem'
import React, { useState } from 'react'
import PreloginLayout from "../components/layouts/PreloginLayout"
import { UserCredentials } from '../interfaces/auth'
import { frontendApiService } from '../services/api'

export default function ResetPassword (): JSX.Element {
    const [isResettingPassword, setIsResettingPassword] = useState(false)
    const resetPassword = (data: Pick<UserCredentials, 'email'>) => {
        frontendApiService.post('api/auth/reset-password', { data })
            .then(response => {
                console.log(response)
            })
            .catch(err => message.error(`${err.status}: ${err.data || err.message}`))
            .finally(() => setIsResettingPassword(false))
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
                        disabled={isResettingPassword}
                    />
                </FormItem>

                <FormItem>
                    <Button 
                        block
                        type="primary"
                        htmlType="submit"
                        loading={isResettingPassword}
                    >
                        Reset password
                    </Button>
                </FormItem>
            </Form>
        </PreloginLayout>
    )
}