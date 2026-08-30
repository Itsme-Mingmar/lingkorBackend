import { BaseService } from "./base.service";
import { Enquiry as EnquiryEntity } from "../entities/enquiry.entity";
import { CreateEnquiryDto } from "../Dto/enquiry/createenquiry.dto";
import { expressError } from "../utils/expressError";
import { StatusCode } from "../constant/statusCode.interface";

export class Enquiry extends BaseService<EnquiryEntity> {
  constructor() {
    super(Enquiry);
  }

  async createEnquiry(data: CreateEnquiryDto) {
    const enquiry = this.repository.create(data);

    return await this.repository.save(enquiry);
  }

  async getAllEnquiries() {
    return await this.repository.find({
      order: {
        createdAt: "DESC",
      },
    });
  }

  async getEnquiryById(id: string) {
    const enquiry = await this.repository.findOne({
      where: { id },
    });

    if (!enquiry) {
      throw new expressError(
        StatusCode.NOT_FOUND,
        "Enquiry not found"
      );
    }

    return enquiry;
  }
}