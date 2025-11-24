"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { 
  Download as DownloadIcon, 
  Package, 
  Globe, 
  Github, 
  Server, 
  CheckCircle2, 
  ExternalLink,
  Loader2,
  AlertCircle,
  Smartphone,
  Monitor,
  Laptop,
  Tablet
} from "lucide-react";
import { marked } from "marked";

interface GitHubAsset {
  id: number;
  name: string;
  browser_download_url: string;
  size: number;
  download_count: number;
  content_type: string;
}

interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string;
  published_at: string;
  body: string;
  assets: GitHubAsset[];
  prerelease: boolean;
  draft: boolean;
}

interface DownloadSource {
  id: string;
  name: string;
  description: string;
  speed: string;
  contributor?: {
    name: string;
    url: string;
  };
}

interface DeviceType {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  patterns: string[];
}

// 下载源定义
const downloadSources: DownloadSource[] = [
  { 
    id: "github", 
    name: "GitHub 官方", 
    description: "官方发布渠道", 
    speed: "海外较快" 
  },
  { 
    id: "mirror", 
    name: "国内镜像", 
    description: "第三方加速", 
    speed: "国内较快",
    contributor: { 
      name: "咬一口的鱼py(fishcpy)", 
      url: "https://github.com/fishcpy" 
    } 
  },
  { 
    id: "foxington", 
    name: "github.com/XiaoluoFoxington源", 
    description: "第三方镜像源", 
    speed: "国内较快",
    contributor: { 
      name: "XiaoluoFoxington", 
      url: "https://github.com/XiaoluoFoxington" 
    } 
  },
  { 
    id: "zeink", 
    name: "泽客镜像 Zeink Lab", 
    description: "泽客镜像源", 
    speed: "国内较快",
    contributor: { 
      name: "Zeink Lab", 
      url: "https://zeinklab.com" 
    } 
  },
  { 
    id: "lemwood", 
    name: "柠枺镜像", 
    description: "由 柠枺(lemwood.cn) 提供", 
    speed: "国内较快",
    contributor: { 
      name: "柠枺", 
      url: "https://lemwood.cn" 
    } 
  },
];

// 基础设备类型
const baseDeviceTypes: DeviceType[] = [
  { 
    id: "all", 
    name: "全部文件", 
    icon: <Package className="h-4 w-4" />,
    description: "显示所有下载文件",
    patterns: ["*"]
  },
  { 
    id: "android", 
    name: "Android", 
    icon: <Smartphone className="h-4 w-4" />,
    description: "Android 设备",
    patterns: [".apk", ".aab", "android"]
  },
  { 
    id: "arm64", 
    name: "ARM64", 
    icon: <Smartphone className="h-4 w-4" />,
    description: "64位 ARM 架构（推荐）",
    patterns: ["arm64-v8a", "arm64"]
  },
  { 
    id: "armeabi", 
    name: "ARMv7", 
    icon: <Smartphone className="h-4 w-4" />,
    description: "32位 ARM 架构",
    patterns: ["armeabi-v7a", "armeabi"]
  },
  { 
    id: "x86_64", 
    name: "x86-64", 
    icon: <Tablet className="h-4 w-4" />,
    description: "64位 x86 架构",
    patterns: ["x86_64", "x86-64"]
  },
  { 
    id: "x86", 
    name: "x86", 
    icon: <Tablet className="h-4 w-4" />,
    description: "32位 x86 架构",
    patterns: ["x86.apk"]
  },
  { 
    id: "universal", 
    name: "通用版本", 
    icon: <Package className="h-4 w-4" />,
    description: "通用架构版本",
    patterns: ["universal"]
  },
];

// 格式化文件大小
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
}

// 格式化下载次数
function formatDownloadCount(count: number): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M";
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "K";
  }
  return count.toString();
}

// 获取镜像 URL
function getMirrorUrl(originalUrl: string, sourceId: string): string {
  if (sourceId === "github") {
    return originalUrl;
  }
  
  const url = new URL(originalUrl);
  const path = url.pathname;
  
  switch (sourceId) {
    case "mirror":
      return `https://mirror.ghproxy.com${path}`;
    case "foxington":
      return `https://github.com/XiaoluoFoxington/ZalithLauncher2/releases/download${path.split("/releases/download")[1] || ""}`;
    case "zeink":
      return `https://zeinklab.com/dl${path}`;
    case "lemwood":
      return `https://lemwood.cn/dl${path}`;
    default:
      return originalUrl;
  }
}

// 检测用户设备类型
function detectUserDeviceType(): string {
  if (typeof window === "undefined") return "all";
  
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (/android/.test(userAgent)) {
    // 检测 Android 架构（简化版）
    if (/arm64|aarch64/.test(userAgent)) {
      return "arm64";
    }
    if (/armeabi|armv7/.test(userAgent)) {
      return "armeabi";
    }
    if (/x86_64|x86-64/.test(userAgent)) {
      return "x86_64";
    }
    if (/x86/.test(userAgent) && !/x86_64|x86-64/.test(userAgent)) {
      return "x86";
    }
    return "android";
  }
  
  if (/iphone|ipad|ipod/.test(userAgent)) {
    return "all";
  }
  
  return "all";
}

