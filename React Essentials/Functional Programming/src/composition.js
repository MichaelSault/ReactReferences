export const Button = ({size, color, text, ...props}) => {
    return (
        <button style={{
            padding: size === 'large' ? '32px' : '8px',
            fontSize: size === 'large' ? '32px' : '16px',
            backgroundColor: color,
        }} {...props}>{text}</button>
    );
}

//we can create different versions of the button by creating componentents that use them
export const DangerButton = props => {
    return (
        <Button {...props} color="red" />
    )
}

export const BigSuccessButton = props => {
    return (
        <Button {...props} size="large" color="green" />
    )
}

