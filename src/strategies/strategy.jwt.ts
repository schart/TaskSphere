import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/services';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { UserRepository } from 'src/repository';
import { Observable } from 'rxjs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'super-secret-key',
    });
  }

  validate(payload: any): unknown {
    return { userId: payload.sub, email: payload.email };
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(' ')[1];
    if (!token) return false;

    const isRevoked = await this.authService.checkRevokedToken(token);
    if (isRevoked) return false;

    return super.canActivate(context) as boolean;
  }

  constructor(private readonly authService: AuthService) {
    super();
  }
}

@Injectable()
export class ShouldBeOwnerOfReqGuard {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(' ')[1];
    const decodedToken: string = this.jwtService.decode(token);

    const email = decodedToken['email'];
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return false;
    }

    const userId: number | undefined = user.dataValues._id;
    request.ownerId = userId;
    return true;
  }

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
}

@Injectable()
export class NoJwtTokenAuthGuard {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    return !token;
  }
}
