// userProfile Class

let userConn = require("../models/userConnection");
let user = require("../models/user");

class UserProfile {
    conn_list = [];
    constructor(uid) {
      this.uid = uid;
    }
    
    // add connection in a userProfile list
    addConnection(user, cid, des){
      var p=this.inList(user,cid);

      // if connection is not found in existing list, then push connection in that list
      if(  p===-1)
      {
        user.conn_list.push(new userConn(cid,des))
        return 1;
      }
		  else{
         // if connection is found in existing list, then update connection in that list
			   user.conn_list[p].rsvp=des;
		  }
    }
    
    // function to check whether connection is present in connection list
    inList(user,cid){
      for (let j=0;j<user.conn_list.length;j++) {
        if( user.conn_list[j].connection === cid){
          return j;
        } 
    }
    return -1;
    }
    
    // Remove connection to be removed as per user requested
    deleteConnection(user,cid){
      var index=this.inList(user,cid);
      if (index!= -1) {
        user.conn_list.splice(index, 1);
        return 1;
      }
      else{
        return -1;
      }
    }
}

// export userProfile
module.exports = UserProfile;