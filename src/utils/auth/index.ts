import passport from 'passport';
import localStrategy from './strategies/local.strategy'
import JwtStrategy from './strategies/jwt.strategy'
import httpHeaderStrategy from './strategies/http-header.strategy'

function authInit(){
    passport.use(localStrategy);
    passport.use(JwtStrategy);
    passport.use(httpHeaderStrategy);
}

export default authInit
