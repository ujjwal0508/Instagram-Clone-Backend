const db = require('./db')

const UserFollowerMap = function (userFollowerMap) {
    this.user_id = userFollowerMap.user_id;
    this.follower_id = userFollowerMap.follower_id;
    this.is_pending = userFollowerMap.is_pending;
}

UserFollowerMap.addPendingRequest = async (userFollowerMap, result) => {
    db.query("INSERT INTO user_follower SET ?", userFollowerMap, (err, res) => {
        if (err) {
            console.log('there is an error')
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created userFollowerMap: ", { id: res.user_id, ...userFollowerMap });
        result(null, { id: res.user_id, ...userFollowerMap });
    });
}

UserFollowerMap.findByUserId = async (user_id, result) => {
    db.query(`SELECT * FROM user_follower WHERE id = "${user_id}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user followers: ", res);
            result(null, res);
            return;
        }

        // not found Customer with the id
        result({ kind: "not_found" }, null);
    });
};

UserFollowerMap.findByUserFollowerId = async (userId, followerId, result) => {
    db.query(`SELECT * FROM user_follower WHERE user_id = "${userId}" AND follower_id = "${followerId}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            // result(err, null);
            return err;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            // result(null, res[0]);
            return res[0];
        }

        // not found Customer with the id
        return { kind: "not_found" };
    });
};

UserFollowerMap.acceptRequest = async (user_id, follower_id, result) => {
    db.query(`UPDATE user_follower 
            SET is_pending = 0 
            WHERE user_id = "${user_id}" AND follower_id = "${follower_id}"`, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(err, null);
            return err;
        }

    })
}

module.exports = UserFollowerMap;