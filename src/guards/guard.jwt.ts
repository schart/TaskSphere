import { JwtService } from '@nestjs/jwt';
import { ServiceAuth } from 'src/services';
import { AuthGuard } from '@nestjs/passport';
import { RepositoryUser } from 'src/repository';
import { InterfaceUserId } from 'src/structures';
import { Injectable, ExecutionContext } from '@nestjs/common';

@Injectable()
export class GuardJwtAuth extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(' ')[1];
    if (!token) return false;

    const isRevoked = await this.authService.checkRevokedToken(token);
    if (isRevoked) return false;

    return super.canActivate(context) as boolean;
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
    const token = request.headers.authorization?.split(' ')[1];

    return !token;
  }
}

@Injectable()
export class GuardShouldBeOwnerOfReq {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(' ')[1];
    const decodedToken: string = this.jwtService.decode(token);

    const email = decodedToken['email'];
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return false;
    }

    const { _id: userId }: InterfaceUserId = {
      _id: String(user.dataValues._id),
    };
    request.ownerId = userId;
    return true;
  }

  constructor(
    private readonly userRepository: RepositoryUser,
    private readonly jwtService: JwtService,
  ) {}
}
