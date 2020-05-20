//connection class

class Connection {
  constructor(cid, name, topic, details, date, host, start_time, end_time, where){
    this.cid=cid;
    this.name=name;
    this.topic=topic;
    this.details=details;
    this.date=date;
    this.host=host;
    this.start_time=start_time;
    this.end_time=end_time;
    this.where=where;
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
      start_time: this.start_time,
      end_time: this.end_time,
      where:this.where
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

  getStartTime(){
    return this.start_time;
  }

  setStartTime(start_time){
    this.start_time=start_time;
  }

  getEndTime(){
    return this.end_time;
  }

  setEndTime(end_time){
    this.end_time=end_time;
  }

  getVenue(){
    return this.venue;
  }

  setVenue(where){
    this.where=where;
  }

}

// export Connection
module.exports = Connection;
