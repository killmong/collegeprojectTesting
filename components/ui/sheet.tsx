"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = (props: React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (overlayRef.current) {
      console.log("Overlay mounted:", overlayRef.current);
    }
  }, []);

  return (
    <SheetPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        props.className
      )}
      {...props}
      ref={(node) => {
        overlayRef.current = node;
      }}
    />
  );
};

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = ({ side = "right", className, children, ...props }: SheetContentProps) => {
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (contentRef.current) {
      console.log("Content mounted:", contentRef.current);
    }
  }, []);

  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        className={cn(sheetVariants({ side }), className)}
        {...props}
        ref={(node) => {
          contentRef.current = node;
        }}
      >
        {children}
        <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
};

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = (props: React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>) => {
  const titleRef = React.useRef<HTMLHeadingElement | null>(null);

  React.useEffect(() => {
    if (titleRef.current) {
      console.log("Title mounted:", titleRef.current);
    }
  }, []);

  return (
    <SheetPrimitive.Title
      className={cn("text-lg font-semibold text-foreground", props.className)}
      {...props}
      ref={(node) => {
        titleRef.current = node;
      }}
    />
  );
};

const SheetDescription = (props: React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>) => {
  const descriptionRef = React.useRef<HTMLParagraphElement | null>(null);

  React.useEffect(() => {
    if (descriptionRef.current) {
      console.log("Description mounted:", descriptionRef.current);
    }
  }, []);

  return (
    <SheetPrimitive.Description
      className={cn("text-sm text-muted-foreground", props.className)}
      {...props}
      ref={(node) => {
        descriptionRef.current = node;
      }}
    />
  );
};

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
