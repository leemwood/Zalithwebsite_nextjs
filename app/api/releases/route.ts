import { NextResponse } from "next/server";

const GITHUB_API = "https://api.github.com/repos/ZalithLauncher/ZalithLauncher2/releases";

export async function GET() {
  try {
    const response = await fetch(GITHUB_API, {
      next: { revalidate: 300 }, // 缓存 5 分钟
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "ZalithLauncher-Website",
      },
      // 增加超时时间
      signal: AbortSignal.timeout(15000), // 15秒超时
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch releases:", error);
    // 返回空数组而不是错误，让前端处理
    return NextResponse.json([], { status: 200 });
  }
}

