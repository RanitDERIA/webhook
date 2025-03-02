/* eslint-disable react/jsx-key */
/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */
"use client";

import { Appbar } from "../components/Appbar";
import { DarkButton } from "../components/buttons/DarkButton";
import axios from "axios";
import { JSX, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "../config";
import { Mail, Zap as ZapIcon, Code, Bell } from "lucide-react";

interface Action {
  id: string;
  zapId: string;
  actionId: string;
  sortingOrder: number;
  action: {
    id: string;
    name: string;
  };
}

interface Trigger {
  id: string;
  zapId: string;
  triggerId: string;
  type: {
    id: string;
    name: string;
  };
}

interface Zap {
  id: string;
  userId: number;
  trigger?: Trigger;
  actions: Action[];
}

function useZaps() {
  const [loading, setLoading] = useState(true);
  const [zaps, setZaps] = useState<Zap[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/zap`, {
        headers: { Authorization: localStorage.getItem("token") || "" },
      })
      .then((res) => {
        setZaps(res.data.zaps);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching zaps:", error);
        setLoading(false);
      });
  }, []);

  return { loading, zaps };
}

// Mapping action IDs to icons
const actionIcons: Record<string, JSX.Element> = {
  email: <Mail size={18} />,
  sol: <ZapIcon size={18} />,
  webhook: <Code size={18} />,
  notification: <Bell size={18} />,
};

export default function ZapsPage() {
  const { loading, zaps } = useZaps();
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <Appbar />
      <div className="w-3/5 mt-8 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">My Kravs</h2>
          <DarkButton onClick={() => router.push("/zap/create")}>
            Create
          </DarkButton>
        </div>
        <div className="p-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <ZapTable zaps={zaps} />
          )}
        </div>
      </div>
    </div>
  );
}

function ZapTable({ zaps }: { zaps: Zap[] }) {
  const router = useRouter();

  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="text-gray-600 border-b">
          <th className="p-2">Trigger</th>
          <th className="p-2">Running</th>
          <th className="p-2">Actions</th>
          <th className="p-2">Edit</th>
        </tr>
      </thead>
      <tbody>
        {zaps.map((zap) => (
          <tr key={zap.id} className="border-b">
            <td className="p-2">{zap.trigger?.type.name || "No Trigger"}</td>
            <td className="p-2">Active</td>
            <td className="p-2">
              {zap.actions.map((action) => (
                <div key={action.id} className="flex items-center mb-1">
                  <span className="mr-2">
                    {actionIcons[action.action.id] || null}
                  </span>
                  <span className="text-gray-800">{action.action.name}</span>
                </div>
              ))}
            </td>
            <td className="p-2">
              <button onClick={() => router.push(`/zap/${zap.id}`)}>
                <svg
                  className="w-5 h-5 text-gray-600 hover:text-black"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
