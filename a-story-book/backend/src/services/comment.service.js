import Comment from "../models/comment.model.js"

export const getAllCommentsService = async () => {
    return await Comment.find();
}

export const getCommentByIdService = async (id) => {
    const comment = await Comment.findById(id);
    if (!comment) throw new Error("Comment not found");
    return comment;
}

export const createCommentService = async (data) => {
    const comment = await Comment.create(data);
    return comment;
}

export const updateCommentService = async (id, data) => {
    const comment = await Comment.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
    if (!comment) throw new Error("Comment not found");
    return comment;
}

export const deleteCommentService = async (id) => {
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) throw new Error("Comment not found");
    return comment;
}

