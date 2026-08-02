import {
    getAllCommentsService,
    getCommentByIdService,
    createCommentService,
    updateCommentService,
    deleteCommentService,
} from "../services/comment.service.js";

export const getAllComments = async (req, res) => {
    try {
        const comments = await getAllCommentsService();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCommentById = async (req, res) => {
    try {
        const comment = await getCommentByIdService(req.params.id);
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createComment = async (req, res) => {
    try {
        const comment = await createCommentService(req.body);
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateComment = async (req, res) => {
    try {
        const comment = await updateCommentService(req.params.id, req.body);
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const comment = await deleteCommentService(req.params.id);
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};