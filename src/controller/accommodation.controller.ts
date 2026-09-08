import { Request, Response } from "express";
import { Accommodation as AccommodationService } from "../service/accommodation.service";
import { StatusCode } from "../constant/statusCode.interface";
import { Message } from "../constant/message.interface";
import { expressError } from "../utils/expressError";
import { asyncHandler } from "../utils/asyncHandler";

export class Accommodation {
    private accommodationService: AccommodationService;

    constructor() {
        this.accommodationService = new AccommodationService();
    }
    createAccommodation = asyncHandler(async (req: Request, res: Response) => {
        const { name, slug, description, capacity, category } = req.body;
        if (!name || !slug || !description || !capacity || !category) {
            throw new expressError(StatusCode.BAD_REQUEST, "Missing required fields");
        }
        const files = req.files as Express.Multer.File[];
        const images = files?.map((file) => file.path);
        await this.accommodationService.createAccommodation({ name, slug, description, capacity, category, images });

        res.status(201).json({
            status: StatusCode.CREATED,
            message: Message.CREATED
        });
    });
    getAllAccommodations = asyncHandler(async (req: Request, res: Response) => {
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 10;
        page = Math.max(page, 1);
        limit = Math.min(Math.max(limit, 1), 100);

        const result = await this.accommodationService.getAllAccommodations(page, limit);
        res.status(StatusCode.OK).json({
            success: true,
            data: result
        });
    });
    getAccommodationById = asyncHandler(async (req: Request, res: Response) => {
        const id = String(req.params.id);
        const accommodation = await this.accommodationService.getAccommodationById(id);
        res.status(StatusCode.OK).json({
            success: true,
            data: accommodation
        });
    });
    updateAccommodation = asyncHandler(async (req: Request, res: Response) => {
        const id = String(req.params.id);
        const { name, slug, description, capacity, category } = req.body;
        const files = req.files as Express.Multer.File[];
        const images = files?.map((file) => file.path);
        await this.accommodationService.updateAccommodation(id, {
            name, slug, description, capacity, category,
            ...(images &&
                images.length > 0 && {
                images,
            }),
        });
        res.status(StatusCode.OK).json({
            success: true,
            message: Message.UPDATED
        });
    });
    deleteAccommodation = asyncHandler(async (req: Request, res: Response) => {
        const id = String(req.params.id);
        await this.accommodationService.deleteAccommodation(id);
        res.status(StatusCode.OK).json({
            success: true,
            message: Message.DELETED
        });
    });
}