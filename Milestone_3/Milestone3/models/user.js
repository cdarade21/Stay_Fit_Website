// User class

class user {
  constructor(userId, userfName, userlName, userCat, userTopic, userLoc){
    this.userId=userId;
    this.userfName=userfName;
    this.userlName=userlName;
    this.userCat=userCat;
    this.userTopic=userTopic;
    this.userLoc=userLoc;
  }
}

// export user
module.exports = user;
