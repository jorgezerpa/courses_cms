import passport from 'passport';
import localStrategy from './strategies/local.strategy'
import JwtStrategy from './strategies/jwt.strategy'

function authInit(){
    passport.use(localStrategy);
    passport.use(JwtStrategy)
}

export default authInit
