import express from "express";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
const app = express();

app.use(express.json()); // ✅ Fix: Middleware to parse JSON body

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;

    try {
        await client.$transaction(async (tx) => {
            const run = await tx.zapRun.create({ // ✅ Fix: Use `tx.zapRun.create`
                data: {
                    zapId: zapId,
                    metadata: req.body // ✅ Fix: Use `req.body`
                }
            });

            await tx.zapRunOutbox.create({
                data: {
                    zapRunId: run.id
                }
            });
        });

        res.status(201).json({ message: "ZapRun and Outbox created successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
