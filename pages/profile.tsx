import { Col, Row, Typography } from 'antd';
import React, {  } from 'react';
import ApplicationLayout from '../components/layouts/ApplicationLayout';
import HomeworkTable from '../components/homework/HomeworkTable';
import useUser from '../hooks/useUser';

function Profile (): JSX.Element {
    const { user } = useUser('/');
    
    return (
        <ApplicationLayout
            user={user}
        >
            <Row justify="center" style={{ marginTop: '40px' }}>
                <Col 
                    md={17}
                    xs={19}
                >
                    <Typography.Title
                        level={3}
                        style={{marginBottom: '24px'}}
                    >
                        Homework Completion
                    </Typography.Title>

                    <Row justify="center">
                        <HomeworkTable 
                            user={user}
                        />
                    </Row>
                </Col>
            </Row>
        </ApplicationLayout>  
    );
}

export default Profile;