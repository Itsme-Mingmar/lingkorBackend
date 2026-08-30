import express from "express"
import enquiryRoute from "./enquiry/enquiry.route"

const router = express.Router()

router.use("/enquiry", enquiryRoute)