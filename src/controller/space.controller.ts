import { Request, Response } from "express";
import { Space as SpaceService } from "../service/space.service";
import { StatusCode } from "../constant/statusCode.interface";
import { Message } from "../constant/message.interface";
import { expressError } from "../utils/expressError";
import { asyncHandler } from "../utils/asyncHandler";

export class Space {
    private spaceService: SpaceService;

    constructor() {
        this.spaceService = new SpaceService();
    }

    createSpace = asyncHandler(async (req: Request, res: Response) => {
        const {
            name,
            slug,
            type,
            description,
            category,
        } = req.body;

        if (!name || !slug || !type || !description || !category) {
            throw new expressError(
                StatusCode.BAD_REQUEST,
                "Missing required fields",
            );
        }

        const files = req.files as Express.Multer.File[];
        const images = files?.map((file) => file.path) || [];

        await this.spaceService.createSpace({
            name,
            slug,
            type,
            description,
            category,
            images,
        });

        res.status(StatusCode.CREATED).json({
            message: Message.CREATED,
        });
    },
    );

    getAllSpaces = asyncHandler(async (req: Request, res: Response) => {
        const spaces = await this.spaceService.getAllSpaces();

        res.status(StatusCode.OK).json({
            success: true,
            data: spaces,
        });
    },
    );

    getSpaceById = asyncHandler(async (req: Request, res: Response) => {
        const id = String(req.params.id);
        const space = await this.spaceService.getSpaceById(id);

        res.status(StatusCode.OK).json({
            success: true,
            data: space,
        });
    },
    );

    updateSpace = asyncHandler(async (req: Request, res: Response) => {
        const id = String(req.params.id);

        const {
            name,
            slug,
            type,
            description,
            category,
        } = req.body;

        const files = req.files as Express.Multer.File[];
        const images = files?.map((file) => file.path);

        await this.spaceService.updateSpace(id, {
            name,
            slug,
            type,
            description,
            category,
            ...(images &&
                images.length > 0 && {
                images,
            }),
        });

        res.status(StatusCode.OK).json({
            success: true,
            message: Message.UPDATED,
        });
    },
    );

    deleteSpace = asyncHandler(
        async (req: Request, res: Response) => {
            const id = String(req.params.id);

            await this.spaceService.deleteSpace(id);

            res.status(StatusCode.OK).json({
                success: true,
                message: Message.DELETED,
            });
        },
    );
}