import * as React from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, { Marker } from 'react-map-gl';
import {
    useLoaderData,
    useLocation,
    useNavigate,
    useParams,
    useRouteLoaderData,
} from 'react-router';

import Pin from '../../common/Pin.js';
import { useRoot } from '../root/Root';

const MAPBOX_TOKEN =
    'pk.eyJ1IjoicmFrcmlzaCIsImEiOiJjamptczYxOGMzc3dzM3BvbDB0andscXdwIn0.GY-HcAV_MakM6gwzSS17Fg';

function getBounds(posts) {
    const lats = posts.map(p => p.loc._lat);
    const longs = posts.map(p => p.loc._long);
    const bounds = [
        [Math.min(...longs), Math.min(...lats)],
        [Math.max(...longs), Math.max(...lats)],
    ];
    return bounds;
}

export default function Map() {
    const ref = React.useRef();
    const params = useParams();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { hovered, setHovered, context, sidebarExpanded } = useRoot();

    // Generate pins based on Root's loader data
    const { posts } = useLoaderData();
    const pins = React.useMemo(
        () =>
            posts.map((post, i) => (
                <Marker
                    key={i}
                    color="red"
                    longitude={post.loc._long}
                    latitude={post.loc._lat}
                    anchor="top"
                    style={{
                        cursor: 'pointer',
                        zIndex: hovered === post.id ? 10 : 9,
                    }}
                    onClick={e => {
                        e.originalEvent.preventDefault();
                        e.originalEvent.stopPropagation();
                        navigate('/p/' + post.id);
                    }}>
                    <Pin
                        post={post}
                        selected={params.id === post.id}
                        highlighted={hovered === post.id}
                        onMouseEnter={() => setHovered(post.id)}
                        onMouseLeave={() =>
                            hovered === post.id && setHovered(null)
                        }
                    />
                </Marker>
            )),
        [posts, params.id, navigate, hovered, setHovered]
    );

    // TODO: generate pin if no root data

    const rootLoaderData = useRouteLoaderData('root');
    const postLoaderData = useRouteLoaderData('p');

    React.useEffect(() => {
        // If post detail view then center the map
        if (params.id && postLoaderData?.post) {
            ref?.current?.easeTo({
                center: {
                    lon: postLoaderData.post.loc._long,
                    lat: postLoaderData.post.loc._lat,
                },
                offset: [-350 / 2, 0],
            });
        }

        // Else fit map to extent
        for (const url of [
            '/home',
            '/following',
            '/search',
            '/explore',
            '/saved',
        ]) {
            if (pathname.includes(url) && rootLoaderData?.posts.length) {
                // console.log(getBounds(rootLoaderData.posts));
                ref?.current?.fitBounds(getBounds(rootLoaderData.posts), {
                    padding: 75,
                });
            }
        }
    }, [pathname, params.id, postLoaderData, rootLoaderData]);

    return (
        <ReactMapGL
            initialViewState={{
                latitude: 38.9869,
                longitude: -76.9426,
                zoom: 15,
            }}
            minZoom={13}
            maxZoom={18}
            style={{
                position: 'fixed',
                zIndex: theme => theme.zIndex.map,
                width: '100vw',
                height: 'calc(100vh - 49px)',
                transition: 'left 0.2s',
                left: context ? (sidebarExpanded ? 200 : 0) : 0,
            }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
            ref={ref}>
            {pins}
        </ReactMapGL>
    );
}
