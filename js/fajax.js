class FXMLHttpRequest {
    constructor() {
        this.responseText = '';
        this.status = '';
        this.method = '';
        this.url = '';
        this.network = new Network();
        this.callBack = '';
    }

    Open(method, url) {

        this.method = method;
        this.url = url;

    }
    /**
   * 
   * Http1.1 200 OK\r\n\r\n body.json
  
   */
    sendToNetwork(re) {
        let responseHttp = this.network.send(re);
        let responseSplit = responseHttp.split('\r\n\r\n');
        let header = responseSplit[0];
        let body = responseSplit[1];
        let HeaderSplit = header.split(' ');
        this.status = HeaderSplit[1];
        this.responseText = body;
        this.callBack();
    }
    /*method /URL HTTP/1.1 \r\n\r\nBody*/
    send(body = '') {
        let request = this.method + ' /' + this.url + '\r\n\r\n' + body;
        setTimeout(this.sendToNetwork(request), 0);
        let response = this.network.send(request);
        return response;


    }
    OnLoad(callBack) {
        this.callBack = callBack;
    }

}