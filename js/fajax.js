class FXMLHttpRequest {
    constructor() {
        this.responseText = '';
        this.status = '';
        this.method = '';
        this.url = '';
        this.network = new network();
        this.callBack = '';
    }

    Open(method, url) {

        this.method = method;
        this.url = url;

    }
    /*method /URL HTTP/1.1 \r\n\r\nBody*/
    send(body = '') {
        let request = this.method + ' /' + this.url + '\r\n\r\n' + body;
        setTimeout(sendToNetwork(request),0);
        let response = this.network.send(request);
        return response;


    }
    OnLoad(callBack) {
        this.callBack = callBack;
    }
    /**
     * 
     * Http1.1 200 OK\r\n\r\n body.json
    
     */
    sendToNetwork(re){
        let response = this.network.send(re);
        let requestSplit = requestHTTP.split('\r\n\r\n');
        let header = requestSplit[0];
        let body = requestSplit[1];
        HeaderSplit = header.split(' ');
        this.status = HeaderSplit[1];
        this.responseText=body;
        this.callBack();
    }
}