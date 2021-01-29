import { Injectable } from '@nestjs/common';
import { DbService } from '../database/db.service';
import { Token } from './interfaces/token.interface';

@Injectable()
export class TokenService {
  constructor(private readonly db: DbService) {}

  async validate(token: string): Promise<boolean> {
    const existing = await this.db.token.findUnique({
        where: {
            Token: token,
        }
    });

    // we are the final source of truth - if the token doesn't exist at all, it's clearly not valid
    if (existing === null) {
      return false;
    }

    // if the token has been revoked we don't even care when that was, it's not valid
    if (existing.RevokedAt !== null) {
      return false;
    }

    // otherwise, time for math
    const now = new Date();
    if (new Date(existing.ExpiresAt) < now) {
      return false;
    }

    // and finally, apparently we're good
    return true;
  }

  async create(token: Token) {
    // first, we simply insert the token
    await this.db.token.create({
        data: {
            Token: token.token,
            CreatedAt: token.createdAt,
            UserId: token.userId,
            ExpiresAt: token.expiresAt,
            Type: token.type,
        }
    });

    // take the opportunity to clean up any expired tokens for this user while we're at it
    const expiredTokens = await this.db.token.findMany({
        where: {
            AND: [
                {
                    UserId: token.userId,
                },
                {
                    ExpiresAt: {
                        lte: new Date(),
                    }
                }
            ]
        },
        select: {
            Token: true,
        }
    });

    expiredTokens.forEach(async x => {
        await this.db.token.delete({
            where: {
                Token: x.Token,
            }
        });
    });
  }

  async revoke(token: string) {
    await this.db.token.update({
        data: {
            RevokedAt: new Date(),
        },
        where: {
            Token: token,
        }
    });
  }
}