const { useState } = require("react")

function useEditableText(initialText, textStyle, editEnabled) {
    const [modalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState(initialText);

    return (
        [
            (
                <>
                    <h1 className={textStyle}>{text}</h1>
                </>
            )
        ]
    )
}

module.exports = {
    useEditableText
}