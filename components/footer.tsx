"use client";

import Link from "next/link";
import { Github, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-black mb-4">Zalith Launcher 2</h3>
            <p className="text-gray-600 text-sm">
              Minecraft Java 版启动器，采用 Jetpack Compose 和 Material Design 3
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-black mb-4">快速链接</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  功能特性
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  关于我们
                </Link>
              </li>
              <li>
                <Link
                  href="#docs"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  文档
                </Link>
              </li>
              <li>
                <Link
                  href="/download"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  下载
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-black mb-4">资源</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://zalithlauncher.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-black transition-colors flex items-center"
                >
                  官方网站
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ZalithLauncher/ZalithLauncher2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-black transition-colors flex items-center"
                >
                  GitHub (ZL2)
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-black mb-4">社区</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/ZalithLauncher/ZalithLauncher2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-black transition-colors flex items-center"
                >
                  <Github className="h-4 w-4 mr-2" />
                  GitHub (ZL2)
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Zalith Launcher. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 max-w-3xl mx-auto">
              &quot;Minecraft&quot; 及 &quot;我的世界&quot; 是 Microsoft Corporation 和 Mojang Synergies AB 的注册商标。
              Zalith Launcher 与 Microsoft、Mojang 或网易公司无任何从属或合作关系。
            </p>
            <p className="text-xs text-gray-500">
              官方网站：<a href="https://zalithlauncher.cn" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-700">zalithlauncher.cn</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

