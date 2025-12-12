import express, { NextFunction, Request, Response } from "express";
import { validate } from "../middlewares/validate.middleware";
import {
  createAnchorSchema,
  deleteAnchorSchema,
  updateAnchorSchema,
} from "../schemas/anchor.schema";
import {
  createAnchor,
  deleteAnchor,
  getAnchors,
  updateAnchor,
} from "../services/anchor.service";

const anchorRoutes = express.Router();

anchorRoutes.post(
  "/",
  validate(createAnchorSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      await createAnchor(data);
      res.status(201).json({
        message: "Created successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

anchorRoutes.get(
  "/",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const anchors = await getAnchors();
      res.status(200).json(anchors);
    } catch (error) {
      next(error);
    }
  }
);

anchorRoutes.put(
  "/:id",
  validate(updateAnchorSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data = req.body;
      await updateAnchor(id, data);
      res.status(200).json({
        message: "Updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

anchorRoutes.delete(
  "/:id",
  validate(deleteAnchorSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await deleteAnchor(id);
      res.status(200).json({
        message: "Deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default anchorRoutes;
