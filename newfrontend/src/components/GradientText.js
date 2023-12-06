import '../../public/styles.css';
export default function GradientText({ wclass, text }) {
    return (
        <h1 className={`${wclass} word-animation font-bold tracking-[-0.075em]`}>
            {text}&nbsp;
        </h1>
    )
};