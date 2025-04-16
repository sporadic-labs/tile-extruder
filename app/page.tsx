import { Introduction } from "@/components/home/Introduction";
import { UploadBox } from "@/components/home/UploadBox";

export default function HomePage() {
  return (
    <main className="container mx-auto px-4">
      <Introduction />
      <UploadBox />
    </main>
  );
}
