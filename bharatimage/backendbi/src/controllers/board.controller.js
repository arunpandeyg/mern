import Board from "../models/board.model.js";
import Bim from "../models/bim.model.js";

export const getUserBoards = async (req, res) => {
  const { userId } = req.params;

  const boards = await Board.find({ user: userId });

  const boardsWithBimDetails = await Promise.all(
    boards.map(async (board) => {
      const bimCount = await Bim.countDocuments({ board: board._id });
      const firstBim = await Bim.findOne({ board: board._id });

      return {
        ...board.toObject(),
        bimCount,
        firstBim,
      };
    })
  );

  res.status(200).json(boardsWithBimDetails);
};
