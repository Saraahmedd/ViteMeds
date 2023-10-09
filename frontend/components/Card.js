const { Button } = require("./Button");

function Card ({ title, subtitle, text, image = "", buttonText = "", headerText = "", onClick, onClickButton, children }) {

    return (
        <>
            <div className={`card ${onClick ? 'hover-button' : ''}`} role={onClick ? "button" : ""}>
                {image && <Image className="card-img-top" src={image} />}
                {headerText && <div className="card-header">{headerText}</div>}
                <div className="card-body">
                    {title && <h5 className="card-title">{title}</h5>}
                    {subtitle && <h6 className="card-subtitle mb-2 text-muted">{subtitle}</h6>}
                    {text && <p className="card-text">{text}</p>}
                    {children}
                    {buttonText && <Button onClick={onClickButton} text={buttonText} variant="md" />}
                </div>
            </div>
        </>
    )
}

module.exports = {
    Card
}