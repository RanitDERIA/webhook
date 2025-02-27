import { Router } from "express";
import { authMiddleware } from "../middleware";
import { ZapCreateSchema } from "../schemas"; // Ensure correct import path
import { prismaClient } from "../db";

const router = Router();
// @ts-ignore
router.post("/", authMiddleware, async (req, res) => {
    // @ts-ignore
    const id = req.id;
    const body = req.body;
    const parsedData = ZapCreateSchema.safeParse(body);

    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect Inputs"
        });
    }

    try {
        const zap = await prismaClient.$transaction(async (tx) => {
            const createdZap = await tx.zap.create({
                data: {
                    userId: parseInt(id), // Ensure `id` is an integer
                    actions: {
                        create: parsedData.data.actions.map((x, index) => ({
                            actionId: x.availableActionId,
                            sortingOrder: index
                        }))
                    }
                }
            });

            const trigger = await tx.trigger.create({
                data: {
                    triggerId: parsedData.data.availableTriggerId,
                    zapId: createdZap.id
                }
            });

            await tx.zap.update({
                where: { id: createdZap.id },
                data: { trigger: { connect: { id: trigger.id } } } // ✅ Correct relation update
            });

            return createdZap;
        });

        res.json({ message: "Zap created successfully", zap });
    } catch (error) {
        console.error("Error creating zap:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
// @ts-ignore
router.get("/", authMiddleware, async (req, res) => {
    // @ts-ignore
    const id = parseInt(req.id); // Ensure `id` is a number

    try {
        const zaps = await prismaClient.zap.findMany({
            where: {
                userId: id // Ensure `userId` exists in Prisma schema
            },
            include: {
                actions: {
                    include: {
                        action: true // Ensure correct relation
                    }
                }
            }
        });

        res.json({ message: "Zaps retrieved successfully", zaps });
    } catch (error) {
        console.error("Error fetching zaps:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
// @ts-ignore
router.get("/:zapId", authMiddleware, async (req, res) => {
    // @ts-ignore
    const id = req.id;
    const zapId = req.params.zapId;
    
    try {
        const zap = await prismaClient.zap.findFirst({
            where: {
                id: zapId,
                userId: id
            },
            include: {
                actions: {
                    include: {
                        action: true
                    }
                },
                trigger: {
                    include: {
                        type: true
                    }
                }
            }
        });

        if (!zap) {
            return res.status(404).json({ message: "Zap not found" });
        }

        res.json({ zap });
    } catch (error) {
        console.error("Error fetching zap:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export const zapRouter = router;
