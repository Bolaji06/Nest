"use client";
import { usePathname } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import QRCode from "qrcode.react";
import { Download } from "lucide-react";
import { Button } from "./button";

export default function QRCodeGenerator({ imageName }: {imageName: string}) {
  const [listingLink, setListingLink] = useState("");

  const qrCodeRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    setListingLink(window.location.href);
    if (qrCodeRef.current) {
      const canvas = qrCodeRef.current.querySelector("canvas");
      if (canvas) {
        canvasRef.current = canvas;
      }
    }
  }, []);

  const downloadQRCode = () => {
    if (canvasRef.current) {
      const dataURL = canvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = `${imageName}.png`;
      link.click();
    }
  };

  return (
    <>
      <main>
        <div className="flex gap-2">
          <div ref={qrCodeRef}>
            <QRCode
              value={listingLink}
              renderAs="canvas"
              title="Share Listing"
            />
          </div>
          <Button
            onClick={downloadQRCode}
            className="p-0 rounded-full aspect-square bg-transparent hover:bg-slate-100 border border-slate-300"
          >
            <Download className="text-slate-500 hover:text-slate-900" />
          </Button>
        </div>
      </main>
    </>
  );
}
