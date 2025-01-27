import * as React from "react";
import { cn } from "@/utils/utils";



const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ className, ...props }, ref) => {
        const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

        // Функція для автоматичного зміни висоти
        const autoResize = () => {
            if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
                textareaRef.current.style.height = `${textareaRef.current.scrollHeight+40}px`;
            }
        };

        React.useEffect(() => {
            autoResize();
        }, []);

        return (
            <textarea
                className={cn(
                    "resize-y overflow-hidden w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                ref={(el) => {
                    textareaRef.current = el;
                    if (typeof ref === "function") {
                        ref(el);
                    } else if (ref) {
                        ref.current = el;
                    }
                }}
                onInput={autoResize} // Виклик функції під час вводу
                {...props}
            />
        );
    }
);

Textarea.displayName = "Textarea";

export { Textarea };
