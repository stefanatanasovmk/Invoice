const isAuthenticated = (req, res, next) => {
     if (req.isAuthenticated()) {
          next()
     }
     else {
          throw Error()
     }
}
module.exports = isAuthenticated