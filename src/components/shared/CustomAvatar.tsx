import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const CustomAvatar = ({
  src,
  alt,
  fallback,
  className,
}: {
  src: string;
  alt: string;
  fallback: string;
  className?: string;
}) => {
  return (
    <Avatar
      className={cn(
        "size-[45px] border border-[2px] border-orange-600",
        className
      )}
    >
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default CustomAvatar;
