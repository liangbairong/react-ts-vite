import { useState, useCallback } from 'react';

export default function useToggle(defaultShow?: boolean) {
    const [open, setOpen] = useState<boolean>(defaultShow || false);
    const onToggle = useCallback(() => {
        setOpen(!open);
    }, [open, setOpen]);

    return {
        show: open,
        onToggle,
    };
}
