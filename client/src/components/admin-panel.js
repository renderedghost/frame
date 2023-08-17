import React from 'react';

function AdminPanel({ images, onDelete }) {
    return (
        <div>
            {images.map((image) => (
                <div key={image._id}>
                    <img src={image.s3Url} alt="Artwork" />
                    <button onClick={() => onDelete(image._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}
