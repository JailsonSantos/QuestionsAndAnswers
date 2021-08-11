import { ButtonHTMLAttributes } from 'react';

import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutLined?: boolean
};

// Desestruturação de componente, e o restante dos elementos fica em ...props
export function Button({isOutLined = false, ...props}: ButtonProps) {
    return (
        <button 
        className={`button ${isOutLined ? 'outLined' : ''}`}
        {...props} />

    )
}