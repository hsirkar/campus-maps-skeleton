import React from 'react';

import { PlaceOutlined } from '@mui/icons-material';
import { Avatar, Typography, darken } from '@mui/material';
import { blue, green } from '@mui/material/colors';
import dayjs from 'dayjs';

function PostAvatar({ p }) {
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
                background: isPlace ? blue[50] : green[50],
                color: isPlace
                    ? darken(blue[500], 0.3)
                    : darken(green[500], 0.3),
            }}>
            {p.type === 'places' ? (
                <PlaceOutlined sx={{ color: blue[500] }} />
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

export default React.memo(PostAvatar);
