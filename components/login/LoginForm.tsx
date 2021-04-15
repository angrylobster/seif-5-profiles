import React from 'react'
import { Form, Input, Button, Typography, message } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { UserCredentials } from '../../interfaces/auth'
import { frontendApiService } from '../../services/api'
import { useRouter } from 'next/router'
import { HttpBackendError } from '../../interfaces/http'

const LoginForm = (): JSX.Element => {
    const router = useRouter()

    const loginUser = async (userCredentials: UserCredentials) => {
        frontendApiService.post('api/auth/login', { data: userCredentials })
            .then(() => router.push('profile'))
            .catch((err: HttpBackendError) => message.error(`${err.status}: ${err.data}`))
    }

    return (
        <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={loginUser}
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
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <a className="login-form-forgot" href="">
                    Forgot password
                </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Log in
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm
