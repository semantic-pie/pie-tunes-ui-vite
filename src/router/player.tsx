import { createRoute, useNavigate } from "@tanstack/react-router";
import { rootRoute } from ".";
import Player from "@/components/Player";
import MobilePlayer from "@/components/MobilePlayer";
import { playTrack, useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "preact/hooks";
import { pieApiClient } from "@/api/client";
import { Helmet } from '@notwoods/preact-helmet'
import { api } from "@/api";
import { config } from "@/appConfiguration";

export const playerScreen = createRoute({
    getParentRoute: () => rootRoute,
    path: '/player',
    component: () => {
        // const isMobile = window.innerWidth < 640
        const currentTrack = useAppSelector(state => state.currentTrack)

        const nav = useNavigate()

        if (currentTrack)
            nav({ from: '/player', to: '/player/' + currentTrack.uuid })
    }
})

export const sharePlayerScreen = createRoute({
    getParentRoute: () => rootRoute,
    path: '/player/$uuid',
    loader: ({ params }) => pieApiClient.findTrackByUuid({ uuid: params.uuid }).then(res => res.data),
    component: () => {
        const track = sharePlayerScreen.useLoaderData()
        const currentTrack = useAppSelector(state => state.currentTrack)

        const isMobile = window.innerWidth < 640
        const dispatch = useAppDispatch()
        const { uuid } = sharePlayerScreen.useParams()

        useEffect(() => {
            if (!currentTrack)
                dispatch(playTrack(track))
        }, [])

        const nav = useNavigate()

        useEffect(() => {
            if (currentTrack)
                nav({ from: '/player', to: '/player/' + currentTrack.uuid })
        }, [currentTrack])

        return (
            <>
                <Helmet link={[
                    { rel: "image_src", href: api.urlForTrackCoverById({ id: track.album.uuid }) },
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
                ]} title={`${track.title} - ${track.band.name}`} />
                {isMobile ? <MobilePlayer /> : <Player />}
            </>

        )
    }
})
