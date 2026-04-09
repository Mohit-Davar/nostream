import { IncomingMessage } from 'http'

import { Settings } from '../@types/settings'

export const getRemoteAddress = (request: IncomingMessage, settings: Settings): string => {
  if ('remote_ip_header' in settings.network) {
    throw new Error(
      'Setting network.remote_ip_header is no longer supported. Use network.remoteIpHeader instead.',
    )
  }

  const header = settings.network.remoteIpHeader

  const result = (request.headers[header] ?? request.socket.remoteAddress) as string

  return result.split(',')[0]
}
