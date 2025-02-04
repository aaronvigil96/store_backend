import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRole } from '../enum/user-role.enum';
import { META_ROLES } from '../decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(private readonly reflector: Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles:UserRole[] = this.reflector.get<UserRole[]>(META_ROLES, context.getHandler());

    if(!validRoles) return true;
    if(validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if(!user) throw new BadRequestException('User not found');

    if(validRoles.includes(user.role)){
      return true;
    }

    throw new ForbiddenException(`${user.email} need a valid role ${validRoles}`);
  }
}
