import { ImagePreview } from "@/components/extrude/ImagePreview";
import { ExtrudedPreview } from "@/components/extrude/ExtrudedPreview";
import { ExtrusionForm } from "@/components/extrude/ExtrusionForm";

export default function ExtrudePage() {
  return (
    <main className="container mx-auto px-4">
      <div className="grid grid-cols-2 gap-4">
        <ImagePreview />
        <ExtrudedPreview />
      </div>
      <ExtrusionForm />
    </main>
  );
}
