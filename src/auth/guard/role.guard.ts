import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../role.enum';
import { ROLES_KEY } from '../decorator';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    // Get the roles from the handler
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!roles) return true;

    // Check the user role
    const request = context.switchToHttp().getRequest();
    const firebaseUser = request.user;
    const matchRole = roles.some((role) => firebaseUser.role[role]);

    if (matchRole) {
      const user = await this.prisma.user.findFirst({
        where: { firebase_uid: firebaseUser.uid },
      });
      context.switchToHttp().getRequest().user = user;
    }
    return matchRole;
  }
}
