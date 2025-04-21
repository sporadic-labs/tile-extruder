import { Button, OverlayArrow, Tooltip, TooltipTrigger } from "react-aria-components";
import { MdInfoOutline } from "react-icons/md";
import { ReactNode } from "react";

interface InfoTooltipProps {
  children: ReactNode;
}

export function InfoTooltip({ children }: InfoTooltipProps) {
  return (
    <TooltipTrigger delay={100}>
      <Button className="text-gray-700 hover:text-gray-900">
        <MdInfoOutline className="h-4 w-4" />
      </Button>
      <Tooltip className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-xs">
        <OverlayArrow>
          <svg width={8} height={8} viewBox="0 0 8 8">
            <path d="M0 0 L4 4 L8 0" fill="white" />
          </svg>
        </OverlayArrow>
        {children}
      </Tooltip>
    </TooltipTrigger>
  );
}
