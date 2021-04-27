export class Homework {
    name: string;
    lesson: string;
    dueDate: string;
    completion?: string;

    constructor (
        name: string,
        lesson: string,
        dueDate: string,
        completion?: string,
    ) {
        this.name = name;
        this.lesson = lesson;
        this.dueDate = dueDate;
        this.completion = completion;
    }
}

export type HomeworkTableData = Homework & { key: number };

export enum HomeworkCompletion {
    Completed = 'Y',
    Incomplete = 'N'
}