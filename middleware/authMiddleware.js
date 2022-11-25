//integrating protected routes with auth middleware 
// authenticated users cant view back login page.
const authMiddleware = {
    ensureAuth: (req, res, next) => {
        if(req.isAuthenticated()){
            return next()
        }else{
            res.redirect('/api/v1/')
        }
    },
    ensureGuest: (req, res, next) => {
        if(req.isAuthenticated()){
            res.redirect('/api/v1/dashboard/')
        }else{
            return next()
        }
    }
}

module.exports = authMiddleware