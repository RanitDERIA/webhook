import { Router } from "express";
import { authMiddleware } from "../middleware";
import { SignupSchema, SigninSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

const router = Router();
// @ts-ignore
router.post("/signup", async (req, res) => {
    const body = req.body;
    const parsedData = SignupSchema.safeParse(body);

    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect Inputs"
        });
    }

    const { username, password, name } = parsedData.data;

    const userExists = await prismaClient.user.findFirst({
        where: { email: username }
    });

    if (userExists) {
        return res.status(403).json({
            message: "User already exists"
        });
    }

    await prismaClient.user.create({
        data: {
            email: username, // Store username as email
            password,
            name
        }
    });

    return res.json({
        message: "Please verify your account"
    });
});
// @ts-ignore
router.post("/signin", async (req, res) => {
    const body = req.body; // Fix: Corrected request body access
    const parsedData = SigninSchema.safeParse(body);

    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect Inputs"
        });
    }

    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username, // Fix: Correctly referencing email
            password: parsedData.data.password
        }
    });

    if (!user) {
        return res.status(403).json({
            message: "Sorry, credentials are incorrect"
        });
    }

    const token = jwt.sign({ id: user.id }, JWT_PASSWORD);

    res.json({ token });
});
// @ts-ignore
router.get("/user", authMiddleware, async (req, res) => { // Fix: Added async
    // @ts-ignore
    const id = req.id;
    const user = await prismaClient.user.findFirst({
        where: { id },
        select: { name: true, email: true }
    });

    return res.json({ user });
});

export const userRouter = router;
