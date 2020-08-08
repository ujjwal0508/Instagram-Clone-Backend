const Post = require('../models/Post')

exports.create = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(Post);
    // Create a Customer
    const post = new Post({
        description: req.body.description,
        user_id: req.body.user_id,
        is_image: req.body.is_image,
        image_url: req.body.image_url,
        video_url: req.body.video_url
    });
    console.log('came here 2');

    // Save Customer in the database
    Post.create(post, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Post."
            });
        else res.status(200).send(data);
    });
};

exports.getAll = (req, res) => {
    Post.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Posts."
            });
        else res.status(200).send(data);
    });
};

exports.getById = (req, res) => {
    Post.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Post with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Post with id " + req.params.id
                });
            }
        } else res.status(200).send(data);
    });
};

