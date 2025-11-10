import { AuthGuard } from '@nestjs/passport';

export class GuardGoogleOauth extends AuthGuard('google') {}
