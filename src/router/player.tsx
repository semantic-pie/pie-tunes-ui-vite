import { createRoute, useNavigate } from "@tanstack/react-router";
import { rootRoute } from ".";
import MobilePlayer from "@/components/MobilePlayer";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "preact/hooks";
import { pieApiClient } from "@/api/client";
import { Helmet } from '@notwoods/preact-helmet'
import { api } from "@/api";
import { config } from "@/appConfiguration";
import { playTrack } from "@/redux/slices/playerSlice";
import { DesktopPlayerWrapper } from "@/components/DesktopPlayerComponent/DesktopPlayerWrapper";

export const playerScreen = createRoute({
    getParentRoute: () => rootRoute,
    path: '/player',
    component: () => {
        // const isMobile = window.innerWidth < 640
        const currentTrack = useAppSelector(state => state.player.queue.currentTrack)

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
        const dispatch = useAppDispatch()

        const { uuid } = sharePlayerScreen.useParams()
        const track = sharePlayerScreen.useLoaderData()

        const currentTrack = useAppSelector(state => state.player.queue.currentTrack)
        const isMobile = window.innerWidth < 640

        useEffect(() => {
            if (!currentTrack)
                dispatch(playTrack({ track }))
        }, [])

        const nav = useNavigate()

        useEffect(() => {
            if (currentTrack)
                nav({ to: '/player/' + currentTrack.uuid })
        }, [currentTrack])

        return (
            <>
                <Helmet link={[
                    // { rel: "image_src", href: api.urlForTrackCoverById({ id: track.musicAlbum.uuid }) },
                    // { as: "image", rel: "preload", href: api.urlForTrackCoverById({ id: track.musicAlbum.uuid }) }
                ]} meta={[
                    // { name: "title", content: `${track.title} - ${track.musicBand.name}` },
                    { name: "description", content: `Description` },
                    { property: "og:title", content: `${track.title} - ${track.musicBand.name}` },
                    // { property: "og:site_name", content: `@pietunes` },
                    { property: "og:description", content: `OG:Description` },
                    { property: "og:image", content: api.urlForTrackCoverById({ id: track.musicAlbum.uuid }) },
                    { property: "og:image:width", content: '256' },
                    { property: "og:image:height", content: '256' },
                    { property: "og:image:type", content: 'image/png' },
                    { property: "og:audio", content: api.urlForTrackStreamById({ id: track.uuid }) },
                    { property: "og:type", content: 'music.song' },
                    // { property: "og:url", content: `${config.host.domain}/player/${uuid}` },
                    // { property: "og:type", content: 'music.song' },
                    { property: "twitter:card", content: "player" },
                    { property: "twitter:site", content: "@pie_tunes_" },
                    { property: "twitter:image", content: api.urlForTrackCoverById({ id: track.musicAlbum.uuid }) },
                    { property: "twitter:title", content: `${track.title} - ${track.musicBand.name}` },
                    // { property: "twitter:description", content: `${track.musicBand.name} · Song${track.releaseYear ? ' · ' + track.releaseYear : ''}` },
                    { property: "twitter:description", content: `Twitter Description` },
                    // { property: "twitter:player", content: `Twitter Description` },
                ]} title={`${track.title} - ${track.musicBand.name}`} />
                {isMobile ? <MobilePlayer /> : <DesktopPlayerWrapper />}
            </>

        )
    }
})
