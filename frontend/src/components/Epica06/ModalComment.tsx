import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export const ModalComment = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const maxChars = 200;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-secondaryLight hover:bg-secondaryLight/80 py-2">
          <Star className="w-4 h-4 mr-1" />
          Calificar y comentar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Califica tu producto</DialogTitle>
        </DialogHeader>
        {/* Añadimos descripción accesible */}
        <p id="dialog-description" className="text-sm text-gray-500">
          Completa los campos a continuación para calificar y comentar sobre el producto.
        </p>
        <div className="flex flex-col gap-4" aria-describedby="dialog-description">
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => {
                    setRating(star);
                  }}
                  className="hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-8 h-8 ${
                      rating >= star
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-yellow-400"
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              Califica el producto de 1 a 5 estrellas
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <Input
                placeholder="Coloca el título de tu comentario"
                className="w-full"
              />
            </div>
            <div className="relative">
              <Textarea
                placeholder="Coloca la descripción de tu comentario"
                className="min-h-[100px] resize-none"
                maxLength={maxChars}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <span className="absolute bottom-2 right-2 text-xs text-gray-400">
                {maxChars - comment.length} caracteres
              </span>
            </div>
          </div>

          <Button
            className="w-full bg-[#003B7A] hover:bg-[#002D5C]"
            onClick={() => {
              setOpen(false);
              toast.success("Comentario enviado");
            }}
          >
            Enviar comentario
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
