const getLogin = (req, res) => {
    const username = req.session.user
    res.render('pages/login', { username: username })
}

const getLogout = (req, res) => {
    let username = req.session.user
    req.session.destroy(err => {
        if (err) return res.send(err)

        res.render('pages/logout', { username: username })
    })
}

const postLogin = (req, res) => {
    const { username } = req.body
    req.session.user = username
   
    res.redirect('/session/login')
}

export default { getLogin, getLogout, postLogin }
