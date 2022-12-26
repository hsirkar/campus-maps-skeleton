import React from 'react';
import { Outlet } from 'react-router';

function Map() {
    return <div>Map that changes with url lol</div>;
}

export default function Root() {
    return (
        <div>
            <div>Title bar</div>
            <Outlet />
            <Map />
        </div>
    );
}
