import {
    Avatar,
    Divider,
    FormControl,
    Input,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    MenuItem,
    Select,
    styled,
    Typography,
    Paper,
} from '@mui/material';
import dayjs from 'dayjs';
import { collection, getDocs } from 'firebase/firestore/lite';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import {
    Link as ReactRouterLink,
    useParams,
    useLoaderData,
    useRouteLoaderData,
} from 'react-router-dom';
import { db } from '../../firebase';

var calendar = require('dayjs/plugin/calendar');
dayjs.extend(calendar);

const FilterSelect = styled(Select)(({ theme }) => ({
    borderRadius: 2,
    fontSize: '0.9em',
    fontWeight: 600,
    color: theme.palette.primary.main,
    '.MuiSvgIcon-root ': {
        color: theme.palette.primary.main,
    },
}));

export async function loader() {
    // Fetch posts from Cloud Firestore
    const res = await getDocs(collection(db, 'umd'));
    const posts = res.docs.map(doc => doc.data());

    // Fetch locations from Nominatim
    for (let post of posts) {
        post['nearest_location'] = (
            await (
                await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${post.loc._lat}&lon=${post.loc._long}&format=json`
                )
            ).json()
        ).display_name.split(',')[0];
    }
    return { posts };
}

export default function PostList() {
    // Get data from above loader
    const loaderData = useLoaderData();
    console.log(loaderData);

    return <div>postlist</div>;

    // const { posts } = useLoaderData();

    // const [sortBy, setSortBy] = React.useState(0);
    // const handleSortChange = event => {
    //     setSortBy(event.target.value);
    // };

    // return (
    //     <Paper
    //         elevation={1}
    //         sx={{ position: 'relative', width: 400, fontSize: '0.95em' }}>
    //         <Scrollbars style={{ height: 'calc(100vh - 49px)' }} autoHide>
    //             <FormControl
    //                 sx={{
    //                     width: '100%',
    //                     overflow: 'hidden',
    //                     px: 2.5,
    //                     pt: 2,
    //                     pb: 0.5,
    //                 }}
    //                 size="small">
    //                 <FilterSelect
    //                     MenuProps={{ elevation: 1 }}
    //                     value={sortBy}
    //                     onChange={handleSortChange}
    //                     input={<Input disableUnderline />}>
    //                     <MenuItem value={0}>By popularity</MenuItem>
    //                     <MenuItem value={1}>By date</MenuItem>
    //                 </FilterSelect>
    //             </FormControl>

    //             <List
    //                 sx={{
    //                     width: '100%',
    //                     bgcolor: 'background.paper',
    //                     // hover states
    //                     '& .MuiListItemButton-root:hover': {
    //                         bgcolor: '#ebf8ff',
    //                     },
    //                 }}>
    //                 {posts.map((p, i) => (
    //                     <React.Fragment key={i}>
    //                         <ListItem alignItems="flex-start" sx={{ p: 0 }}>
    //                             <ListItemButton
    //                                 alignItems="flex-start"
    //                                 component={ReactRouterLink}
    //                                 to={`/posts/${p.id}`}
    //                                 sx={{ px: 3, py: 1 }}>
    //                                 <ListItemAvatar>
    //                                     <Avatar
    //                                         alt={p.user}
    //                                         src="/static/images/avatar/1.jpg"
    //                                     />
    //                                 </ListItemAvatar>
    //                                 <ListItemText
    //                                     primaryTypographyProps={{
    //                                         fontWeight: 600,
    //                                     }}
    //                                     secondaryTypographyProps={{
    //                                         component: 'div'
    //                                     }}
    //                                     primary={p.title}
    //                                     secondary={
    //                                         <React.Fragment>
    //                                             <Typography
    //                                                 sx={{
    //                                                     display:
    //                                                         'inline-block',
    //                                                     fontSize: '0.85em',
    //                                                     textTransform:
    //                                                         'uppercase',
    //                                                     color: 'text.secondary',
    //                                                     fontWeight: 500,
    //                                                     borderRadius: 2,
    //                                                     background:
    //                                                         '#EBEBEB',
    //                                                     px: 0.5,
    //                                                     my: 0.5,
    //                                                 }}>
    //                                                 Event
    //                                             </Typography>
    //                                             <Typography>
    //                                                 {p.nearest_location}
    //                                             </Typography>
    //                                             <Typography>
    //                                                 {dayjs().calendar(
    //                                                     dayjs.unix(
    //                                                         p.eventTime
    //                                                             .seconds
    //                                                     )
    //                                                 )}
    //                                             </Typography>
    //                                         </React.Fragment>
    //                                     }
    //                                 />
    //                                 {/* <Typography>right side</Typography> */}
    //                             </ListItemButton>
    //                         </ListItem>
    //                         <Divider variant="inset" component="li" />
    //                     </React.Fragment>
    //                 ))}
    //             </List>
    //         </Scrollbars>
    //     </Paper>
    // );
}
