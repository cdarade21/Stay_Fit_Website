//connection class

class Connection {
  constructor(cid, name, topic, details, date, host, time, venue){
    this.cid=cid;
    this.name=name;
    this.topic=topic;
    this.details=details;
    this.date=date;
    this.host=host;
    this.time=time;
    this.venue=venue;
  }

    // return connection details
  getConnDetails(){
    return {
      cid: this.cid,
      name: this.name,
      topic: this.topic,
      details:this.details,
      date: this.date,
      host:this.host,
      time: this.time,
      venue:this.venue
    }
  };

  getCid(){
    return this.cid;
  }

  setCid(cid){
    this.cid=cid;
  }

  getName(){
    return this.name;
  }

  setName(connName){
    this.name=name;
  }

  getTopic(){
    return this.topic;
  }

  setTopic(topic){
    this.topic=topic;
  }

  getDetails(){
    return this.details;
  }

  setDetails(details){
    this.details=details;
  }

  getDate(){
    return this.date;
  }

  setDate(date){
    this.date=date;
  }

  getHost(){
    return this.host;
  }

  setHost(host){
    this.host=host;
  }

  getTime(){
    return this.time;
  }

  setTime(time){
    this.time=time;
  }

  getVenue(){
    return this.venue;
  }

  setVenue(venue){
    this.venue=venue;
  }

}

// export Connection
module.exports = Connection;
