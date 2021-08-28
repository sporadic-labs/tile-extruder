import dynamic from "next/dynamic";

const DynamicCanvasExtrudePreview = dynamic(() => import("./canvas-extrude-preview"), {
  ssr: false,
});

export default DynamicCanvasExtrudePreview;
