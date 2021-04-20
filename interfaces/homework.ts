export interface HomeworkRecords {
    [lesson: string]: Homework;
}

export interface Homework {
    name: string;
    lesson: string;
    dueDate: string;
}

export interface HomeworkProps {
    homework: Homework[]
}

export enum HomeworkCompletion {
    Completed = 'Y',
    Incomplete = 'N'
}

export interface HomeworkCompletionRecord {
    key: number | string;
    homework: {
        [lesson: string]: string
    }
}