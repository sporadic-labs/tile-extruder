import { Button, OverlayArrow, Tooltip, TooltipTrigger } from "react-aria-components";
import { MdInfoOutline } from "react-icons/md";
import { ReactNode } from "react";
import styles from "./InfoTooltip.module.css";

interface InfoTooltipProps {
  children: ReactNode;
}

export function InfoTooltip({ children }: InfoTooltipProps) {
  return (
    <TooltipTrigger delay={100}>
      <Button className={styles.button}>
        <MdInfoOutline size={18} />
      </Button>
      <Tooltip className={styles.tooltip}>
        <OverlayArrow>
          <svg width={10} height={10} viewBox="0 0 8 8" className={styles.arrow}>
            <path d="M0 0 L4 4 L8 0" />
          </svg>
        </OverlayArrow>
        {children}
      </Tooltip>
    </TooltipTrigger>
  );
}
