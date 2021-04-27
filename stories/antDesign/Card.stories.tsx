import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Button, Card, CardProps } from 'antd';
import { CardTabListType } from 'antd/lib/card';

export default {
    title: 'Components/AntDesign/Card',
    component: Button,
    argTypes: {
        bordered: { control: 'boolean' },
        hoverable: { control: 'boolean' },
        loading: { control: 'boolean' },
        size: {
            control: 'inline-radio',
            options: ['default', 'small'],
            defaultValue: 'default',
        },
        title: {
            control: 'text',
            defaultValue: '',
        },
    },
} as Meta;

const Template: Story<CardProps> = (args) => <Card { ...args } />;

export const Default = Template.bind({});
Default.args = {} as CardProps;

export const WithTabs = Template.bind({});
WithTabs.args = {
    tabList: new Array(3).fill('').map((value: string, index: number) => ({
        key: index.toString(),
        tab: `Tab ${index}`,
    } as CardTabListType)),
} as CardProps;