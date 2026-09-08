import { Request, Response, NextFunction } from "express";
import { Category as CategoryService } from "../service/category.service";
import { StatusCode } from "../constant/statusCode.interface";
import { expressError } from "../utils/expressError";
import { asyncHandler } from "../utils/asyncHandler";

export class Category {
    private categoryService = new CategoryService();

    createCategory = asyncHandler(async (req: Request, res: Response) => {
        const { name, slug } = req.body;
        if (!name || !slug) {
            throw new expressError(StatusCode.BAD_REQUEST, "Missing required fields");
        }
        await this.categoryService.createCategory({ name, slug });

        res.status(StatusCode.CREATED).json({
            success: true,
            message: "Category created successfully",
        });
    });
    getAllCategories = asyncHandler(async (req: Request, res: Response) => {
        const categories = await this.categoryService.getAllCategories();

        res.status(StatusCode.OK).json({
            success: true, 
            data: categories 
        });
    });
    deleteCategory = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params as { id: string };
        await this.categoryService.deleteCategory(id);
        res.status(StatusCode.OK).json({
            success: true,
            message: "Category deleted successfully",
        });
    });
}
