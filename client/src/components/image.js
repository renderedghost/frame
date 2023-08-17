import React, { useState } from 'react';
import './image.css'; // Import the CSS file

function Image({ src }) {
    const [zoom, setZoom] = useState(1);
    const minZoom = 0.5;
    const maxZoom = 3;

    const handleZoomIn = () => {
        if (zoom < maxZoom) {
            setZoom(zoom * 1.1);
        }
    };

    const handleZoomOut = () => {
        if (zoom > minZoom) {
            setZoom(zoom / 1.1);
        }
    };

    return (
        <div className="image-container" style={{ transform: `scale(${zoom})` }}>
            <img src={src} alt="Artwork" />
            <button onClick={handleZoomIn} aria-label="Zoom In">+</button>
            <button onClick={handleZoomOut} aria-label="Zoom Out">-</button>
        </div>
    );
}

export default Image;