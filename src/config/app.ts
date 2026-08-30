import express from 'express';


const app = express()

app.use(express.json())


app.get("/api/v1/lingkor", (_req, res)=>{
   res.status(200).json({
    message: "Backend working fine",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
   })
})



export default app