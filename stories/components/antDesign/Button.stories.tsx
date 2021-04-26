import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Button } from 'antd';
import { BaseButtonProps } from 'antd/lib/button/button';
import { LockOutlined, MailOutlined } from '@ant-design/icons';

const SAMPLE_ICONS = { 
    MailOutlined: <MailOutlined />,
    LockOutlined: <LockOutlined />
};

export default {
    title: 'Components/AntDesign/Button',
    component: Button,
    argTypes: {
        block: { control: 'boolean' },
        danger: { control: 'boolean' },
        disabled: { control: 'boolean' },
        ghost: { control: 'boolean' },
        href: { control: 'text' },
        icon: {
            control: {
                type: 'select',
                options: Object.keys(SAMPLE_ICONS),
            },
            mapping: SAMPLE_ICONS,
        },
        size: {
            control: {
                type: 'inline-radio',
                options: ['small', 'middle', 'large'],
            },
            defaultValue: 'middle',
        },
        type: {
            control: {
                type: 'inline-radio',
                options: ['primary', 'ghost', 'dashed', 'link', 'text', 'default'],
            },
            defaultValue: 'default',
        },
        children: {
            control: 'text',
            defaultValue: 'Default'
        },
    },
} as Meta;

const Template: Story<BaseButtonProps> = (args) => <Button {...args}></Button>;

export const Default = Template.bind({});
Default.args = {} as BaseButtonProps;

export const Primary = Template.bind({});
Primary.args = { type: 'primary', children: 'Primary' } as BaseButtonProps;