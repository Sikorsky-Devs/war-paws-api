import { AccountType } from '@prisma/client';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  Type,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../database/prisma.service';
import { Request } from 'express';
import { UnauthorizedException } from '../../../utils/exception/unauthorized.exception';
import { ForbiddenException } from '../../../utils/exception/forbidden.exception';

export function AuthGuard(accountType?: AccountType): Type<CanActivate> {
  @Injectable()
  class AuthGuardMixin implements CanActivate {
    constructor(
      private readonly jwtService: JwtService,
      private readonly prisma: PrismaService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
      const token = this.getTokenFromHeader(request);

      if (!token) {
        throw new UnauthorizedException();
      }

      let payload: { sub: string };

      try {
        payload = await this.jwtService.verifyAsync(token);
      } catch {
        throw new UnauthorizedException();
      }

      const user = await this.prisma.user.findFirst({
        where: { id: payload.sub },
        select: {
          id: true,
          email: true,
          firstName: true,
          middleName: true,
          lastName: true,
          name: true,
          accountType: true,
          avatarLink: true,
        },
      });
      if (!user) {
        throw new UnauthorizedException();
      }

      if (accountType && accountType !== user.accountType) {
        throw new ForbiddenException();
      }

      request['user'] = user;

      return true;
    }

    private getTokenFromHeader(req: Request): string | undefined {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.split(' ')[1];
      }
    }
  }
  return mixin(AuthGuardMixin);
}
