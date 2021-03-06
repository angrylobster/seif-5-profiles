import { Col, message, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import ApplicationLayout from '../components/layouts/ApplicationLayout';
import useUser from '../hooks/useUser';
import ProfileDetails from '../components/profile/ProfileDetails';
import ProfileData from '../components/profile/ProfileData';
import { frontendApiService } from '../services/api';
import { Homework, HomeworkCompletion } from '../interfaces/homework';
import { HttpResponse } from '../interfaces/http';
import { AttendanceDataProps } from '../components/attendance/AttendanceData';

function Profile (): JSX.Element {
    const { user } = useUser('/');
    const [attendanceRecords, setAttendanceRecords] = useState({
        P: [],
        L: [],
        A: [],
        E: [],
        EA: [],
        SC: [],
        H: [],
    });
    const [totalAttendanceRecords, setTotalAttendanceRecords] = useState(0);
    const [isHomeworkLoading, setIsHomeworkLoading] = useState(false);
    const [isFetchingAttendance, setIsFetchingAttendance] = useState(false);
    const [submissions, setSubmissions] = useState([]);
    const [homeworkCompletion, setHomeworkCompletion] = useState(0);

    useEffect(() => {
        if (user) {
            setIsHomeworkLoading(true);
            frontendApiService.get<HttpResponse<Homework[]>>('api/homework')
                .then(response => {
                    const submissions = response.data.map((homework: Homework, index: number) => ({ ...homework, key: index.toString() }));
                    const completedSubmissions = submissions.filter(submission => submission.completion === HomeworkCompletion.Completed);
                    setSubmissions(submissions);
                    setHomeworkCompletion(completedSubmissions.length / submissions.length * 100);
                })
                .catch((err) => {
                    message.error(`${err.status ? err.status + ': ' : ''}${err.data || err.message}`);
                })
                .finally(() => setIsHomeworkLoading(false));
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            setIsFetchingAttendance(true);
            frontendApiService.get<HttpResponse<AttendanceDataProps>>('api/attendance')
                .then(response => {
                    setAttendanceRecords(response.data.records);
                    setTotalAttendanceRecords(response.data.totalRecords);
                })
                .catch(err => {
                    message.error(`${err.status ? err.status + ': ' : ''}${err.data || err.message}`);
                })
                .finally(() => setIsFetchingAttendance(false));
        }
    }, [user]);
    
    return (
        <ApplicationLayout
            user={user}
        >
            <Row style={{ padding: '24px 12px' }}>
                <Col 
                    md={6} 
                    sm={24}
                    xs={24}
                    style={{ paddingLeft: '12px', paddingRight: '12px', marginBottom: '24px' }}
                >
                    <ProfileDetails 
                        user={user}
                    />
                </Col>
                    
                <Col 
                    md={18} 
                    sm={24}
                    xs={24}
                    style={{ paddingLeft: '12px', paddingRight: '12px' }}
                >
                    <ProfileData 
                        homeworkData={{
                            submissions,
                            completionPercentage: homeworkCompletion,
                            isLoading: isHomeworkLoading,
                        }}
                        attendanceData={{
                            records: attendanceRecords,
                            totalRecords: totalAttendanceRecords,
                            isLoading: isFetchingAttendance,
                        }}
                    />
                </Col>
            </Row>
        </ApplicationLayout>  
    );
}

export default Profile;