import { message, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { UserProps } from "../../interfaces/auth";
import { Homework, HomeworkCompletion } from "../../interfaces/homework";
import { HttpResponse } from "../../interfaces/http";
import { frontendApiService } from "../../services/api";
import HomeworkCompletionIcon from "./HomeworkCompletionIcon";


export default function HomeworkTable (props: UserProps): JSX.Element {
    const [isTableLoading, setIsTableLoading] = useState(true);
    const [homework, setHomework] = useState([]);
    const [completionPercentage, setCompletionPercentage] = useState(0);

    useEffect(() => {
        frontendApiService.get<HttpResponse<Homework[]>>('api/homework')
            .then(response => {
                const homework = response.data.map((homework: Homework, index: number) => ({ ...homework, key: index }));
                const completedHomework = homework.filter(homework => homework.completion === HomeworkCompletion.Completed);
                setHomework(homework);
                setCompletionPercentage(completedHomework.length / homework.length * 100);
            })
            .catch((err) => {
                message.error(`${err.status ? err.status + ': ' : ''}${err.data || err.message}`);
            })
            .finally(() => setIsTableLoading(false));
    }, [props.user]);

    const computeCompletionClass = (percentage: number): string => {
        if (percentage > 70) return 'completion-green';
        if (percentage > 40) return 'completion-yellow';
        return 'completion-red';
    };

    return (
        <Table
            loading={isTableLoading}
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
            dataSource={homework}
            bordered
            size="small"
            pagination={false}
            tableLayout="fixed"
            scroll={{ y: 250 }}
            footer={() => {
                return completionPercentage ? (
                    <>
                        {completionPercentage && 
                        <Typography.Text>
                            Completion: <Typography.Text className={computeCompletionClass(completionPercentage)}>{completionPercentage}%</Typography.Text>
                        </Typography.Text>
                        }
                    </>
                ) : false;
            }}
        />
    );
}