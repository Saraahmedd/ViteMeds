"use client"
const { Button } = require("./Button");

function Card ({ title, subtitle, text, className, image = "", buttonText = "", headerText = "", onClick, onClickButton, children, buttonClass= "" }) {

    return (
        <>
            <div onClick={onClick} className={`card global-text shadow border-0 ${onClick ? 'hover-button' : ''} ${className}`} role={onClick ? "button" : ""}>
                <div className="bg-primary px-2 rounded"></div>
                {image}
                {headerText && <div className="card-header">{headerText}</div>}
                <div className="card-body">
                    {title && <h5 className="text-primary" style={{ fontWeight: 'bold' , fontSize: '30px'}}>{title}</h5>}
                    <hr />
                    {subtitle && <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>}
                    {text && <h8 className="card-text">{text}</h8>}
                    {children}
                    {buttonText && <Button onClick={onClickButton} text={buttonText} variant="md" className={`ms-auto ${buttonClass}`} />}
                </div>
            </div>
        </>
    )
}

module.exports = {
    Card
}