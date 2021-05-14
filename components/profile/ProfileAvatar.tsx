import { UserOutlined } from '@ant-design/icons';
import { Avatar, Typography } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import randomColor from 'randomcolor';

export const PROFILE_AVATAR_DEFAULT_SIZE = 100;

export type ProfileAvatarProps = {
    firstName: string;
    lastName: string;
}

export default function ProfileAvatar ({
    firstName,
    lastName,
}: ProfileAvatarProps): ReactElement {
    const [initials, setInitials] = useState('');
    const [avatarColor, setAvatarColor] = useState('');

    useEffect(() => {
        const getFirstLetterFromWord = (word: string) => word ? word.substr(0, 1) : '';
        setInitials(getFirstLetterFromWord(firstName) + getFirstLetterFromWord(lastName));
    }, [firstName, lastName]);

    useEffect(() => {
        setAvatarColor(randomColor({ luminosity: 'dark'}));
    }, []);

    return (
        <>
            {firstName && lastName && 
                <Avatar
                    style={{ backgroundColor: avatarColor }}
                    icon={initials ? undefined : <UserOutlined />}
                    size={PROFILE_AVATAR_DEFAULT_SIZE}
                >
                    <Typography.Text
                        style={{ fontSize: 36, color: 'white' }}
                    >
                        {initials}
                    </Typography.Text>
                </Avatar>
            }
        </>
    );
}