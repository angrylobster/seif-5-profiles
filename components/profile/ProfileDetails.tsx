import { Card, Col, Row, Skeleton, Tooltip, Typography } from 'antd';
import React from 'react';
import { ReactElement } from 'react';
import ProfileAvatar from './ProfileAvatar';
import profile from '../../styles/modules/profile.module.css';
import helpers from '../../styles/modules/helpers.module.css';
import { CalendarOutlined, FormOutlined, GithubOutlined } from '@ant-design/icons';
import moment from 'moment';
import { User } from '../../interfaces/auth';

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
    user: User;
}

export default function ProfileDetails (props: ProfileDetailsProps): ReactElement {
    return (
        <Card>
            {!props.user
                ? <Skeleton />
                : <Col>
                    <Row justify="center" className={helpers['mb-4']}>
                        <Col>
                            <Row 
                                className={helpers['mb-4']} 
                                justify="center"
                            >
                                <Col>
                                    <ProfileAvatar 
                                        firstName={props.user.name.first}
                                        lastName={props.user.name.last}
                                    />
                                </Col>
                            </Row>

                            <Row justify="center">
                                <Col>
                                    <Typography.Text className={profile.userName}>
                                        {props.user.name.first} {props.user.name.last}
                                    </Typography.Text>
                                </Col>
                            </Row>

                            <Row justify="center">
                                <Col>
                                    <Typography.Text>{props.user.email}</Typography.Text>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
            
                    <Row>
                        <Col>
                            <ProfileDetailsAttribute description="Enrollment Date" show={!!props.user.enrollmentDate}>
                                <CalendarOutlined style={{ marginRight: '4px' }} />
                                {moment(props.user.enrollmentDate, 'D-MMM-YY').format('D MMM YYYY')}
                            </ProfileDetailsAttribute>

                            <ProfileDetailsAttribute description="Readiness Assessment" show={!!props.user.readinessAssessment}>
                                <FormOutlined style={{ marginRight: '4px' }} />
                                {props.user.readinessAssessment} / 30
                            </ProfileDetailsAttribute>
                    
                            <ProfileDetailsAttribute description="GitHub Handle" show={!!props.user.githubHandle}>
                                <GithubOutlined style={{ marginRight: '4px' }} />
                                {props.user.githubHandle}
                            </ProfileDetailsAttribute>
                        </Col>
                    </Row>
                </Col>
            }
        </Card>
    );
}