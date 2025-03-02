"use client";
import { Appbar } from "@/app/components/Appbar";
import { PrimaryButton } from "@/app/components/buttons/PrimaryButton";
import { ZapCell } from "@/app/components/ZapCell";
import { useState } from "react";

export default function ZapPage() {
    const [selectedTrigger] = useState("");
    const [selectedActions, setSelectedActions] = useState<Array<{
        availableActionId: string;
        availableActionName: string;
    }>>([]);

    return (
        <div>
            <Appbar />
            <div className="flex w-full min-h-screen bg-slate-200 flex-col justify-center">
                {/* Trigger Section */}
                <div className="flex justify-center w-full">
                    <ZapCell name={selectedTrigger || "Trigger"} index={1} />
                </div>

                {/* Actions Section - Display only when actions exist */}
                {selectedActions.length > 0 && (
                    <div className="justify-center w-full pt-2 pb-2">
                        {selectedActions.map((action, index) => (
                            <div key={action.availableActionId} className="flex justify-center">
                                <ZapCell name={action.availableActionName} index={2 + index} />
                            </div>
                        ))}
                    </div>
                )}

                {/* Add Action Button */}
                <div className="flex justify-center mt-2">
                    <PrimaryButton onclick={() => {
                        setSelectedActions(prev => [...prev, {
                            availableActionId: String(Date.now()), // Unique ID with timestamp
                            availableActionName: "Action"
                        }]);
                    }}>
                        <div className="text-1xl max-w-2 ">+</div>
                    </PrimaryButton>
                </div>
            </div>
        </div>
    ); 
}
