import { Navbar } from "@/components/navbar";
import { Download } from "@/components/download";
import { Footer } from "@/components/footer";
import { LegalNotice } from "@/components/legal-notice";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "下载 - Zalith Launcher 2 (ZL2)",
  description: "下载 Zalith Launcher 2 (ZL2) - 专为 Android 设备设计的 Minecraft Java 版启动器",
};

export default function DownloadPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Download />
      <LegalNotice />
      <Footer />
    </main>
  );
}

