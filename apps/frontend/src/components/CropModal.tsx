"use client";

import { useCallback, useState } from "react";
import Cropper, { Area } from "react-easy-crop";

type CropModalProps = {
  image: string;
  onCancel: () => void;
  onSave: (image: string) => void;
};

export default function CropModal({ image, onCancel, onSave }: CropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState<Area | null>(null);

  const save = useCallback(async () => {
    if (!area) return;
    onSave(await getCroppedImg(image, area));
  }, [area, image, onSave]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg border border-border bg-surface p-5 shadow-2xl">
        <h2 className="text-sm font-semibold text-text-primary">Crop avatar</h2>
        <div className="relative mt-4 h-80 overflow-hidden bg-black">
          <Cropper image={image} crop={crop} zoom={zoom} aspect={1} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={(_, croppedAreaPixels) => setArea(croppedAreaPixels)} />
        </div>
        <label className="mt-4 block text-xs text-text-secondary">Zoom<input type="range" min={1} max={3} step={0.1} value={zoom} onChange={(event) => setZoom(Number(event.target.value))} className="mt-2 w-full" /></label>
        <div className="mt-5 flex justify-end gap-3"><button type="button" onClick={onCancel} className="rounded-lg border border-border px-4 py-2 text-sm text-text-primary hover:bg-surface-elevated">Cancel</button><button type="button" onClick={save} className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200">Save</button></div>
      </div>
    </div>
  );
}

async function getCroppedImg(imageSrc: string, crop: Area) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  canvas.width = crop.width;
  canvas.height = crop.height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is unavailable");
  context.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
  return canvas.toDataURL("image/jpeg", 0.9);
}

function createImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}