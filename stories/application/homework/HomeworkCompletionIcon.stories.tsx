import React from 'react';
import { Meta, Story } from '@storybook/react';
import HomeworkCompletionIcon, { HomeworkCompletionIconProps } from '../../../components/homework/HomeworkCompletionIcon';

export default {
    title: 'Components/Application/Homework/HomeworkCompletionIcon',
    component: HomeworkCompletionIcon,
    argTypes: {
        completion: {
            control: {
                type: 'inline-radio',
                options: ['Y', 'N', undefined],
            },
            defaultValue: undefined,
        }

    },
} as Meta;

const Template: Story<HomeworkCompletionIconProps> = args => <HomeworkCompletionIcon {...args} />;

export const Default = Template.bind({});
Default.args = {} as HomeworkCompletionIconProps;

export const Completed = Template.bind({});
Completed.args = { completion: 'Y' } as HomeworkCompletionIconProps;

export const Incomplete = Template.bind({});
Incomplete.args = { completion: 'N' } as HomeworkCompletionIconProps;