import React from 'react';
import { PlaceOutlined } from '@mui/icons-material';
import { Avatar, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { blue, red } from '@mui/material/colors';

export default function PostAvatar({ p }) {
    const isPlace = p.type === 'places';
    const date = isPlace || dayjs.unix(p.eventTime.seconds);

    return (
        <Avatar
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: isPlace ? 42 : 50,
                borderRadius: isPlace ? '50%' : 1,
                gap: 0.5,
                background: isPlace ? red[50] : blue[50],
                color: isPlace ? red[500] : blue[500],
            }}>
            {p.type === 'places' ? (
                <PlaceOutlined sx={{ color: red[500] }} />
            ) : (
                <React.Fragment>
                    <Typography fontWeight={500} variant="caption">
                        {date.format('ddd')}
                    </Typography>
                    <Typography variant="h4" mb={-1.2} mt={-1.2}>
                        {date.format('D')}
                    </Typography>
                    <Typography fontWeight={500} variant="caption">
                        {date.format('MMM')}
                    </Typography>
                </React.Fragment>
            )}
        </Avatar>
    );
}
