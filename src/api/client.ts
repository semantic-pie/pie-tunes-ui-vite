import { responseToPieApiResponse } from "@/utils/hellpers";
import {
  api,
  EventBody,
  FindByDateParams,
  FindByQuery,
  FindByTitleParams,
  FindByUserUuid,
  FindByUuid,
  MusicAlbum,
  MusicBand,
  Playlist,
  SearchResult,
  Track,
} from ".";

import Cookies from "js-cookie";

export interface PieApiResponse<T> {
  data: T;
  meta: {
    status: number;
    xTotalCount: number;
  };
}

export type SearchResponse = {
  uuid: string;
  name: string;
  entity_type: "BAND" | "ALBUM" | "TRACK";
  bandName: string;
};
export type SearchResponseRoot = {
  tracks: SearchResponse[];
  albums: SearchResponse[];
  bands: SearchResponse[];
};

export type SnoopySearchTrack = {
  id: string;
  title: string;
  lengthInMilliseconds: number;
  bandName: string;
  coverUrl: string;
};

export interface SignUpData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ApiUser {
  username: string;
  email: string;
}

export type PreferredGenresData = string[];

export interface AuthResponse {
  accessToken: string;
}

export type SnoopySearchTrackExtended = SnoopySearchTrack & {
  status?: SnoopyTrackStatus;
};

export enum SnoopyTrackStatus {
  IN_PROCESS,
  SUCCESSFULLY,
  FAILED,
}

interface PieApiClient {
  findTrackByUuid: (params: FindByUuid) => Promise<PieApiResponse<Track>>;
  findTrackByTitle: (
    params: FindByTitleParams,
  ) => Promise<PieApiResponse<Track[]>>;
  findTrackByDate: (
    params: FindByDateParams,
  ) => Promise<PieApiResponse<Track[]>>;
  findTrackByAlbum: (params: FindByUuid) => Promise<PieApiResponse<Track[]>>;
  findTrackByPlaylist: (
    params: FindByUuid,
  ) => Promise<PieApiResponse<Playlist>>;
  findTrackDeprecated: (
    params: FindByTitleParams,
  ) => Promise<PieApiResponse<Track[]>>;

  findPlaylistsByDate: (
    params: FindByUserUuid,
  ) => Promise<PieApiResponse<Playlist[]>>;
  findGenrePlaylistsByDate: (
    params: FindByUserUuid,
  ) => Promise<PieApiResponse<Playlist[]>>;
  generatePlaylist: () => Promise<PieApiResponse<any>>;
  findAlbumsByUuid: (
    params: FindByUuid,
  ) => Promise<PieApiResponse<MusicAlbum>>;
  findAlbumsByTitle: (
    params: FindByTitleParams,
  ) => Promise<PieApiResponse<MusicAlbum[]>>;
  findAlbumsByDate: (
    params: FindByDateParams,
  ) => Promise<PieApiResponse<MusicAlbum[]>>;
  findAlbumsDeprecated: (
    params: FindByTitleParams,
  ) => Promise<PieApiResponse<MusicAlbum[]>>;

  findArtistsByTitle: (
    params: FindByTitleParams,
  ) => Promise<PieApiResponse<MusicBand[]>>;
  findArtistsByDate: (
    params: FindByDateParams,
  ) => Promise<PieApiResponse<MusicBand[]>>;
  findArtistsDeprecated: (
    params: FindByTitleParams,
  ) => Promise<PieApiResponse<MusicBand[]>>;
  findArtistsByUuid: (
    params: FindByUuid,
  ) => Promise<PieApiResponse<MusicBand>>;

  searchByTitle: (
    params: FindByTitleParams & { controller?: AbortController },
  ) => Promise<PieApiResponse<SearchResult>>;

  uploadMp3: (body: FormData) => Promise<any>;

  postEvent: (body: EventBody) => Promise<PieApiResponse<void>>;
  searchSnoopy: (
    params: FindByQuery,
  ) => Promise<PieApiResponse<SnoopySearchTrack[]>>;
  uploadSnoopy: (
    params: { query: string },
  ) => Promise<PieApiResponse<{ uploadedTrack: { uuid: string } }>>;

  authSignUp: (body: SignUpData) => Promise<PieApiResponse<AuthResponse>>;
  authLogin: (body: LoginData) => Promise<PieApiResponse<AuthResponse>>;
  getUser: () => Promise<PieApiResponse<ApiUser>>;
  putPreferredGenres: (
    body: PreferredGenresData,
  ) => Promise<PieApiResponse<any>>;
}

const get = (params: { auth?: boolean }) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (params.auth) {
    headers.append("Authorization", `Bearer ${Cookies.get("token")}`);
  }

  return {
    method: "GET",
    headers,
  };
};

