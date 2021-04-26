import { HomeworkCompletion } from "../../interfaces/homework";
import React from 'react';
import { CheckOutlined, CloseOutlined, QuestionOutlined } from "@ant-design/icons";

export type HomeworkCompletionIconProps = {
    completion?: HomeworkCompletion;
}

export default function HomeworkCompletionIcon (props: HomeworkCompletionIconProps): JSX.Element {
    switch (props.completion) {
        case HomeworkCompletion.Completed: 
            return <CheckOutlined style={{ color: 'green' }} />;
        case HomeworkCompletion.Incomplete:
            return <CloseOutlined style={{ color: 'red' }} />;
        default: 
            return <QuestionOutlined style={{ color: 'gray' }} />;
    }
}