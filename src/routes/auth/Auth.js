import React from 'react';
import { Outlet } from 'react-router';

export default function Auth() {
    return (
        <div>
            <div>Authentication!</div>
            <Outlet />
        </div>
    );
}
