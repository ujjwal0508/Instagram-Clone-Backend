const Comment = require('../models/Comment')

exports.create = (req, res) => {

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Customer
    const comment = new Comment({
        data: req.body.data,
        comment_id: req.body.comment_id,
        post_id: req.body.post_id,
        user_id: req.body.user_id
    });

    // Save Customer in the database
    Comment.create(comment, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Comment."
            });
        else res.status(200).send(data);
    });
};

exports.getAll = (req, res) => {
    Comment.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Comments."
            });
        else res.status(200).send(data);
    });
};

exports.getById = (req, res) => {
    Comment.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Comment with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Comment with id " + req.params.id
                });
            }
        } else res.status(200).send(data);
    });
};

exports.getByPostId = (req, res) => {

    Comment.getCommentsByPostId(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Comment with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Comment with id " + req.params.id
                });
            }
        } else res.status(200).send(data);
    });
}

