import classes from "./Button.module.css";

function ButtonCircle(props: any) {
    const styles = props.favoriteOrAdded && classes['button-circle-checked'];

    return (
        <button className={classes.button + ' ' + classes['button-outlined'] + ' ' + classes['button-circle'] + ' ' + styles} {...props}>{props.children}</button>
    )
}

export default ButtonCircle;