import { useEffect, useRef } from 'react';
import { CanvAscii } from './ascii-utils';

const ASCIIText = ({
    text = "David!",
    asciiFontSize = 8,
    textFontSize = 200,
    textColor = "#fdf9f3",
    planeBaseHeight = 8,
    enableWaves = true,
    className,
    ...props
}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const curr = { instance: null };

        const run = async () => {
            const inst = new CanvAscii({
                text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves
            }, container, container.clientWidth, container.clientHeight);
            await inst.init();
            inst.load();
            curr.instance = inst;
        };
        run();

        const observer = new ResizeObserver(() => {
            if (curr.instance) {
                curr.instance.setSize(container.clientWidth, container.clientHeight);
            }
        });
        observer.observe(container);

        return () => {
            observer.disconnect();
            if (curr.instance) curr.instance.dispose();
        };
    }, [text, asciiFontSize, textFontSize, textColor, planeBaseHeight, enableWaves]);

    return (
        <div
            ref={containerRef}
            className={`ascii-text-container ${className || ''}`}
            style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}
            {...props}
        />
    );
};

export default ASCIIText;
