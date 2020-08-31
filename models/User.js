const db = require('./db')
const { v4: uuidv4 } = require('uuid');

const User = function (user) {
  this.id = uuidv4();
  this.name = user.name;
  this.email = user.email;
  this.phone_number = user.phone_number;
  this.is_verified = user.is_verified;
  this.bio = user.bio;
  this.handle = user.handle;
  this.image_url = user.image_url;
}

User.create = (user, result) => {

  console.log('creating user');
  // console.log(user);
  db.query("INSERT INTO user SET ?", user, (err, res) => {
    if (err) {
      console.log('there is an error')
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created user: ", { id: res.id, ...user });
    result(null, { id: res.id, ...user });
  });
}

User.findById = (id, result) => {
  db.query(`SELECT * FROM user WHERE id = "${id}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = result => {
  db.query("SELECT * FROM user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("user: ", res);
    result(null, res);
  });
};

User.findByHandle = (handle, result) => {
  db.query(`SELECT * FROM user WHERE handle = "${handle}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = User;