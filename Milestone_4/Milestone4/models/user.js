// User class

class User {
  constructor(uid,psw,fname,lname,email,addr_line1,city,state,zipcode,country) {
    this.uid = uid;
	  this.psw=psw;
    this.fname = fname;
    this.lname = lname;
    this.email = email;
	  this.addr_line1=addr_line1;
	  this.city=city;
	  this.state=state;
	  this.zipcode=zipcode;
	  this.country=country;
  }
}

// export user
module.exports = User;
