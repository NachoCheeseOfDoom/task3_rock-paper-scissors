import crypto from 'crypto';

export class KeyGenerator {
    static generateKey(lengthInBits) {
        return crypto.randomBytes(lengthInBits / 8).toString('hex');
    }
}
