import * as config from 'config';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'

export class Passport {
    getStrategy() {
        let options: StrategyOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
            secretOrKey: config.get('SECRET')
        }
        return new Strategy(options, (jwt_payload, done) => {
            return done(null, jwt_payload);
        });
    }
}