"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              关于 Zalith Launcher 2
            </h2>
            <p className="text-xl text-gray-600">
              基于 PojavLauncher 开发，采用 Jetpack Compose 和 Material Design 3
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-black flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  项目介绍
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 leading-relaxed">
                  Zalith Launcher 2 (ZL2) 是一款专为 Android 设备设计的 Minecraft Java 版启动器。
                  基于 PojavLauncher 开发，采用 Jetpack Compose 和 Material Design 3 构建现代化用户界面。
                  目前处于早期开发阶段，我们致力于提供更好的用户体验和更强大的功能。
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-black flex items-center">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  资源链接
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start border-gray-300 text-black hover:bg-black/10"
                  asChild
                >
                  <a
                    href="https://zalithlauncher.cn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    官方网站
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-gray-300 text-black hover:bg-black/10"
                  asChild
                >
                  <a
                    href="https://github.com/ZalithLauncher/ZalithLauncher2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    GitHub 仓库 (ZL2)
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <Card id="docs" className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">技术栈</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {["Jetpack Compose", "Material Design 3", "Kotlin", "Android"].map((tech) => (
                  <div
                    key={tech}
                    className="px-4 py-2 rounded-lg bg-black/5 border border-black/10 text-center text-gray-700"
                  >
                    {tech}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {["PojavLauncher", "Java", "Minecraft"].map((tech) => (
                  <div
                    key={tech}
                    className="px-4 py-2 rounded-lg bg-black/5 border border-black/10 text-center text-gray-700"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

