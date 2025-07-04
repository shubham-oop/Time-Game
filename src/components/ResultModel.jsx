import { useRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
export default function ResultModel({ ref, remainingTime, targetTime, onReset }) {
    const dialog = useRef();
    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        };
    });

    return createPortal(<dialog ref={dialog} className="result-modal" onClose={onReset}>
        {userLost && <h2>You Lost</h2>}
        {!userLost && <h2> Your score: {score}</h2>}
        <p>
            The Target time was <strong>{targetTime} seconds.</strong>
        </p>
        <p>
            You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong>
        </p>
        <form mathod="dialog" submit={onReset}>
            <button>Close</button>
        </form>
    </dialog>, document.getElementById('modal'));
}