import { useState } from "react";
import "./Box.css"
import Link from 'next/link'
const Box = ({head,dest,link}) => {
    const [isHovered, setIsHovered] =  useState(false);
    

    const handleHover = () => {
        setIsHovered(!isHovered);
    };
    const handleExploreClick = () => {
        
    };
    const linkStyle = {
        
        textDecoration: 'none',
      };
    
    return (
        <div
          className={`boxa ${isHovered ? 'hovered' : ''}`}
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
        
        >
          <h3 className={`hea ${isHovered ? 'hea-hovered' : ''}`}>{head}</h3>
          {link && <Link href={link} style={linkStyle}
          className="box-button">View</Link>}
        </div>
      );
};

export default Box;