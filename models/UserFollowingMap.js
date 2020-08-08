const db = require('./db')

const UserFollowingMap = function (userFollowingMap) {
    this.user_id = userFollowingMap.user_id;
    this.following_id = userFollowingMap.following_id;
}

UserFollowingMap.create = async (userFollowingMap, result) => {

    db.query("INSERT INTO user_following SET ?", userFollowingMap, (err, res) => {
        if (err) {
            console.log('there is an error')
            console.log("error: ", err);

            return err;
        }

        console.log("created userFollowingMap: ", { id: res.user_id, ...userFollowingMap });
        return { id: res.user_id, ...user };
    });
}

UserFollowingMap.findByUserId = async (user_id, result) => {
    db.query(`SELECT * FROM user_following WHERE id = "${user_id}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user Followings: ", res);
            result(null, res);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

UserFollowingMap.findByUserFollowingId = async (userId, followingId, result) => {
    db.query(`SELECT * FROM user_following WHERE user_id = "${userId}" AND following_id = "${followingId}"`, (err, res) => {
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

module.exports = UserFollowingMap;