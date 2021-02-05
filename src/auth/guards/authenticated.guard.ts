import {
  ExecutionContext,
  Injectable,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const isAuthenticated = req.isAuthenticated();

    if (!isAuthenticated) throw new UnauthorizedException();

    return isAuthenticated;
  }
}
