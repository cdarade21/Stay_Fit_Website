class Connection {
  constructor(connId, connName, connTopic, details, host, date, time){
    this.connId=connId;
    this.connName=connName;
    this.connTopic=connTopic;
    this.details=details;
    this.host=host;
    this.date=date;
    this.time=time;
  }

  getconnId(){
    return this.connId;
  }

  setconnId(connId){
    this.connId=connId;
  }

  getconnName(){
    return this.connName;
  }

  setconnName(connName){
    this.connName=connName;
  }

  getconnTopic(){
    return this.connTopic;
  }

  setconnTopic(connTopic){
    this.connTopic=connTopic;
  }

  getdetails(){
    return this.details;
  }

  setdetails(details){
    this.details=details;
  }

  gethost(){
    return this.host;
  }

  sethost(host){
    this.host=host;
  }

  getdate(){
    return this.date;
  }

  setdate(date){
    this.date=date;
  }

  gettime(){
    return this.time;
  }

  settime(time){
    this.time=time;
  }

  getConnDetails(){
    return{
      connId: this.connId,
      connName: this.connName,
      connTopic: this.connTopic,
      details:this.details,
      host:this.host,
      date: this.date,
      time: this.time
    };
  }
}

module.exports = Connection;
