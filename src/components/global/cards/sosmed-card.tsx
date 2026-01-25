
import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

import GlobalCard from "./global-card";
import { SocmedAccountType } from "@/interfaces/sosmed";
import { convertNumber } from "@/modules/elements/card/utils/utils";
import { PLATFORM_HEX_COLOR } from "@/interfaces/platform";

type Props = {
  accounts?: SocmedAccountType[];
  isLoading?: boolean;
};

const SocmedAccounts = ({ accounts, isLoading }: Props) => {
  const hasData = !!accounts && accounts.length > 0;

  const platformTitle: Record<string, string> = {
    instagram: "Instagram",
    twitter: "Twitter",
    x: "Twitter/X",
    tiktok: "TikTok",
    youtube: "YouTube",
    facebook: "Facebook",
    telegram: "Telegram",
  };

  // Simple gradient map; falls back to brand color
  const gradientByPlatform: Record<string, string> = {
    instagram: "from-purple-500 to-pink-500",
    twitter: "from-blue-400 to-blue-600",
    x: "from-gray-600 to-gray-800",
    tiktok: "from-black to-gray-800",
    youtube: "from-red-500 to-red-600",
    facebook: "from-blue-500 to-blue-600",
    telegram: "from-sky-400 to-sky-600",
  };

  const iconByPlatform: Record<string, React.ReactNode> = {
    instagram: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        className="size-5"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
        />
      </svg>
    ),
    tiktok: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        className="size-5"
        viewBox="0 0 256 256"
      >
        <path
          fill="currentColor"
          d="M224 72a48.05 48.05 0 0 1-48-48a8 8 0 0 0-8-8h-40a8 8 0 0 0-8 8v132a20 20 0 1 1-28.57-18.08a8 8 0 0 0 4.57-7.23V88a8 8 0 0 0-9.4-7.88C50.91 86.48 24 119.1 24 156a76 76 0 0 0 152 0v-39.71A103.25 103.25 0 0 0 224 128a8 8 0 0 0 8-8V80a8 8 0 0 0-8-8m-8 39.64a87.2 87.2 0 0 1-43.33-16.15A8 8 0 0 0 160 102v54a60 60 0 0 1-120 0c0-25.9 16.64-49.13 40-57.6v27.67A36 36 0 1 0 136 156V32h24.5A64.14 64.14 0 0 0 216 87.5Z"
        />
      </svg>
    ),
    twitter: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        role="img"
        className="size-5 iconify iconify--line-md"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <g fill="currentColor">
          <path d="M1 2h2.5L3.5 2h-2.5zM5.5 2h2.5L7.2 2h-2.5z">
            <animate
              fill="freeze"
              attributeName="d"
              dur="0.4s"
              values="M1 2h2.5L3.5 2h-2.5zM5.5 2h2.5L7.2 2h-2.5z;M1 2h2.5L18.5 22h-2.5zM5.5 2h2.5L23 22h-2.5z"
            ></animate>
          </path>
          <path d="M3 2h5v0h-5zM16 22h5v0h-5z">
            <animate
              fill="freeze"
              attributeName="d"
              begin="0.4s"
              dur="0.4s"
              values="M3 2h5v0h-5zM16 22h5v0h-5z;M3 2h5v2h-5zM16 22h5v-2h-5z"
            ></animate>
          </path>
          <path d="M18.5 2h3.5L22 2h-3.5z">
            <animate
              fill="freeze"
              attributeName="d"
              begin="0.5s"
              dur="0.4s"
              values="M18.5 2h3.5L22 2h-3.5z;M18.5 2h3.5L5 22h-3.5z"
            ></animate>
          </path>
        </g>
      </svg>
    ),
    youtube: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        className="size-5"
        viewBox="0 0 24 24"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <path
            fill="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14 12l-3.5 2v-4z"
          ></path>
          <path d="M2 12.708v-1.416c0-2.895 0-4.343.905-5.274c.906-.932 2.332-.972 5.183-1.053C9.438 4.927 10.818 4.9 12 4.9s2.561.027 3.912.065c2.851.081 4.277.121 5.182 1.053S22 8.398 22 11.292v1.415c0 2.896 0 4.343-.905 5.275c-.906.931-2.331.972-5.183 1.052c-1.35.039-2.73.066-3.912.066s-2.561-.027-3.912-.066c-2.851-.08-4.277-.12-5.183-1.052S2 15.602 2 12.708Z"></path>
        </g>
      </svg>
    ),
    facebook: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        className="size-5"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M17 2h-3a5 5 0 0 0-5 5v3H6v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
        ></path>
      </svg>
    ),
  };

  return (
    <GlobalCard title="Social Media Accounts">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden"
            >
              <div className="p-0">
                <div className={`bg-muted p-4 relative`}>
                  <div className="flex items-center gap-3 mb-4">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : hasData ? (
          accounts!.map((acc) => {
            const platform = String(acc.platform).toLowerCase();
            const gradient =
              gradientByPlatform[platform] || "from-gray-500 to-gray-700";
            const title = platformTitle[platform] || platform.toUpperCase();
            return (
              <div
                key={`${platform}-${acc.username}`}
                className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden"
              >
                <div className="p-0">
                  <div
                    className={`bg-gradient-to-br ${gradient} p-4 text-white relative`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-white/20 rounded-full overflow-hidden flex items-center justify-center">
                        <span className="text-white">
                          {iconByPlatform[platform] || (
                            <div
                              className="w-8 h-8 rounded-full"
                              style={{
                                backgroundColor:
                                  PLATFORM_HEX_COLOR[platform] || "#999",
                              }}
                            />
                          )}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{title}</h4>
                        <p className="text-xs opacity-90">@{acc.username}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold">{convertNumber(acc.follower_count ?? 0)}</p>
                        <p className="text-xs opacity-75">Followers</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold">{convertNumber(acc.following_count ?? 0)}</p>
                        <p className="text-xs opacity-75">Following</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold">{convertNumber(0)}</p>
                        <p className="text-xs opacity-75">Posts</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          // Fallback: keep one simple placeholder card
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="p-0">
              <div className="bg-muted p-6 text-foreground/70 text-sm">
                No social accounts to display.
              </div>
            </div>
          </div>
        )}
      </div>
    </GlobalCard>
  );
};

export default SocmedAccounts;
