// userProfile Class

let userConn = require("./../models/userConnection");
let user = require("./../models/user");
let ConnDB=require("./connDB.js")

class userProfile {
    conn_list = [];
    constructor(userId) {
      this.userId = userId;
    }
    
    // add connection in a userProfile list
    addConnection(user, userconn, userrsvp){
      var p=this.inList(user,userconn);

      // if connection is not found in existing list, then push connection in that list
		  if(  p===-1){
        user.conn_list.push(new userConn(userconn,userrsvp))
		  return 1;}
		  else{
         // if connection is found in existing list, then update connection in that list
			   user.conn_list[p].userRsvp=userrsvp;
		  }
    }
    
    // function to check whether connection is present in connection list
    inList(user,userconn){
      for (let j=0;j<user.conn_list.length;j++) {
        if( user.conn_list[j].userConn === userconn){
          return j;
        } 
    }
    return -1;
    }
    
    // Remove connection to be removed as per user requested
    deleteConnection(user,userconn){
      var index=this.inList(user,userconn);
      let connDB = new ConnDB();
      var connDBlist = connDB.getConnections();
      if (index!= -1) {
        user.conn_list.splice(index, 1);
      }
    }
}

// export userProfile
module.exports = userProfile;