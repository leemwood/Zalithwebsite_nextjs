"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Download } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                Zalith Launcher 2
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                功能特性
              </Link>
              <Link
                href="#about"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                关于我们
              </Link>
              <Link
                href="#docs"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                文档
              </Link>
              <Link
                href="/download"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                下载
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/ZalithLauncher/ZalithLauncher2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild>
              <a href="/download">
                <Download className="h-4 w-4 mr-2" />
                下载
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

