class Network{
    constructor(){
        this.server= new server();
    }

     send(requestHTTP){
        return this.server.GenerateRequest(requestHTTP);

     }

}