import React from 'react'
import { checkAuthOrRedirect } from '../utils/api'

function Profile (): JSX.Element {
    return (
        <div>banana</div>
    )
}

export const getServerSideProps = checkAuthOrRedirect()

export default Profile