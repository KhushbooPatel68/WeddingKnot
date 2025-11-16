import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Photo } from "@shared/schema";

interface PhotoGalleryProps {
  photos: Photo[];
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const goToPrevious = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedPhotoIndex !== null && selectedPhotoIndex < photos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    if (selectedPhotoIndex !== null) {
      document.addEventListener("keydown", handleKeyDown);
      lightboxRef.current?.focus();
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedPhotoIndex]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-testid="photo-gallery">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            onClick={() => openLightbox(index)}
            className="aspect-square overflow-hidden rounded-md hover-elevate transition-all duration-300"
            data-testid={`button-photo-${photo.id}`}
          >
            <img
              src={photo.url}
              alt={photo.alt}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </button>
        ))}
      </div>

      {selectedPhotoIndex !== null && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center outline-none"
          onClick={closeLightbox}
          tabIndex={0}
          data-testid="lightbox-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery lightbox"
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/10"
            onClick={closeLightbox}
            data-testid="button-close-lightbox"
          >
            <X className="h-6 w-6" />
          </Button>

          {selectedPhotoIndex > 0 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              data-testid="button-previous-photo"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
          )}

          <img
            src={photos[selectedPhotoIndex].url}
            alt={photos[selectedPhotoIndex].alt}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
            data-testid="img-lightbox-current"
          />

          {selectedPhotoIndex < photos.length - 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              data-testid="button-next-photo"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm font-montserrat" data-testid="text-photo-counter">
            {selectedPhotoIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </>
  );
}
