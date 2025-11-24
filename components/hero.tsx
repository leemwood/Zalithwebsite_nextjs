"use client";

import { Button } from "@/components/ui/button";
import { Download, Github, Sparkles } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-black/5 border border-black/10 mb-8">
            <Sparkles className="h-4 w-4 text-black" />
            <span className="text-sm text-black/80">Minecraft Java 版启动器</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-black via-gray-700 to-gray-500 bg-clip-text text-transparent">
            Zalith Launcher 2
          </h1>
          <div className="mb-6">
            <span className="text-2xl md:text-3xl font-semibold text-gray-600">ZL2</span>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-2xl mx-auto">
            专为 Android 设备设计的 Minecraft Java 版启动器
          </p>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            采用 Jetpack Compose 和 Material Design 3 构建现代化用户界面
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" className="bg-black text-white hover:bg-gray-800" asChild>
              <a href="/download">
                <Download className="h-5 w-5 mr-2" />
                立即下载
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-black/20 text-black hover:bg-black/10"
              asChild
            >
              <a
                href="https://github.com/ZalithLauncher/ZalithLauncher2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5 mr-2" />
                GitHub
              </a>
            </Button>
          </div>
          
          {/* Launcher Preview */}
          <div className="relative mt-16 rounded-lg overflow-hidden border border-black/10 bg-white shadow-lg">
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <Image
                src="/ZL2主页面.svg"
                alt="Zalith Launcher 2 (ZL2) 界面预览"
                width={1200}
                height={675}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-black/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-black/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

