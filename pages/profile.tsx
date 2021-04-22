import { Col, Typography } from 'antd';
import React, {  } from 'react';
import { backendApiService } from '../services/api';
import { GetStaticPropsResult } from 'next';
import { Homework, HomeworkProps } from '../interfaces/homework';
import { HttpResponse } from '../interfaces/http';
import ApplicationLayout from '../components/layouts/ApplicationLayout';
import HomeworkTable from '../components/homework/HomeworkTable';
import useUser from '../hooks/useUser';

function Profile (props: HomeworkProps): JSX.Element {
    const { user } = useUser('/');
    
    return (
        <ApplicationLayout
            user={user}
        >
            <Col>
                <Typography.Title
                    level={3}
                    style={{marginBottom: '24px'}}
                >
                    Homework Completion
                </Typography.Title>
                <HomeworkTable 
                    homework={props.homework}
                    user={user}
                />
            </Col>
        </ApplicationLayout>  
    );
}

export async function getStaticProps (): Promise<GetStaticPropsResult<HomeworkProps>> {
    const homework = await backendApiService.get<HttpResponse<Homework[]>>('homework/columns')
        .then(response => response.data)
        .catch(() => []);

    return { props: { homework } };
}

export default Profile;