import { message, Table, Typography } from "antd";
import { ColumnsType, ColumnType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import { UserProps } from "../../interfaces/auth";
import { Homework, HomeworkCompletion, HomeworkCompletionRecord, HomeworkProps } from "../../interfaces/homework";
import { HttpResponse } from "../../interfaces/http";
import { frontendApiService } from "../../services/api";
import HomeworkCompletionIcon from "./HomeworkCompletionIcon";

export default function HomeworkTable (props: HomeworkProps & UserProps): JSX.Element {
    const [isTableLoading, setIsTableLoading] = useState(true);
    const [homeworkColumns, setHomeworkColumns] = useState([]);
    const [homeworkCompletion, setHomeworkCompletion] = useState([]);
    const [completionPercentage, setCompletionPercentage] = useState(0);

    useEffect(() => {
        setHomeworkColumns(props.homework.reduce((columns, homework: Homework, index: number) => {
            columns.push({
                className: 'homeworkCompletionTableHeader',
                key: index,
                title: homework.lesson,
                children: [
                    {
                        className: 'homeworkCompletionTableHeader',
                        title: homework.name,
                        width: 100,
                        dataIndex: ['homework', homework.lesson],
                        render (value: HomeworkCompletion) {
                            return <HomeworkCompletionIcon completion={value} />;
                        }
                    }
                ]
            });
            return columns;
        }, [] as ColumnsType<Homework>));
    }, []);

    useEffect(() => {
        if (props.user && homeworkColumns.length) {
            frontendApiService.get<HttpResponse<string[]>>('api/homework/student')
                .then(response => {
                    const result = homeworkColumns.reduce((result: HomeworkCompletionRecord, homework: ColumnType<Homework>, index: number) => {
                        result.homework[homework.title as string] = response.data[index];
                        return result;
                    }, { key: props.user.email, homework: {} } as HomeworkCompletionRecord);
                    const numberHomework = homeworkColumns.length;
                    const completedHomework = response.data.filter(homework => homework === HomeworkCompletion.Completed);
                    setCompletionPercentage(Number((completedHomework.length / numberHomework * 100).toFixed(2)));
                    setHomeworkCompletion([result]);
                })
                .catch((err) => {
                    message.error(`${err.status ? err.status + ': ' : ''}${err.message}`);
                    setHomeworkCompletion([]);
                })
                .finally(() => setIsTableLoading(false));
        }
    }, [props.user, homeworkColumns.length]);

    const computeCompletionClass = (percentage: number): string => {
        if (percentage > 70) return 'completion-green';
        if (percentage > 40) return 'completion-yellow';
        return 'completion-red';
    };

    return (
        <Table
            loading={isTableLoading}
            columns={homeworkColumns}
            dataSource={homeworkCompletion}
            bordered
            size="small"
            pagination={false}
            tableLayout="fixed"
            scroll={{x: true, y: 39}}
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