const db = require('./db')
const { v4: uuidv4 } = require('uuid');
const util = require('util');
const query = util.promisify(db.query).bind(db);

const UserFollowerMap = function (userFollowerMap) {
    this.id = uuidv4();
    this.user_id = userFollowerMap.user_id;
    this.follower_id = userFollowerMap.follower_id;
    this.is_pending = userFollowerMap.is_pending;
}

UserFollowerMap.addPendingRequest = async (userFollowerMap) => {

    try {
        await query("INSERT INTO user_follower SET ?", userFollowerMap);

    } catch (error) {
        console.log(error);
    }
}

UserFollowerMap.findByUserId = async (user_id) => {

    try {
        let user = await query(`SELECT * FROM user_follower WHERE id = "${user_id}`);
        return user;
    } catch (error) {
        console.log(error);
    }
};

UserFollowerMap.findByUserFollowerId = async (userId, followerId) => {

    try {
        let user = await query(`SELECT * FROM user_follower WHERE user_id = "${userId}" AND follower_id = "${followerId}"`);
        return user;
    } catch (error) {
        console.log(error);
    }
};

UserFollowerMap.acceptRequest = async (user_id, follower_id) => {

    try {
        let user = await query(`UPDATE user_follower 
        SET is_pending = 0 
        WHERE user_id = "${user_id}" AND follower_id = "${follower_id}"`);
        return user;
    } catch (error) {
        console.log(error);
    }
}

module.exports = UserFollowerMap;