const Cell = (props) => {
    return(
        <>
            <button disabled={(props.children !== null)? true: false}>{props.children}</button>
        </>
    );
}

export default Cell;