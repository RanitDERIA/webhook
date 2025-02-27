import { z } from "zod";

export const ZapCreateSchema = z.object({
    availableTriggerId: z.string(),
    triggerMetadata: z.object({}).optional(),
    actions: z.array(
        z.object({
            availableActionId: z.string(), // ✅ Ensure it matches request
            actionMetadata: z.object({}).optional()
        })
    )
});
