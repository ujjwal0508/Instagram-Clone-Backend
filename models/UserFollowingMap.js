const db = require('./db')
const util = require('util');
const { throws } = require('assert');
const query = util.promisify(db.query).bind(db);
const { v4: uuidv4 } = require('uuid');

const UserFollowingMap = function (userFollowingMap) {
    this.id = uuidv4();
    this.user_id = userFollowingMap.user_id;
    this.following_id = userFollowingMap.following_id;
}

UserFollowingMap.create = async (userFollowingMap) => {

    try {
        await query("INSERT INTO user_following SET ?", userFollowingMap);

    } catch (error) {
        console.log(error);
    }
}

UserFollowingMap.findByUserId = async (user_id) => {

    try {
        let dbResult = await query(`SELECT * FROM user_following WHERE user_id = "${user_id}"`);

        let followings = [];
        for (let data of dbResult) {
            followings.push(data.following_id);
        }

        return followings;

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

UserFollowingMap.findByUserFollowingId = async (userId, followingId) => {

    try {
        let user = await query(`SELECT * FROM user_following WHERE user_id = "${userId}" AND following_id = "${followingId}"`);
        return user;
    } catch (error) {
        console.log(error);
    }
};

module.exports = UserFollowingMap;