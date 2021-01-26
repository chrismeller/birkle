import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

@Injectable()
export class Hasher {
    public static hash (value: string, salt: string) {
        // just for paranoia - make sure the salt you provided is long enough - NIST recommends >= 16 bytes
        if (Buffer.from(salt).length < 16) {
            throw new Error('Salt length should be at least 16 bytes!');
        }
        
        const hashBuffer = crypto.pbkdf2Sync(value, salt, 100000, 64, 'sha512');
        return hashBuffer.toString('hex');
    }
}
