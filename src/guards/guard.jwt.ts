import { JwtService } from '@nestjs/jwt';
import { ServiceAuth } from 'src/services';
import { AuthGuard } from '@nestjs/passport';
import { RepositoryUser } from 'src/repository';
import { InterfaceUserEmail, InterfaceUserId } from 'src/structures';
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class GuardJwtAuth extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    const token = request.cookies['access_token'];
    if (!token) return false;

    const isRevoked = await this.authService.checkRevokedToken(token);
    if (isRevoked) return false;

    const user = this.jwtService.decode(token);
    request.user = user;
    return true;
  }

  constructor(
    private readonly authService: ServiceAuth,
    private readonly jwtService: JwtService,
  ) {
    super();
  }
}

@Injectable()
export class GuardNoJwtTokenAuth {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['access_token'];

    return !token;
  }
}

@Injectable()
export class GuardShouldBeOwnerOfReq {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['access_token'];

    let decodedToken: object;
    try {
      decodedToken = this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    const email: InterfaceUserEmail = { email: decodedToken['email'] };
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return false;
    }

    const { _id: userId }: InterfaceUserId = {
      _id: String(user.id),
    };

    request.ownerId = userId;
    return true;
  }

  constructor(
    private readonly userRepository: RepositoryUser,
    private readonly jwtService: JwtService,
  ) {}
}
