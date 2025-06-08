import React from "react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { getApiStatus } from "../lib/blog-api-switcher";
import { HeadingMD, BodyMD } from "../components/Typography";

export default function TestEnv() {
  const apiStatus = getApiStatus();

  return (
    <div className="page-container">
      <div className="page-main max-w-4xl mx-auto">
        <HeadingMD className="mb-6">Тест переменных окружения</HeadingMD>

        <Card className="card-base p-6">
          <div className="space-y-4">
            <div>
              <BodyMD className="font-medium">Environment Variables:</BodyMD>
              <div className="grid grid-cols-1 gap-2 mt-2">
                <div className="flex justify-between items-center">
                  <span>VITE_API_URL:</span>
                  <Badge variant="outline">
                    {import.meta.env.VITE_API_URL || "не установлена"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>VITE_USE_DRF:</span>
                  <Badge variant="outline">
                    {import.meta.env.VITE_USE_DRF || "не установлена"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>REACT_APP_API_URL:</span>
                  <Badge variant="outline">
                    {import.meta.env.REACT_APP_API_URL || "не установлена"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>REACT_APP_USE_DRF:</span>
                  <Badge variant="outline">
                    {import.meta.env.REACT_APP_USE_DRF || "не установлена"}
                  </Badge>
                </div>
              </div>
            </div>

            <hr />

            <div>
              <BodyMD className="font-medium">API Status:</BodyMD>
              <div className="grid grid-cols-1 gap-2 mt-2">
                <div className="flex justify-between items-center">
                  <span>Backend:</span>
                  <Badge
                    variant={
                      apiStatus.backend === "DRF" ? "default" : "secondary"
                    }
                  >
                    {apiStatus.backend}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>API URL:</span>
                  <Badge variant="outline">{apiStatus.apiUrl}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Use DRF:</span>
                  <Badge variant={apiStatus.useDRF ? "default" : "secondary"}>
                    {apiStatus.useDRF ? "Да" : "Нет"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Development:</span>
                  <Badge
                    variant={apiStatus.isDevelopment ? "default" : "secondary"}
                  >
                    {apiStatus.isDevelopment ? "Да" : "Нет"}
                  </Badge>
                </div>
              </div>
            </div>

            <hr />

            <div>
              <BodyMD className="font-medium">Vite Environment Info:</BodyMD>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mt-2">
                <pre className="text-sm">
                  {JSON.stringify(
                    {
                      DEV: import.meta.env.DEV,
                      PROD: import.meta.env.PROD,
                      MODE: import.meta.env.MODE,
                      BASE_URL: import.meta.env.BASE_URL,
                    },
                    null,
                    2,
                  )}
                </pre>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
