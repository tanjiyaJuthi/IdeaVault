"use client";

import { createContext, useContext, useState } from "react";

const DialogContext = createContext();

export function Dialog({ children, open: controlledOpen, onOpenChange }) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  const open = controlledOpen ?? uncontrolledOpen;

  const setOpen = (value) => {
    if (onOpenChange) onOpenChange(value);
    setUncontrolledOpen(value);
  };

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ asChild, children }) {
  const { setOpen } = useContext(DialogContext);

  if (asChild) {
    return (
      <span onClick={() => setOpen(true)} style={{ display: "inline-block" }}>
        {children}
      </span>
    );
  }

  return <button onClick={() => setOpen(true)}>{children}</button>;
}

export function DialogContent({ children }) {
  const { open, setOpen } = useContext(DialogContext);

  if (!open) return null;

  return (
    <div style={styles.overlay} onClick={() => setOpen(false)}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ children }) {
  return <div style={{ marginBottom: 10 }}>{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 style={{ fontSize: 20, fontWeight: 600 }}>{children}</h2>;
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  modal: {
    background: "white",
    padding: 20,
    borderRadius: 12,
    width: "90%",
    maxWidth: 900,
    maxHeight: "90vh",
    overflowY: "auto",
  },
};

export function DialogFooter({ children }) {
  return (
    <div
      style={{
        marginTop: 20,
        display: "flex",
        justifyContent: "flex-end",
        gap: 10,
      }}
    >
      {children}
    </div>
  );
}


export function DialogDescription({ children }) {
  return (
    <p style={{ marginTop: 5, fontSize: 14, color: "#555" }}>
      {children}
    </p>
  );
}