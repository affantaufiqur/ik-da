import prisma from "../prisma";

export const authorOnChangeMiddleware = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = req.user;
    if (!req.params) {
      return res.status(401).json({ message: "Invalid id" });
    }
    const checkAuthorId = await prisma.story.findFirst({
      where: {
        id: req.params.storyId,
        author: {
          id: user.id,
        },
      },
    });
    if (!checkAuthorId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
