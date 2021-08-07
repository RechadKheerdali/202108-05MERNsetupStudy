# 202108-05MERNsetupStudy
study sesh, includes authentication CSR and etc...

- The master branch is the basic MERN setup for most things. However there is lots to be done such as dotenv / error handling / etc. Plus possible updates might be required
- The other branches are me practicing other things such as '02codeNinjaJWT' is me doing authentication which was cool using JsonWebToken for jwt token in CSR format. Would need a clientside to complete the full stack
- Ideally you want to set up the in a proper MVC directory, look into your guide for that

# 02codeNinjaJWT branch
Decent authentication done, and use of jwt token and hashing
Not complete, the big one is no logout logic

# 03stephenCsrUsingPassportJwtNlocal
Authentication app too, with the use of passport-jwt and passport-local. 
- which will authenticate jwt for all protected routes
- will also authenticate username/email and password for /login route and return jwt token
However there are still things left to do such as comparing password and logout logic
