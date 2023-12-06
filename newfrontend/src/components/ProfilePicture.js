"use client"
export default function ProfilePicture({ src, size }) {
    return (
        <img
            src={src}
            style={{height: size, width: size, borderRadius: `${size/2}px`}}
        />
    );
}