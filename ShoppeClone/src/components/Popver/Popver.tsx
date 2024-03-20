import { useState, useRef, useId, type ElementType } from "react";
import {
  useFloating,
  FloatingPortal,
  arrow,
  shift,
  offset,
  type Placement,
  flip,
  autoUpdate,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  safePolygon,
  FloatingArrow
} from "@floating-ui/react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  children: React.ReactNode;
  renderPopover: React.ReactNode;
  className?: string;
  as?: ElementType;
  initialOpen?: boolean;
  placement?: Placement;
}

export default function Popover({
  children,
  className,
  renderPopover,
  as: Element = "div",
  initialOpen,
  placement = "bottom-end"
}: Props) {
  const [open, setOpen] = useState(initialOpen || false);
  const arrowRef = useRef(null);
  const { refs, middlewareData, context, floatingStyles } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(10), flip(), shift(), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate,
    transform: false,
    placement
  });
  const hover = useHover(context, { handleClose: safePolygon() });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);
  const id = useId();

  return (
    <Element className={className} ref={refs.setReference} {...getReferenceProps()}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={refs.setFloating}
              style={{
                transformOrigin: `${middlewareData.arrow?.x}px top`,
                ...floatingStyles
              }}
              {...getFloatingProps()}
              initial={{ opacity: 0, transform: `scale(0)` }}
              animate={{ opacity: 1, transform: `scale(1)` }}
              exit={{ opacity: 0, transform: `scale(0)` }}
              transition={{ duration: 0.2 }}
            >
              <FloatingArrow
                ref={arrowRef}
                context={context}
                fill='white'
                className='left-1/2'
                width={20}
                height={10}
              />
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  );
}
