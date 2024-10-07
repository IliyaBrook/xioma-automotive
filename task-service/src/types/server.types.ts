import http from 'http'

export type TServer =   http.Server<typeof http. IncomingMessage, typeof http. ServerResponse>