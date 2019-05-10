/* eslint no-restricted-globals: 0*/
import auth0 from "auth0-js";
import jwtDecode from "jwt-decode";
const LOGIN_SUCESS_PAGE = "/dashboard";
const LOGIN_FALURE_PAGE = "/"

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: 'leaveby.auth0.com',
        clientID: 'FTOGuoDJ8RDXzi4nkOxdHPUXU1L1UGWn',
        redirectUri: 'http://localhost:3000/callback',
        // audience: "http://leaveby.auth0.com/userinfo",
        responseType: 'token id_token',
        scope: 'openid profile email'
    });
    constructor() {
        this.login = this.login.bind(this);
    }
    login() {
        this.auth0.authorize();
    }
    handleAuthentication() {
        this.auth0.parseHash((err, authResults) => {
            if (authResults && authResults.accessToken && authResults.idToken) {
                let expiresAt = JSON.stringify((authResults.expiresIn) * 1000 + new Date().getTime());
                localStorage.setItem("access_token", authResults.accessToken);
                localStorage.setItem("id_token", authResults.idToken);
                localStorage.setItem("expires_at", expiresAt);
                location.hash = "";
                let userData = this.getProfile();
                let transferData = {
                    name: userData.given_name,
                    last_name: userData.family_name,
                    email: userData.email,
                    auth0_id: userData.sub,
                }
                fetch('/users', {
                    method: 'post',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                    }),
                    body: JSON.stringify(transferData)
                })
                    .then(() => {
                        location.pathname = LOGIN_SUCESS_PAGE;
                    })

            } else if (err) {
                location.hash = "";
                this.logout();
                console.log(err);
            } else {
                console.log('No authResults, no Error');
                location.pathname = LOGIN_SUCESS_PAGE;
            }
        });
    }
    isAuthenticated() {
        let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
        return new Date().getTime() < expiresAt;
    }
    logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        location.pathname = LOGIN_FALURE_PAGE;

    }
    getProfile() {
        if (localStorage.getItem("id_token")) {
            return jwtDecode(localStorage.getItem("id_token"));
        } else {
            return {};
        }
    }
}