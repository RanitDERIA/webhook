"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zapRouter = void 0;
const express_1 = require("express");
const middleware_1 = require("../middleware");
const schemas_1 = require("../schemas"); // Ensure correct import path
const db_1 = require("../db");
const router = (0, express_1.Router)();
// @ts-ignore
router.post("/", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const id = req.id;
    const body = req.body;
    const parsedData = schemas_1.ZapCreateSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect Inputs"
        });
    }
    try {
        const zap = yield db_1.prismaClient.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const createdZap = yield tx.zap.create({
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
            const trigger = yield tx.trigger.create({
                data: {
                    triggerId: parsedData.data.availableTriggerId,
                    zapId: createdZap.id
                }
            });
            yield tx.zap.update({
                where: { id: createdZap.id },
                data: { trigger: { connect: { id: trigger.id } } } // ✅ Correct relation update
            });
            return createdZap;
        }));
        res.json({ message: "Zap created successfully", zap });
    }
    catch (error) {
        console.error("Error creating zap:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
// @ts-ignore
router.get("/", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const id = parseInt(req.id); // Ensure `id` is a number
    try {
        const zaps = yield db_1.prismaClient.zap.findMany({
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
    }
    catch (error) {
        console.error("Error fetching zaps:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
// @ts-ignore
router.get("/:zapId", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const id = req.id;
    const zapId = req.params.zapId;
    try {
        const zap = yield db_1.prismaClient.zap.findFirst({
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
    }
    catch (error) {
        console.error("Error fetching zap:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.zapRouter = router;
