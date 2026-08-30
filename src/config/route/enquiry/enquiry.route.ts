import { Router } from "express";
import { asyncHandler } from "../../../utils/asyncHandler";
import { Enquiry } from "../../../controller/enquiry.controller";


const router = Router()
const enquiry = new Enquiry();

router.post(
  "/",
  asyncHandler(enquiry.createEnquiry.bind(enquiry))
);

router.get(
  "/",
  asyncHandler(enquiry.getAllEnquiries.bind(enquiry))
);

router.get(
  "/:id",
  asyncHandler(enquiry.getEnquiryById.bind(enquiry))
);

export default router