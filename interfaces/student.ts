import { NameDetails } from './auth';
import { HomeworkRecords } from './homework';

export interface StudentProfile {
    email: string;
    name: NameDetails;
    homework: HomeworkRecords;
}