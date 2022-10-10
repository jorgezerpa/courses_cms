import passport from 'passport';
import localStrategy from './strategies/local.strategy'

function authInit(){
    passport.use(localStrategy);
}

export default authInit
