import { Request, Response } from "express";
import { Enquiry as EnquiryService} from "../service/enquiry.service"; 
import { StatusCode } from "../constant/statusCode.interface";
import { Message } from "../constant/message.interface";
import { expressError } from "../utils/expressError";
import { asyncHandler } from "../utils/asyncHandler";

export class Enquiry {
  private enquiryService: EnquiryService;

  constructor() {
    this.enquiryService = new EnquiryService();
  }

  createEnquiry = asyncHandler(async (req: Request, res: Response) => {
    const {name, email, date, guests, message} = req.body;
    if(!name || !email || !date || !guests){
      throw new expressError(StatusCode.BAD_REQUEST, Message.BAD_REQUEST)
    }

    await this.enquiryService.createEnquiry({name, email, date, guests, message});

    return res.status(StatusCode.CREATED).json({
      success: true,
      message: "Enquiry submitted successfully"
    });
  });

  getAllEnquiries = asyncHandler(async (req: Request, res: Response) => {
    const enquiries = await this.enquiryService.getAllEnquiries();

    return res.status(StatusCode.OK).json({
      success: true,
      data: enquiries,
    });
  });

  getEnquiryById = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    if (!id) {
      throw new expressError(StatusCode.BAD_REQUEST, "Enquiry ID is required");
    }
    const enquiry = await this.enquiryService.getEnquiryById(id);

    return res.status(StatusCode.OK).json({
      success: true,
      data: enquiry,
    });
  });
  deleteEnquiry = asyncHandler(async (req: Request, res: Response) => {
    const id = String(req.params.id);
    if (!id) {
      throw new expressError(StatusCode.BAD_REQUEST, "Enquiry ID is required");
    }
    await this.enquiryService.deleteEnquiry(id);

    return res.status(StatusCode.OK).json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  });
}