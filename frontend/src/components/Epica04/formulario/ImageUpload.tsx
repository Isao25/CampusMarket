import React from "react";
import { UploadedImage } from "../../../pages/Epica04/hooks/useImageUpload";
import { DndContext, closestCenter} from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { Plus, Maximize2, X } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
interface ImageUploadProps {
  images: UploadedImage[];
  onPreview: (url: string) => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeImage: (id: string) => void;
  onDragEnd: (event: any) => void;
}


const SortableImage = ({ image }: { image: UploadedImage }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: image.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative aspect-square bg-muted rounded-lg overflow-hidden"
      {...attributes}
      {...listeners}
    >
      <img src={image.url} alt="Uploaded product" className="w-full h-full object-cover" />
    </div>
  );
};

export const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  onPreview,
  handleFileUpload,
  removeImage,
  onDragEnd,
}) => (
  <DndContext
    collisionDetection={closestCenter}
    onDragEnd={onDragEnd}
  >
    <SortableContext
      items={images.map((img) => img.id)}
      strategy={horizontalListSortingStrategy}
    >
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <SortableImage image={image} />
            <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity pointer-events-none">
              {/* Overlay buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPreview(image.url);
                }}
                className="p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors pointer-events-auto"
              >
                <Maximize2 className="w-4 h-4 text-gray-900" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(image.id);
                }}
                className="p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors pointer-events-auto"
              >
                <X className="w-4 h-4 text-gray-900" />
              </button>
            </div>
          </div>
        ))}
        {images.length < 5 && (
          <label className="aspect-square rounded-lg border-2 border-dashed cursor-pointer flex items-center justify-center">
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <Plus className="w-6 h-6 text-muted-foreground" />
          </label>
        )}
      </div>
    </SortableContext>
  </DndContext>
);
