import { Request, Response } from "express";
import { Journal as JournalService } from "../service/journal.service";
import { StatusCode } from "../constant/statusCode.interface";
import { expressError } from "../utils/expressError";
import { asyncHandler } from "../utils/asyncHandler";

export class Journal {
    private journalService: JournalService;

    constructor() {
        this.journalService = new JournalService();
    }

    createJournal = asyncHandler(
        async (req: Request, res: Response) => {
            const { title, tag, slug, quote, description, publishedAt, readingTime, } = req.body;

            if (!title || !tag || !slug || !quote || !description || !publishedAt || !readingTime) {
                throw new expressError(
                    StatusCode.BAD_REQUEST,
                    "All required fields must be provided",
                );
            }

            const coverImage = req.file?.path;

            await this.journalService.createJournal({
                title,
                tag,
                slug,
                quote,
                description,
                coverImage,
                publishedAt,
                readingTime: Number(readingTime),
            });

            return res.status(StatusCode.CREATED).json({
                success: true,
                message: "Journal created successfully",
            });
        },
    );

    getAllJournals = asyncHandler(async (req: Request, res: Response) => {

        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 10;

        page = Math.max(page, 1);
        limit = Math.min(Math.max(limit, 1), 100);

        const result = await this.journalService.getAllJournals(
                page,
                limit,
            );
        return res.status(StatusCode.OK).json({
            success: true,
            data: result,
        });
    });

    getJournalById = asyncHandler(async (req: Request, res: Response) => {
        const id = String(req.params.id);
        const journal = await this.journalService.getJournalById(id);

        return res.status(StatusCode.OK).json({
            success: true,
            data: journal,
        });
    });
    deleteJournal = asyncHandler(async (req: Request, res: Response) => {
        const id = String(req.params.id);
        await this.journalService.deleteJournal(id);

        return res.status(StatusCode.OK).json({
            success: true,
            message: "Journal deleted successfully",
        });
    });
}