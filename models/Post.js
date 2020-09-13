const db = require('./db')
const { v4: uuidv4 } = require('uuid');
const util = require('util');
const query = util.promisify(db.query).bind(db);

const Post = function (post) {
    this.id = uuidv4();
    this.date = new Date();
    this.description = post.description;
    this.user_id = post.user_id;
    this.is_image = post.is_image;
    this.image_url = post.image_url;
    this.video_url = post.video_url;
}

Post.create = (post, result) => {

    console.log('creating Post');
    // console.log(user);
    db.query("INSERT INTO post SET ?", post, (err, res) => {
        if (err) {
            console.log('there is an error')
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Post: ", { id: res.id, ...post });
        result(null, { id: res.id, ...post });
    });
}

Post.findById = (id, result) => {
    db.query(`SELECT * FROM post WHERE id = "${id}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Post: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

Post.getAll = result => {
    db.query("SELECT * FROM post", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Post: ", res);
        result(null, res);
    });
};

Post.findByUserId = async (user_id) => {

    try {
        let posts = await query(`SELECT * FROM post WHERE user_id = "${user_id}"`);
        return posts;

    } catch (error) {
        return new Error(error);
    }
}

module.exports = Post;