class server {
    /*
    method /URL HTTP/1.1 \r\n\r\n Body
    */
    GenerateRequest(requestHTTP) {
        let requestSplit = requestHTTP.split('\r\n\r\n');
        let header = requestSplit[0];
        let body = requestSplit[1];
        HeaderSplit = header.split(' ');
        let method = HeaderSplit[0];
        switch (method) {
            case 'GET':
                let Url = HeaderSplit[1];
                /**
                 * /getUser/key.json
                 */

                if (Url.startsWith('/getUser/')) {
                    urlSplit = Url.split('/');
                    return this.GET(urlSplit[2]);

                }
                else {
                    return this.GetAllUser();
                }

            case 'POST':
                return this.POST(body);
            case 'PUT':
                return this.PUT(body);
            case 'DELETE':
                let Url1 = HeaderSplit[1];
                urlSplit = Url1.split('/');
                return this.DELETE(urlSplit[2]);
            default:
                return "Http1.1 404 Not Found\r\n\r\n";

        }



    }

    POST(userJson) {
        let curentItem = JSON.parse(userJson);

        succ = db.AddUser(curentItem.email, userJson)
        if (succ)
            return "Http1.1 200 OK\r\n\r\n";
        return "Http1.1 406 Not Acceptable\r\n\r\n";
    }
    GET(key) {
        let response = db.getUser(key);
        if (response) {
            let responseHttp = "Http/1.1 200 OK\r\n\r\n" + JSON.stringify(response);
            return responseHttp;
        }
        else
            return "Http1.1 404 Not Found\r\n\r\n"

    }
    DELETE(key) {
        let succ = db.deleteUser(key);
        if (succ) {
            return "Http1.1 200 OK\r\n\r\n";
        }
        else
            return "Http1.1 406 Not Acceptable\r\n\r\n";

    }
    PUT(userJson) {

        let curentItem = JSON.parse(userJson);
        let response = db.updateUser(curentItem.email, userJson);
        if (response)
            return "Http1.1 200 OK\r\n\r\n";
        return "Http1.1 406 Not Acceptable\r\n\r\n";



    }

    /**
     * 
     * Http1.1 200 OK\r\n\r\n body.json
    
     */
    GetAllUser() {

        let response = db.GetAllUser();
        if (response) {
            let responseHttp = "Http/1.1 200 OK\r\n\r\n" + JSON.stringify(response);
            return responseHttp;
        }
        else
            return "Http1.1 404 Not Found\r\n\r\n"
    }




}
