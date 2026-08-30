import { Request, Response } from "express";
import { Enquiry as EnquiryService} from "../service/enquiry.service"; 
import { StatusCode } from "../constant/statusCode.interface";

export class Enquiry {
  private enquiryService: EnquiryService;

  constructor() {
    this.enquiryService = new EnquiryService();
  }

  createEnquiry = async (req: Request, res: Response) => {
    const enquiry = await this.enquiryService.createEnquiry(req.body);

    return res.status(StatusCode.CREATED).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: enquiry
    });
  };

  getAllEnquiries = async (req: Request, res: Response) => {
    const enquiries = await this.enquiryService.getAllEnquiries();

    return res.status(StatusCode.OK).json({
      success: true,
      data: enquiries,
    });
  };

  getEnquiryById = async (req: Request, res: Response) => {
    const enquiry = await this.enquiryService.getEnquiryById(String(req.params.id));

    return res.status(StatusCode.OK).json({
      success: true,
      data: enquiry,
    });
  };
}