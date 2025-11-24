import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zalith Launcher 2 (ZL2) - Minecraft Java 版启动器",
  description: "Zalith Launcher 2 (ZL2) 是一款专为 Android 设备设计的 Minecraft Java 版启动器，采用 Jetpack Compose 和 Material Design 3 构建现代化用户界面。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

