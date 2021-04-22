export interface Homework {
    name: string;
    lesson: string;
    dueDate: string;
    completion?: string;
}

export type HomeworkTableData = Homework & { key: number };

export enum HomeworkCompletion {
    Completed = 'Y',
    Incomplete = 'N'
}