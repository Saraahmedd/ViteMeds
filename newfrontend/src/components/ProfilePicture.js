"use client"
export default function ProfilePicture({ src, size }) {
    return (
        <img
            src={src}
            style={{height: `${size}px`, width: `${size}px`, borderRadius: `${size/2}px`}}
        />
    );
}