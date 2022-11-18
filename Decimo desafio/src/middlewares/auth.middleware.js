const authSession = (req, res, next) => {
    if (!req.session?.user) {
        return res.status(401).render('pages/index');   
    } 
    next();
}

export default authSession