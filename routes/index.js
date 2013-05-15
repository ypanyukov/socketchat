var cookieName = 'GCT_Nickname';

exports.index = function(req, res){
    
    var login = (req.body.login || req.cookies[cookieName.toLowerCase()]) ? (req.body.login ? req.body.login : req.cookies[cookieName.toLowerCase()]) : false;
    
    if (login){
        if (login.length > 0){
            res.cookie(cookieName, login, {
                expires: new Date(Date.now() + 900000),
                httpOnly: true
            });
        }        
    }
    
    if (login)
        res.render('index', { title: 'Express', name: login })
    else
        res.render('login', { title: 'Express'});  
};