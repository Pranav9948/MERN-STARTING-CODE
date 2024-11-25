import React, { useMemo } from "react";
import { Rect, Svg } from "@react-pdf/renderer";
import { getMatrix } from "qr-code-generator-lib";

const QR = ({ url, level = "H", width = 64, foreground = "#000", background = "#fff" }) => {
  const EcLevels = { L: 0, M: 1, Q: 2, H: 3 };

  // Generate the QR code matrix
  const matrix = useMemo(() => getMatrix(url), [url]);

  // Calculate the scaling factor for the QR code
  const factor = useMemo(() => width / matrix.length, [matrix, width]);

  return (
    <Svg width={width} height={width} viewBox={`0 0 ${width} ${width}`}>
      {matrix.map((row, x) =>
        row.map((cell, y) => (
          <Rect
            key={`${x}-${y}`}
            x={x * factor}
            y={y * factor}
            width={1 * factor}
            height={1 * factor}
            fill={cell ? foreground : background}
          />
        ))
      )}
    </Svg>
  );
};

export default QR;
