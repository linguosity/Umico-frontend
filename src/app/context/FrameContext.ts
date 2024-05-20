import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Frame } from '../types/frames'; // Assuming you have a shared types file

interface FrameContextProps {
    frameOrders: Frame[];
    setFrameOrders: (frames: Frame[]) => void;
}

const FrameContext = createContext<FrameContextProps | undefined>(undefined);

export const FrameProvider = ({ children }: { children: ReactNode }) => {
    const [frameOrders, setFrameOrders] = useState<Frame[]>([]);

    return (
        <FrameContext.Provider value={{ frameOrders, setFrameOrders }}>
            {children}
        </FrameContext.Provider>
    );
};

export const useFrameContext = () => {
    const context = useContext(FrameContext);
    if (!context) {
        throw new Error('useFrameContext must be used within a FrameProvider');
    }
    return context;
};