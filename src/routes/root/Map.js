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

const MAPBOX_TOKEN =
    'pk.eyJ1IjoicmFrcmlzaCIsImEiOiJjamptczYxOGMzc3dzM3BvbDB0andscXdwIn0.GY-HcAV_MakM6gwzSS17Fg';

export default function Map({ hovered, setHovered }) {
    const ref = React.useRef();
    const params = useParams();
    const navigate = useNavigate();

    // Save context
    // TODO: move this to root or context
    const [context, setContext] = React.useState();
    const { pathname } = useLocation();

    React.useEffect(() => {
        if (!pathname.includes('/p/')) setContext(pathname);

        if (ref.current) ref.current.resize();

        setHovered(null);
    }, [pathname, setHovered]);

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
                    style={{ cursor: 'pointer' }}
                    onClick={e => {
                        e.originalEvent.preventDefault();
                        e.originalEvent.stopPropagation();
                        navigate('/p/' + post.id, { state: { context } });
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
        [posts, params.id, navigate, hovered, context, setHovered]
    );

    // TODO: generate pin if no root data

    const routeLoaderData = useRouteLoaderData('p');
    React.useEffect(() => {
        if (!params.id || !routeLoaderData || !routeLoaderData.post) return;

        ref?.current?.easeTo({
            center: {
                lon: routeLoaderData.post.loc._long,
                lat: routeLoaderData.post.loc._lat,
            },
        });
    }, [params.id, routeLoaderData]);

    return (
        <ReactMapGL
            initialViewState={{
                latitude: 38.9869,
                longitude: -76.9426,
                zoom: 15,
            }}
            minZoom={13}
            maxZoom={18}
            style={{ width: '100%', height: 'calc(100vh - 49px)' }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={MAPBOX_TOKEN}
            ref={ref}>
            {pins}
        </ReactMapGL>
    );
}
