const db = require('./db')
const { v4: uuidv4 } = require('uuid');

const Comment = function (comment) {
    this.id = uuidv4();
    this.data = comment.data;
    this.date = new Date();
    this.user_id = comment.user_id;
    this.post_id = comment.post_id;
}

Comment.create = (comment, result) => {

    console.log('creating comment');
    // console.log(user);
    db.query("INSERT INTO comment SET ?", comment, (err, res) => {
        if (err) {
            console.log('there is an error')
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created comment: ", { id: res.id, ...comment });
        result(null, { id: res.id, ...comment });
    });
}

Comment.findById = (id, result) => {
    db.query(`SELECT * FROM comment WHERE id = "${id}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found comment: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Comment.getAll = result => {
    db.query("SELECT * FROM comment", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("comment: ", res);
        result(null, res);
    });
};

Comment.getCommentsByPostId = (post_id, result) => {
    db.query(`SELECT * FROM comment WHERE post_id = "${post_id}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found comment: ", res);
            result(null, res);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
}

module.exports = Comment;