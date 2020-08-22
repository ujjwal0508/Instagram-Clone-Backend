const User = require('../models/User');
const UserFollowingMap = require('../models/UserFollowingMap');
const { response } = require('express');
const UserFollowerMap = require('../models/UserFollowerMap');
const Post = require('../models/Post');

exports.create = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Customer
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        is_verified: req.body.is_verified,
        bio: req.body.bio,
        handle: req.body.handle,
        image_url: req.body.image_url
    });

    // Save Customer in the database
    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else res.status(200).send(data);
    });
};

exports.getAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.status(200).send(data);
    });
};

exports.getById = (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.id
                });
            }
        } else res.status(200).send(data);
    });
};

exports.getByHandle = (req, res) => {
    User.findByHandle(req.params.handle, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.handle}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.handle
                });
            }
        } else res.status(200).send(data);
    });
};

exports.requestFollow = async (req, res) => {

    try {
        let userFollower = new UserFollowerMap({
            user_id: req.body.user_id,
            follower_id: req.body.follower_id,
            is_pending: true
        });

        await UserFollowerMap.addPendingRequest(userFollower);
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.acceptFollow = async (req, res) => {

    try {
        let userFollower = await UserFollowerMap.findByUserFollowerId(req.body.user_id, req.body.follower_id);
        await UserFollowerMap.acceptRequest(req.body.user_id, req.body.follower_id);

        let userFollowing = new UserFollowingMap({
            user_id: req.body.follower_id,
            following_id: req.body.user_id
        })
        await UserFollowingMap.create(userFollowing);

        res.status(200).send();

    } catch (error) {
        res.status(500).send({
            message: "Request not found"
        });
    }
}

exports.getUserFeed = async (req, res) => {

    try {

        let userId = req.body.user_id;
        let userFollowingList = await UserFollowingMap.findByUserId(userId);
        let posts = [];

        for (userFollowing of userFollowingList) {

            let followingPosts = await Post.getById(userFollowing);
            posts.push.apply(posts, followingPosts);
        }

        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send(error.message);
    }
}