"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export function LegalNotice() {
  return (
    <section className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-white border-gray-200 max-w-4xl mx-auto">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <AlertCircle className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-black">法律声明</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  &quot;Minecraft&quot; 及 &quot;我的世界&quot; 是 Microsoft Corporation 和 Mojang Synergies AB 的注册商标。
                  Zalith Launcher 与 Microsoft、Mojang 或网易公司无任何从属或合作关系。
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  请注意，<span className="text-gray-700 font-medium">zalithlauncher.cn</span> 是 Zalith Launcher 的唯一官方网站。
                  其他域名（如 zalithlauncher.com）并非官方站点，请谨慎辨别，保护个人隐私。
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

