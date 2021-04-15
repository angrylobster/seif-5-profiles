import React from 'react'
import { Alert, AlertProps } from 'antd'

export default function ErrorAlert (props: AlertProps): JSX.Element {
    return (
        <>
            {
                props.message && (
                    <Alert
                        type="error"
                        message={props.message}
                    />
                )
            }
        </>
    )
}
