// FILE: src/controllers/image.controller.js
const Image = require("../models/image.model.js");
const cloudinary = require("../utils/cloudinary.js");

exports.list = async (req, res) => {
  const {
    visibility,
    nation,
    state,
    district,
    page = 1,
    limit = 20,
  } = req.query;
  const q = {};
  if (visibility) q.visibility = visibility;
  if (nation) q.nation = nation;
  if (state) q.state = state;
  if (district) q.district = district;
  const skip = (Math.max(1, page) - 1) * limit;
  const items = await Image.find(q)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));
  res.json({ items });
};

exports.getById = async (req, res) => {
  const img = await Image.findById(req.params.id);
  if (!img) return res.status(404).json({ message: "Image not found" });
  // Optionally populate aggregated stats outside (from Rating)
  res.json({ image: img });
};

exports.create = async (req, res) => {
  if (!req.file)
    return res.status(400).json({ message: "Image file required" });
  const { title, description, visibility, nation, state, district, tags } =
    req.body;
  // upload buffer to cloudinary
  const uploadResult = (await cloudinary.uploader.upload_stream_promise)
    ? await uploadBuffer(req.file.buffer)
    : await uploadBufferFallback(req.file.buffer);

  const image = await Image.create({
    title,
    description,
    imageUrl: uploadResult.secure_url,
    publicId: uploadResult.public_id,
    createdBy: req.user._id,
    visibility,
    nation,
    state,
    district,
    tags: tags
      ? Array.isArray(tags)
        ? tags
        : tags.split(",").map((t) => t.trim())
      : [],
  });
  res.status(201).json({ image });
};
// helper to upload memory buffer using cloudinary.v2.uploader.upload_stream
function uploadBuffer(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "image-rating" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
}
async function uploadBufferFallback(buffer) {
  // fallback not expected; keep for safety
  return uploadBuffer(buffer);
}
exports.update = async (req, res) => {
  const img = await Image.findById(req.params.id);
  if (!img) return res.status(404).json({ message: "Image not found" });
  const { title, description, visibility, nation, state, district, tags } =
    req.body;
  if (req.file) {
    // delete old
    try {
      await cloudinary.uploader.destroy(img.publicId);
    } catch (e) {
      console.warn("cloudinary delete failed", e);
    }
    const uploadRes = await uploadBuffer(req.file.buffer);
    img.imageUrl = uploadRes.secure_url;
    img.publicId = uploadRes.public_id;
  }
  if (title) img.title = title;
  if (description) img.description = description;
  if (visibility) img.visibility = visibility;
  if (nation) img.nation = nation;
  if (state) img.state = state;
  if (district) img.district = district;
  if (tags)
    img.tags = Array.isArray(tags)
      ? tags
      : tags.split(",").map((t) => t.trim());
  await img.save();
  res.json({ image: img });
};

exports.remove = async (req, res) => {
  const img = await Image.findById(req.params.id);
  if (!img) return res.status(404).json({ message: "Image not found" });
  try {
    await cloudinary.uploader.destroy(img.publicId);
  } catch (e) {
    console.warn("cloudinary delete failed", e);
  }
  await img.remove();
  res.json({ message: "Deleted" });
};
