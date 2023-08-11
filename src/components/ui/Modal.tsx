"use client";
import { cn } from "@/lib/utils";
import React, { FC, ReactNode, useMemo, useState } from "react";
import Button from "./Button";
import { X, Minus } from "lucide-react";

type IconAction = {
  id: number;
  content: ReactNode;
  color: string;
  bg: string;
  action: () => void;
};

interface ModalProps {
  mode?: "MacOs" | "Window";
  label?: string;
  children?: ReactNode;
  className?: any;
  hiddenButton?: boolean;
  onChange?: () => void;
  open?: boolean;
  width?: number;
  height?: number;
}

const Modal: FC<ModalProps> = ({
  mode = "MacOs",
  label = "Open Modal",
  children,
  className,
  hiddenButton = false,
  onChange,
  open = false,
  width,
  height,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(open);

  const iconAction: IconAction[] = [
    {
      id: 1,
      content: <X width={14} height={14} />,
      color: "",
      bg: "bg-red-500",
      action: () => {
        setIsOpen(!isOpen);
      },
    },
    {
      id: 2,
      content: <Minus width={24} height={24} />,
      color: "",
      bg: "bg-yellow-500",
      action: () => {},
    },
  ];

  const w = useMemo(() => {
    if (width) {
      return width;
    }
    return 400;
  }, [width]);

  const h = useMemo(() => {
    if (height) {
      return height;
    }
    return 600;
  }, [height]);

  return (
    <div className="z-20">
      {!hiddenButton ? (
        <Button type="button" onClick={() => setIsOpen(true)}>
          {label}
        </Button>
      ) : null}
      {isOpen ? (
        <div className="fixed top-0 left-0 h-screen w-screen bg-[rgba(0,0,0,0.6)] flex items-center justify-center">
          <div
            className={`w-[${w}px] h-[${h}px] p-5 rounded-md bg-white shadow`}
          >
            <div
              className={cn(
                `${mode === "Window" ? "justify-end" : ""}`,
                "flex items-center space-x-1 mb-2 pb-5 border-b border-b-gray-900"
              )}
            >
              {iconAction.map((item: IconAction) => (
                <p
                  key={item.id}
                  className={cn(
                    `${item.bg} ${item.color}`,
                    "w-6 h-6 text-[10px] rounded-full text-center flex items-center justify-center font-semibold cursor-pointer text-white"
                  )}
                  onClick={item.action}
                >
                  <span>{item.content}</span>
                </p>
              ))}
            </div>
            <div>{children}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Modal;
