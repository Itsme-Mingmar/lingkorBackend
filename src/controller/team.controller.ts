import { Request, Response } from "express";
import { Team as TeamService } from "../service/team.service";
import { StatusCode } from "../constant/statusCode.interface";
import { expressError } from "../utils/expressError";
import { asyncHandler } from "../utils/asyncHandler";

export class Team {
    private teamService: TeamService;

    constructor() {
        this.teamService = new TeamService();
    }

    loginTeam = asyncHandler(async (req: Request, res: Response) => {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new expressError(
                StatusCode.BAD_REQUEST,
                "Email and password are required",
            );
        }
        const { refreshToken, accessToken } = await this.teamService.loginTeam({
            email,
            password,
        });

        res.status(StatusCode.OK)
            .cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 15 * 60 * 1000,
            })
            .cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            .json({
                success: true,
                message: "Login successful",
            })
    });
}