import dynamic from "next/dynamic";

const DynamicCanvasInputPreview = dynamic(() => import("./canvas-input-preview"), { ssr: false });

export default DynamicCanvasInputPreview;
