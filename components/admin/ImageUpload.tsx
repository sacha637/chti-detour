"use client";

import { useRef, useState, useCallback } from "react";
import { uploadImage, validateImageFile, getStoragePath } from "@/lib/firebase/storage";

type Props = {
  prefix: string;
  currentUrl?: string | null;
  onUploaded: (url: string, storagePath: string) => void;
  onError?: (message: string) => void;
  label?: string;
  className?: string;
};

export function ImageUpload({
  prefix,
  currentUrl,
  onUploaded,
  onError,
  label = "Image",
  className = "",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback(
    async (file: File | null) => {
      if (!file) return;
      if (!validateImageFile(file)) {
        onError?.("Type non autorisé. Utilisez JPEG, PNG, WebP ou GIF.");
        return;
      }
      setLoading(true);
      setPreview(URL.createObjectURL(file));
      try {
        const path = getStoragePath(prefix, file.name);
        const { url, storagePath } = await uploadImage(file, path);
        onUploaded(url, storagePath);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Erreur lors de l’upload.";
        onError?.(msg);
      } finally {
        setLoading(false);
      }
    },
    [prefix, onUploaded, onError]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-amber-950 mb-2">
          {label}
        </label>
      )}
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-xl overflow-hidden cursor-pointer
          transition-colors min-h-[180px] flex items-center justify-center
          ${dragOver ? "border-amber-500 bg-amber-50" : "border-amber-300 bg-amber-50/50"}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleInputChange}
          className="sr-only"
          aria-label="Choisir une image"
        />
        {loading && (
          <div className="absolute inset-0 bg-amber-100/80 flex items-center justify-center z-10">
            <span className="text-amber-900 font-medium">Upload en cours…</span>
          </div>
        )}
        {preview && !loading ? (
          <img
            src={preview}
            alt="Aperçu"
            className="max-h-[280px] w-auto object-contain"
          />
        ) : (
          !loading && (
            <p className="text-amber-700 text-center px-4">
              Glissez une image ici ou cliquez pour choisir (galerie / appareil photo)
            </p>
          )
        )}
      </div>
    </div>
  );
}
