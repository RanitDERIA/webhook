"use strict";

const { Router } = require("express");
const { authMiddleware } = require("../middleware");
const { ZapCreateSchema } = require("../schemas");
const { prismaClient } = require("../db");

const router = Router();

// ✅ Create a new Zap
router.post("/", authMiddleware, async (req, res) => {
    const userId = parseInt(req.id); // Ensure userId is an integer
    const body = req.body;

    const parsedData = ZapCreateSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(400).json({ message: "Invalid request data" });
    }

    try {
        const zap = await prismaClient.$transaction(async (tx) => {
            const createdZap = await tx.zap.create({
                data: {
                    userId,
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

            return {
                ...createdZap,
                trigger
            };
        });

        res.status(201).json({ message: "Zap created successfully", zap });
    } catch (error) {
        console.error("Error creating zap:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ Get all Zaps for the logged-in user
router.get("/", authMiddleware, async (req, res) => {
    const userId = parseInt(req.id);

    try {
        const zaps = await prismaClient.zap.findMany({
            where: { userId },
            include: {
                actions: { include: { action: true } },
                trigger: { include: { type: true } } // ✅ Ensuring trigger is included
            }
        });

        res.json({
            message: "Zaps retrieved successfully",
            zaps: zaps.map((zap) => ({
                id: zap.id,
                userId: zap.userId,
                trigger: zap.trigger
                    ? {
                          id: zap.trigger.id,
                          zapId: zap.trigger.zapId,
                          triggerId: zap.trigger.triggerId,
                          type: {
                              id: zap.trigger.type.id,
                              name: zap.trigger.type.name
                          }
                      }
                    : null,
                actions: zap.actions.map((action) => ({
                    id: action.id,
                    zapId: action.zapId,
                    actionId: action.actionId,
                    sortingOrder: action.sortingOrder,
                    action: {
                        id: action.action.id,
                        name: action.action.name
                    }
                }))
            }))
        });
    } catch (error) {
        console.error("Error fetching zaps:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// ✅ Get a specific Zap by ID
router.get("/:zapId", authMiddleware, async (req, res) => {
    const userId = req.id;
    const zapId = req.params.zapId;

    try {
        const zap = await prismaClient.zap.findFirst({
            where: { id: zapId, userId },
            include: {
                actions: { include: { action: true } },
                trigger: { include: { type: true } } // ✅ Including trigger
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

module.exports = { zapRouter: router };
