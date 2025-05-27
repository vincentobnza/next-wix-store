import { Loader } from "lucide-react";

import { Button, ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";

type LoadingButtonProps = ButtonProps & {
  isLoading?: boolean;
};

export default function LoadingButton({
  isLoading = false,
  disabled,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      className={cn("flex items-center justify-center", className)}
      {...props}
      disabled={isLoading || disabled}
    >
      {isLoading ? <Loader className="animate-spin" /> : props.children}
    </Button>
  );
}
