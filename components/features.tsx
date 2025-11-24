"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Box, Zap, Settings } from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "现代化界面设计",
    description: "采用 Jetpack Compose 和 Material Design 3 构建的全新用户界面，重新设计的应用界面添加了更多实用功能，降低了使用门槛，使更多玩家能够轻松享受 Minecraft。",
  },
  {
    icon: Box,
    title: "版本管理",
    description: "支持版本隔离，允许在外部存储目录中设置游戏版本，提供更好的版本管理体验，方便管理不同的游戏版本。",
  },
  {
    icon: Zap,
    title: "渲染器支持",
    description: "添加了更多渲染器支持，并支持渲染器插件，提升游戏画面质量和性能表现。",
  },
  {
    icon: Settings,
    title: "内容管理器",
    description: "支持对游戏版本的游戏资源进行管理，方便用户下载和管理 Mods、ModPacks、资源包、存档和光影包。",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
            功能特性
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ZL2 为 Android 用户提供最佳的 Minecraft Java 版游戏体验
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="bg-white border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg hover:shadow-black/10"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-black/5 border border-black/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-black" />
                  </div>
                  <CardTitle className="text-black">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

