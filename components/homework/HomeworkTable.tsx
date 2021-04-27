import { Table, Typography } from 'antd';
import React from 'react';
import { Homework, HomeworkCompletion } from '../../interfaces/homework';
import HomeworkCompletionIcon from './HomeworkCompletionIcon';

export type HomeworkTableProps = {
    submissions: (Homework & { key: string })[];
    completionPercentage: number;
    isLoading: boolean;
}

export default function HomeworkTable (props: HomeworkTableProps): JSX.Element {
    const computeCompletionClass = (percentage: number): string => {
        if (percentage > 70) return 'completion-green';
        if (percentage > 40) return 'completion-yellow';
        return 'completion-red';
    };

    return (
        <Table
            loading={props.isLoading}
            columns={[
                {
                    title: 'Lesson',
                    dataIndex: 'lesson',
                    width: 100,
                    align: 'center',
                },
                {
                    title: 'Name',
                    dataIndex: 'name',
                    width: 300,
                },
                {
                    title: 'Due Date',
                    dataIndex: 'dueDate',
                    width: 100,
                    align: 'center',
                },
                {
                    title: 'Completion',
                    dataIndex: 'completion',
                    width: 100,
                    align: 'center',
                    render (value: HomeworkCompletion) {
                        return <HomeworkCompletionIcon completion={value}/>;
                    }
                }
            ]}
            dataSource={props.submissions}
            bordered
            size="small"
            pagination={false}
            tableLayout="fixed"
            scroll={{
                x: '100%',
            }}
            footer={() => {
                return props.completionPercentage ? (
                    <>
                        {props.completionPercentage && 
                            <Typography.Text>
                                Completion: <Typography.Text className={computeCompletionClass(props.completionPercentage)}>{props.completionPercentage.toFixed(2)}%</Typography.Text>
                            </Typography.Text>
                        }
                    </>
                ) : false;
            }}
        />
    );
}