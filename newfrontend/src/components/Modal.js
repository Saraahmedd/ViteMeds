const { Card } = require("@tremor/react")

function Modal({ children, visible, setVisible }) {
    return (
        <div
            style={{
                position: 'absolute',
                width: '100vw',
                height: '100vmax',
                top: 0,
                left: 0,
                background: 'rgba(0,0,0,0.75)',
                zIndex: 49,
                display: visible ? 'block':'none',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    minWidth: '500px',
                    minHeight: '500px',
                    zIndex: 50,
                }}
            >
                <Card className="flex flex-col flex-1 grow">
                    <div className="flex flex-row w-100">
                        <div role="button" onClick={() => setVisible(false)} className="ms-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    {children}
                </Card>
            </div>
        </div>
    )
}

module.exports = {
    Modal
}