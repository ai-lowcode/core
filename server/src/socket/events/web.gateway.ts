import type { JwtService } from '@nestjs/jwt'
import type {
  GatewayMetadata,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets'
import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'

import type { Server } from 'socket.io'

import type { TokenService } from '../../modules/auth/services/token.service'
import type { CacheService } from '../../shared/redis/cache.service'

import { createAuthGateway } from '../shared/auth.gateway'

const AuthGateway = createAuthGateway({ namespace: 'web' })
@WebSocketGateway<GatewayMetadata>({ namespace: 'web' })
export class WebEventsGateway
  extends AuthGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    protected readonly jwtService: JwtService,
    protected readonly tokenService: TokenService,
    private readonly cacheService: CacheService,
  ) {
    super(jwtService, tokenService, cacheService)
  }

  @WebSocketServer()
  protected _server: Server

  get server() {
    return this._server
  }
}