export function Download() {
  const [releases, setReleases] = useState<GitHubRelease[]>([]);
  const [selectedRelease, setSelectedRelease] = useState<GitHubRelease | null>(null);
  const [selectedDeviceType, setSelectedDeviceType] = useState<string>("all");
  const [selectedSource, setSelectedSource] = useState<string>("github");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [parsedBody, setParsedBody] = useState("");

  // 获取发布版本
  useEffect(() => {
    async function fetchReleases() {
      try {
        setIsLoading(true);
        setHasError(false);
        
        const response = await fetch("/api/releases");
        if (!response.ok) {
          throw new Error("Failed to fetch releases");
        }
        
        const data: GitHubRelease[] = await response.json();
        // 过滤掉草稿和预发布版本（可选）
        const publishedReleases = data.filter(
          (release) => !release.draft && !release.prerelease
        );
        
        setReleases(publishedReleases);
        if (publishedReleases.length > 0) {
          setSelectedRelease(publishedReleases[0]);
        }
      } catch (error) {
        console.error("Error fetching releases:", error);
        setHasError(true);
        setErrorMessage("无法加载发布版本，请稍后重试");
      } finally {
        setIsLoading(false);
      }
    }

    fetchReleases();
    
    // 自动检测设备类型
    const detectedType = detectUserDeviceType();
    if (detectedType !== "all") {
      setSelectedDeviceType(detectedType);
    }
  }, []);

  // 解析 Markdown
  useEffect(() => {
    async function parseMarkdown() {
      if (selectedRelease?.body) {
        try {
          // marked v17+ 使用异步 API
          const html = await marked.parse(selectedRelease.body);
          setParsedBody(html as string);
        } catch (err) {
          // 如果解析失败，使用简单的换行替换
          setParsedBody(selectedRelease.body.replace(/\n/g, "<br />"));
        }
      } else {
        setParsedBody("");
      }
    }
    parseMarkdown();
  }, [selectedRelease]);

  // 动态设备类型（基于当前发布的文件）
  const dynamicDeviceTypes = useMemo(() => {
    if (!selectedRelease?.assets) return baseDeviceTypes;

    const assets = selectedRelease.assets;
    const detectedTypes = new Set<string>();
    
    assets.forEach((asset) => {
      const fileName = asset.name.toLowerCase();
      
      baseDeviceTypes.forEach((type) => {
        if (type.id !== "all" && type.patterns.some((pattern) => 
          pattern === "*" || fileName.includes(pattern.toLowerCase())
        )) {
          detectedTypes.add(type.id);
        }
      });
    });

    const result = [baseDeviceTypes[0]]; // 始终包含 "全部文件"
    
    baseDeviceTypes.slice(1).forEach((type) => {
      if (detectedTypes.has(type.id)) {
        result.push(type);
      }
    });
    
    return result;
  }, [selectedRelease]);

  // 过滤后的文件列表
  const filteredAssets = useMemo(() => {
    if (!selectedRelease?.assets) return [];
    
    if (selectedDeviceType === "all") {
      return selectedRelease.assets;
    }
    
    const deviceType = dynamicDeviceTypes.find((dt) => dt.id === selectedDeviceType);
    if (!deviceType) return selectedRelease.assets;
    
    return selectedRelease.assets.filter((asset) => {
      const fileName = asset.name.toLowerCase();
      return deviceType.patterns.some((pattern) => 
        pattern === "*" || fileName.includes(pattern.toLowerCase())
      );
    });
  }, [selectedRelease, selectedDeviceType, dynamicDeviceTypes]);

  // 选择版本
  const handleVersionChange = (tagName: string) => {
    const release = releases.find((r) => r.tag_name === tagName);
    if (release) {
      setSelectedRelease(release);
    }
  };

  // 下载文件
  const handleDownload = (asset: GitHubAsset) => {
    const url = getMirrorUrl(asset.browser_download_url, selectedSource);
    window.open(url, "_blank");
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-black" />
            <p className="text-gray-600">正在加载发布版本...</p>
          </div>
        </div>
      </section>
    );
  }

  if (hasError) {
    return (
      <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white border-red-200">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3 text-red-600">
                  <AlertCircle className="h-5 w-5" />
                  <div>
                    <p className="font-semibold">加载失败</p>
                    <p className="text-sm text-gray-600">{errorMessage}</p>
                  </div>
                </div>
                <Button
                  className="mt-4"
                  onClick={() => window.location.reload()}
                >
                  重试
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* 标题 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              下载 Zalith Launcher 2
            </h1>
            <p className="text-xl text-gray-600">
              选择版本和镜像源，开始下载
            </p>
          </div>

          {/* 版本选择 */}
          {releases.length > 0 && (
            <Card className="bg-white border-gray-200 mb-6">
              <CardHeader>
                <CardTitle className="text-black flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  选择版本
                </CardTitle>
                <CardDescription className="text-gray-600">
                  选择要下载的 ZL2 版本
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select
                  value={selectedRelease?.tag_name || ""}
                  onValueChange={handleVersionChange}
                >
                  <SelectTrigger className="w-full bg-white border-gray-300 text-black">
                    <span>{selectedRelease?.tag_name || "选择版本"}</span>
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    {releases.map((release) => (
                      <SelectItem
                        key={release.id}
                        value={release.tag_name}
                        className="text-black hover:bg-gray-100"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span>{release.tag_name}</span>
                          <span className="text-xs text-gray-500 ml-4">
                            {new Date(release.published_at).toLocaleDateString("zh-CN")}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          )}

          {/* 选择器：设备类型和镜像源 */}
          {selectedRelease && (
            <Card className="bg-white border-gray-200 mb-6">
              <CardHeader>
                <CardTitle className="text-black">下载选项</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 设备类型选择 */}
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      设备类型
                    </label>
                    <Select
                      value={selectedDeviceType}
                      onValueChange={setSelectedDeviceType}
                    >
                      <SelectTrigger className="w-full bg-white border-gray-300 text-black">
                        <div className="flex items-center space-x-2">
                          {dynamicDeviceTypes.find((dt) => dt.id === selectedDeviceType)?.icon}
                          <span>
                            {dynamicDeviceTypes.find((dt) => dt.id === selectedDeviceType)?.name || "全部文件"}
                          </span>
                        </div>
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200">
                        {dynamicDeviceTypes.map((type) => (
                          <SelectItem
                            key={type.id}
                            value={type.id}
                            className="text-black hover:bg-gray-100"
                          >
                            <div className="flex items-center space-x-2">
                              {type.icon}
                              <div className="flex flex-col">
                                <span>{type.name}</span>
                                <span className="text-xs text-gray-500">{type.description}</span>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* 镜像源选择 */}
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">
                      下载镜像
                    </label>
                    <Select
                      value={selectedSource}
                      onValueChange={setSelectedSource}
                    >
                      <SelectTrigger className="w-full bg-white border-gray-300 text-black">
                        <span>{downloadSources.find((s) => s.id === selectedSource)?.name || "GitHub 官方"}</span>
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200">
                        {downloadSources.map((source) => (
                          <SelectItem
                            key={source.id}
                            value={source.id}
                            className="text-black hover:bg-gray-100"
                          >
                            <div className="flex flex-col w-full">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{source.name}</span>
                                {selectedSource === source.id && (
                                  <CheckCircle2 className="h-4 w-4 text-black" />
                                )}
                              </div>
                              <span className="text-xs text-gray-500">{source.description}</span>
                              {source.contributor && (
                                <span className="text-xs text-gray-400 mt-1">
                                  由{" "}
                                  <a
                                    href={source.contributor.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-black hover:underline"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {source.contributor.name}
                                  </a>{" "}
                                  提供
                                </span>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 文件列表 */}
          {selectedRelease && (
            <Card className="bg-white border-gray-200 mb-6">
              <CardHeader>
                <CardTitle className="text-black">下载文件</CardTitle>
                <CardDescription className="text-gray-600">
                  {filteredAssets.length > 0
                    ? `共 ${filteredAssets.length} 个文件`
                    : "没有匹配的文件"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredAssets.length > 0 ? (
                  <div className="space-y-3">
                    {filteredAssets.map((asset) => (
                      <div
                        key={asset.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-black/20 hover:shadow-md transition-all"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Package className="h-5 w-5 text-black" />
                            <h3 className="font-semibold text-black">{asset.name}</h3>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 ml-8">
                            <span>{formatFileSize(asset.size)}</span>
                            {asset.download_count > 0 && (
                              <span>下载 {formatDownloadCount(asset.download_count)} 次</span>
                            )}
                          </div>
                        </div>
                        <Button
                          onClick={() => handleDownload(asset)}
                          className="bg-black text-white hover:bg-gray-800"
                        >
                          <DownloadIcon className="h-4 w-4 mr-2" />
                          下载
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>没有找到匹配的文件</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* 发布说明 */}
          {selectedRelease && parsedBody && (
            <Card className="bg-white border-gray-200 mb-6">
              <CardHeader>
                <CardTitle className="text-black">发布说明</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="prose prose-sm max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: parsedBody }}
                />
              </CardContent>
            </Card>
          )}

          {/* 其他下载选项 */}
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">其他下载方式</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <a
                  href="https://github.com/ZalithLauncher/ZalithLauncher2/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-black/5 border border-black/10 hover:bg-black/10 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Github className="h-5 w-5 text-black" />
                    <div>
                      <p className="text-black font-medium">GitHub Releases</p>
                      <p className="text-xs text-gray-600">查看所有版本和发布说明</p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-500" />
                </a>
                <a
                  href="https://zalithlauncher.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-black/5 border border-black/10 hover:bg-black/10 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-black" />
                    <div>
                      <p className="text-black font-medium">官方网站</p>
                      <p className="text-xs text-gray-600">访问 zalithlauncher.cn 获取更多信息</p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-500" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
