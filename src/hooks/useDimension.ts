import { useEffect, useState } from "react";

interface Dimensions {
    width: number | undefined;
    height: number | undefined;
}

export default function useDimension() {
    const [dimensions, setDimensions] = useState<Dimensions>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    function resize() {
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        resize();

        window.addEventListener("resize", resize);

        return () => window.removeEventListener("resize", resize);
    }, []);

    return dimensions;
}
