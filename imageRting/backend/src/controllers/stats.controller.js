// FILE: src/controllers/stats.controller.js
const Rating2 = require("../models/rating.model.js");
const Image2 = require("../models/image.model.js");
const User2 = require("../models/user.model.js");
const mongoose5 = require("mongoose");

exports.overview = async (req, res) => {
  const totalImages = await Image2.countDocuments();
  const totalUsers = await User2.countDocuments();
  const totalLikes = await Rating2.countDocuments({ reaction: "like" });
  res.json({ totalImages, totalUsers, totalLikes });
};
// geo: group likes by nation/state/district
exports.geo = async (req, res) => {
  const { level = "nation", nation, state } = req.query; // level: nation|state|district
  const match = { reaction: "like" };
  // join with images to get location fields
  const pipeline = [
    { $match: match },
    {
      $lookup: {
        from: "images",
        localField: "image",
        foreignField: "_id",
        as: "image",
      },
    },
    { $unwind: "$image" },
  ];
  if (level === "nation") {
    pipeline.push({ $group: { _id: "$image.nation", likes: { $sum: 1 } } });
  } else if (level === "state") {
    if (nation) pipeline.push({ $match: { "image.nation": nation } });
    pipeline.push({
      $group: {
        _id: { nation: "$image.nation", state: "$image.state" },
        likes: { $sum: 1 },
      },
    });
  } else if (level === "district") {
    if (nation) pipeline.push({ $match: { "image.nation": nation } });
    if (state) pipeline.push({ $match: { "image.state": state } });
    pipeline.push({
      $group: {
        _id: {
          nation: "$image.nation",
          state: "$image.state",
          district: "$image.district",
        },
        likes: { $sum: 1 },
      },
    });
  }
  const raw = await Rating2.aggregate(pipeline);
  res.json({ data: raw });
};
// demographics: group likes by religion and by age buckets
exports.demographics = async (req, res) => {
  // We'll compute likes grouped by religion and by age bucket
  const ageBuckets = [15, 20, 30, 40, 50, 60, 70, 80, 90];
  const pipeline = [
    { $match: { reaction: "like" } },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $lookup: {
        from: "images",
        localField: "image",
        foreignField: "_id",
        as: "image",
      },
    },
    { $unwind: "$image" },
    {
      $addFields: {
        age: {
          $floor: {
            $divide: [
              { $subtract: [new Date(), "$user.birthdate"] },
              1000 * 60 * 60 * 24 * 365,
            ],
          },
        },
      },
    },
    {
      $addFields: {
        ageBucket: {
          $switch: {
            branches: [
              { case: { $lte: ["$age", 15] }, then: "15" },
              {
                case: { $and: [{ $gt: ["$age", 15] }, { $lte: ["$age", 20] }] },
                then: "20",
              },
              {
                case: { $and: [{ $gt: ["$age", 20] }, { $lte: ["$age", 30] }] },
                then: "30",
              },
              {
                case: { $and: [{ $gt: ["$age", 30] }, { $lte: ["$age", 40] }] },
                then: "40",
              },
              {
                case: { $and: [{ $gt: ["$age", 40] }, { $lte: ["$age", 50] }] },
                then: "50",
              },
              {
                case: { $and: [{ $gt: ["$age", 50] }, { $lte: ["$age", 60] }] },
                then: "60",
              },
              {
                case: { $and: [{ $gt: ["$age", 60] }, { $lte: ["$age", 70] }] },
                then: "70",
              },
              {
                case: { $and: [{ $gt: ["$age", 70] }, { $lte: ["$age", 80] }] },
                then: "80",
              },
              {
                case: { $and: [{ $gt: ["$age", 80] }, { $lte: ["$age", 90] }] },
                then: "90",
              },
            ],
            default: "90+",
          },
        },
      },
    },
  ];
  // group by religion
  const byReligion = await Rating2.aggregate([
    ...pipeline,
    { $group: { _id: "$user.religion", likes: { $sum: 1 } } },
  ]);
  const byAge = await Rating2.aggregate([
    ...pipeline,
    { $group: { _id: "$ageBucket", likes: { $sum: 1 } } },
  ]);
  res.json({ byReligion, byAge });
};

// Helper to compute age bucket
const getAgeBucketStage = () => ({
  $addFields: {
    age: {
      $floor: {
        $divide: [
          { $subtract: [new Date(), "$user.birthdate"] },
          1000 * 60 * 60 * 24 * 365,
        ],
      },
    },
  },
});

const imageBreakdown = async (req, res, next) => {
  try {
    const { id } = req.params;

    const pipeline = [
      { $match: { image: Rating.toObjectId ? Rating.toObjectId(id) : id, reaction: "like" } },
      { $lookup: { from: "users", localField: "user", foreignField: "_id", as: "user" } },
      { $unwind: "$user" },
      { $lookup: { from: "images", localField: "image", foreignField: "_id", as: "image" } },
      { $unwind: "$image" },
      getAgeBucketStage(),
      {
        $addFields: {
          ageBucket: {
            $switch: {
              branches: [
                { case: { $lte: ["$age", 15] }, then: "15" },
                { case: { $and: [{ $gt: ["$age", 15] }, { $lte: ["$age", 20] }] }, then: "20" },
                { case: { $and: [{ $gt: ["$age", 20] }, { $lte: ["$age", 30] }] }, then: "30" },
                { case: { $and: [{ $gt: ["$age", 30] }, { $lte: ["$age", 40] }] }, then: "40" },
                { case: { $and: [{ $gt: ["$age", 40] }, { $lte: ["$age", 50] }] }, then: "50" },
                { case: { $and: [{ $gt: ["$age", 50] }, { $lte: ["$age", 60] }] }, then: "60" },
                { case: { $and: [{ $gt: ["$age", 60] }, { $lte: ["$age", 70] }] }, then: "70" },
                { case: { $and: [{ $gt: ["$age", 70] }, { $lte: ["$age", 80] }] }, then: "80" },
                { case: { $and: [{ $gt: ["$age", 80] }, { $lte: ["$age", 90] }] }, then: "90" },
                { case: { $gt: ["$age", 90] }, then: "90+" },
              ],
              default: "unknown",
            },
          },
        },
      },
      {
        $group: {
          _id: {
            religion: "$user.religion",
            ageBucket: "$ageBucket",
            nation: "$image.nation",
            state: "$image.state",
            district: "$image.district",
          },
          likes: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          religion: "$_id.religion",
          ageBucket: "$_id.ageBucket",
          nation: "$_id.nation",
          state: "$_id.state",
          district: "$_id.district",
          likes: 1,
        },
      },
    ];

    const breakdown = await Rating.aggregate(pipeline);

    res.status(200).json({
      success: true,
      message: "Image breakdown fetched successfully",
      data: breakdown,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  imageBreakdown,
};