const postWithBody = (
  params: {
    auth?: boolean;
    body?: any;
    contentType?: string;
    disableContentType?: boolean;
  },
) => {
  const headers = new Headers();

  if (!params.disableContentType) {
    if (params.contentType) {
      headers.append("Content-Type", params.contentType);
    } else {
      headers.append("Content-Type", "application/json");
    }
  }

  if (params.auth) {
    headers.append("Authorization", `Bearer ${Cookies.get("token")}`);
  }

  const body = params.body
    ? (params.disableContentType ? params.body : JSON.stringify(params.body))
    : undefined;

  console.log("payload: ", body);
  return {
    method: "POST",
    headers,
    body,
  };
};

export const pieApiClient: PieApiClient = {
  getUser: async () =>
    fetch(api.urlForUser(), get({ auth: true }))
      .then(responseToPieApiResponse),
  authSignUp: async (body) =>
    fetch(api.urlForAuthSignUp(), postWithBody({ body }))
      .then(responseToPieApiResponse),
  authLogin: async (body) =>
    fetch(api.urlForAuthLogin(), postWithBody({ body }))
      .then(responseToPieApiResponse),
  putPreferredGenres: async (body) =>
    fetch(api.urlForPreferredGenres(), postWithBody({ body, auth: true }))
      .then(responseToPieApiResponse),
  findTrackByUuid: async (params) =>
    fetch(api.urlForTracksByUuid(params), get({ auth: true }))
      .then(responseToPieApiResponse),
  findTrackByTitle: async (params) =>
    fetch(api.urlForTracksByTitle(params), get({ auth: true }))
      .then(responseToPieApiResponse),
  findTrackByDate: async (params) =>
    fetch(api.urlForTracksByDate(params), get({ auth: true }))
      .then(responseToPieApiResponse),
  findTrackByAlbum: async (params) =>
    fetch(api.urlForTracksByAlbum(params), get({ auth: true }))
      .then(responseToPieApiResponse),
  findAlbumsByUuid: async (params) =>
    fetch(api.urlForAlbumsByUuid(params), get({ auth: true }))
      .then(responseToPieApiResponse),
  findTrackByPlaylist: async (params) =>
    fetch(api.urlForTracksByPlaylist(params), get({ auth: true }))
      .then(responseToPieApiResponse),
  findTrackDeprecated: async (params) =>
    fetch(api.urlForTracksDeprecated(params), get({ auth: true }))
      .then(responseToPieApiResponse),
  findPlaylistsByDate: async () =>
    fetch(api.urlForPlaylistsByDate(), get({ auth: true }))
      .then(responseToPieApiResponse),
  findGenrePlaylistsByDate: async () =>
    fetch(api.urlForGenrePlaylistsByDate(), get({ auth: true }))
      .then(responseToPieApiResponse),
  generatePlaylist: async () => 
    fetch(api.urlForPlaylistGenerate(), get({auth: true}))
      .then(responseToPieApiResponse),
  findAlbumsByTitle: async (params) =>
    fetch(api.urlForAlbumsByTitle(params), get({ auth: true }))
      .then(responseToPieApiResponse),
  findAlbumsByDate: async (params) =>
    fetch(api.urlForAlbumsByDate(params), get({ auth: true }))
      .then(responseToPieApiResponse),
  findAlbumsDeprecated: async (params) =>
    fetch(api.urlForAlbumsDeprecated(params), get({ auth: true }))
      .then(responseToPieApiResponse),
  findArtistsByTitle: async (params) =>
    fetch(api.urlForArtistsByTitle(params), get({ auth: true }))
      .then(responseToPieApiResponse),
  findArtistsByDate: async (params) =>
    fetch(api.urlForArtistsByDate(params), get({ auth: true }))
      .then(responseToPieApiResponse),
  findArtistsDeprecated: async (params) =>
    fetch(api.urlForArtistsDeprecated(params), get({ auth: true }))
      .then(responseToPieApiResponse),
  findArtistsByUuid: async (params) =>
    fetch(api.urlForArtistsByUuid(params), get({ auth: true }))
      .then(responseToPieApiResponse),
  uploadMp3: async (body) =>
    fetch(
      api.urlForSingleUpload(),
      postWithBody({ body, auth: true, disableContentType: true }),
    )
      .then(responseToPieApiResponse),
  postEvent: async (body) =>
    fetch(api.urlForEvents(), postWithBody({ body, auth: true }))
      .then(responseToPieApiResponse),
  searchByTitle: async (params) =>
    fetch(api.urlForGlobalSearch(params), {
      ...get({ auth: true }),
      signal: params.controller?.signal,
    })
      .then(responseToPieApiResponse),
  searchSnoopy: async (params) =>
    fetch(api.urlForSnoopySearch(params), get({ auth: true }))
      .then(responseToPieApiResponse),
  uploadSnoopy: async (params) =>
    fetch(api.urlForSnoopyUpload(params), get({ auth: true }))
      .then(responseToPieApiResponse),
};
