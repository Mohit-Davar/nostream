import { IncomingMessage } from 'http'

import { Settings } from '../@types/settings'

export const getRemoteAddress = (request: IncomingMessage, settings: Settings): string => {
  const header = settings.network.remoteIpHeader

  const result = (request.headers[header] ?? request.socket.remoteAddress) as string

  return result.split(',')[0]
}
