import { createRoute } from "@tanstack/react-router";
import { rootRoute } from ".";
import Player from "@/components/Player";
import MobilePlayer from "@/components/MobilePlayer";
import { playTrack, useAppDispatch } from "@/redux/store";
import { useEffect } from "preact/hooks";
import { pieApiClient } from "@/api/client";
import { Helmet } from '@notwoods/preact-helmet'
import { api } from "@/api";
import { config } from "@/appConfiguration";

export const playerScreen = createRoute({
    getParentRoute: () => rootRoute,
    path: '/player',
    component: () => {
        const isMobile = window.innerWidth < 640

        if (isMobile) return <MobilePlayer />
        else return <Player />
    }
})

export const sharePlayerScreen = createRoute({
    getParentRoute: () => rootRoute,
    path: '/player/$uuid',
    loader: ({ params }) => pieApiClient.findTrackByUuid({ uuid: params.uuid }).then(res => res.data),
    component: () => {
        const track = sharePlayerScreen.useLoaderData()

        const isMobile = window.innerWidth < 640
        const dispatch = useAppDispatch()
        // const track = useAppSelector(state => state.library.songs)[0]
        const { uuid } = sharePlayerScreen.useParams()

        // const [track, setTrack] = useState<Track>()

        useEffect(() => {
            // pieApiClient.findTrackByUuid({ uuid })
            //     .then(data => {
            //         dispatch(playTrack(data.data))
            //         setTrack(data.data)
            //     })
            dispatch(playTrack(track))

        }, [])

        return (
            <>


                <Helmet link={[
                    { as: "image", rel: "preload", href: api.urlForTrackCoverById({ id: track.album.uuid }) }
                ]} meta={[
                    { name: "title", content: `${track.title} - ${track.band.name}` },
                    { name: "description", content: `${track.title} - ${track.band.name}` },
                    { property: "og:title", content: `${track.title} - ${track.band.name}` },
                    { property: "og:site_name", content: `@pietunes` },
                    { property: "og:description", content: `${track.title} - ${track.band.name}` },
                    { property: "og:image", content: api.urlForTrackCoverById({ id: track.album.uuid }) },
                    { property: "og:image:width", content: '400' },
                    { property: "og:image:height", content: '400' },
                    { property: "og:url", content: `${config.host.domain}/player/${uuid}` },
                    { property: "og:type", content: 'music.song' },
                    { property: "twitter:card", content: "summary" },
                    { property: "twitter:site", content: "Pie Tunes" },
                    { property: "twitter:image", content: api.urlForTrackCoverById({ id: track.album.uuid }) },
                    { property: "twitter:title", content: "Pie Tunes" },
                    { property: "twitter:description", content: `${track.band.name} · Song${track.releaseYear ? ' · ' + track.releaseYear : ''}` },
                    // { name: "type", content: "mp3" }
                ]} title={`${track.title} - ${track.band.name}`} />
                {isMobile ? <MobilePlayer /> : <Player />}
            </>

        )
    }
})

{/* <meta name="twitter:card" content="summary_large_image">
		<meta name="twitter:site" content="Variants World">
		<meta name="twitter:image" content={ogImage}>
		<meta name="twitter:title" content={title}></meta> */}

{/* <title>{track.title} - {track.band.name}</title>
                        <meta property="og:title" content={`${track.title} - ${track.band.name}`} />
                        <meta property="og:description" content={`${track.title} - ${track.band.name}`} />
                        <meta property="og:image" content={api.urlForTrackCoverById(track.album.)} />
                        <meta property="og:url" content={`http://192.168.192.69/player/${uuid}`} />
                        <meta property="og:type" content="music.song" /> */}
// </Helmet>


