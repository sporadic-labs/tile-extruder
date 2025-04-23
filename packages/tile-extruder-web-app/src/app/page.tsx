"use client";

import { useRouter } from "next/navigation";
import { useTilesetImage } from "@/app/extrude/form/TilesetImageProvider";
import ImageDropZone from "./ImageDropZone";

export default function Home() {
  const router = useRouter();
  const { setImageFile } = useTilesetImage();

  const handleImageDrop = (files: File[]) => {
    if (files.length > 0) {
      setImageFile(files[0]);
      router.push("/extrude");
    }
  };

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tile Extruder</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your tileset image and adjust the settings to create an extruded version that
            prevents rendering artifacts in game engines.
          </p>
        </div>

        <div className="max-w-[500px] w-full mx-auto">
          <ImageDropZone
            onDrop={handleImageDrop}
            className="w-full p-8 border-2 border-gray-200 p-2 rounded-sm hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <div>
                <p className="text-lg mb-1">Drag and drop your tileset image here</p>
                <p className="text-sm">or, click to select a file</p>
              </div>
            </div>
          </ImageDropZone>
        </div>
      </div>
    </main>
  );
}
