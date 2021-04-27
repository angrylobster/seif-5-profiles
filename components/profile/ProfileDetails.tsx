import { Card, Col, Row, Skeleton, Tooltip, Typography } from 'antd';
import React from 'react';
import { ReactElement } from 'react';
import ProfileAvatar from './ProfileAvatar';
import profile from '../../styles/modules/profile.module.css';
import helpers from '../../styles/modules/helpers.module.css';
import { CalendarOutlined, FormOutlined, GithubOutlined } from '@ant-design/icons';
import moment from 'moment';

type ProfileDetailsAttributeProps = {
    children: unknown;
    description: string;
    show?: boolean;
}

function ProfileDetailsAttribute (props: ProfileDetailsAttributeProps) {
    return (
        <Row align="middle">
            {props.show && 
                <Tooltip title={props.description} placement="right">
                    {props.children}
                </Tooltip>}
        </Row>
    );
}

export type ProfileDetailsProps = {
    firstName: string;
    lastName: string;
    email: string;
    enrollmentDate: string;
    githubHandle: string;
    readinessAssessment: number;
}

export default function ProfileDetails (profileDetails: ProfileDetailsProps): ReactElement {
    return (
        <Card>
            {!profileDetails
                ? <Skeleton />
                : <>
                    <Row justify="center" className={helpers['mb-4']}>
                        <Col>
                            <Row 
                                className={helpers['mb-4']} 
                                justify="center"
                            >
                                <ProfileAvatar 
                                    firstName={profileDetails.firstName}
                                    lastName={profileDetails.lastName}
                                />
                            </Row>

                            <Row justify="center">
                                <Typography.Text className={profile.userName}>{profileDetails.firstName} {profileDetails.lastName}</Typography.Text>
                            </Row>

                            <Row justify="center">
                                <Typography.Text>{profileDetails.email}</Typography.Text>
                            </Row>
                        </Col>
                    </Row>
            
                    <Row>
                        <Col>
                            <ProfileDetailsAttribute description="Enrollment Date" show={!!profileDetails.enrollmentDate}>
                                <CalendarOutlined style={{ marginRight: '4px' }} />
                                {moment(profileDetails.enrollmentDate, 'D-MMM-YY').format('D MMM YYYY')}
                            </ProfileDetailsAttribute>

                            <ProfileDetailsAttribute description="Readiness Assessment" show={!!profileDetails.readinessAssessment}>
                                <FormOutlined style={{ marginRight: '4px' }} />
                                {profileDetails.readinessAssessment} / 30
                            </ProfileDetailsAttribute>
                    
                            <ProfileDetailsAttribute description="GitHub Handle" show={!!profileDetails.githubHandle}>
                                <GithubOutlined style={{ marginRight: '4px' }} />
                                {profileDetails.githubHandle}
                            </ProfileDetailsAttribute>
                        </Col>
                    </Row>
                </>
            }
        </Card>
    );
}