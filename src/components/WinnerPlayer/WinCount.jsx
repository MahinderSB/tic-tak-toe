const WinnerPlayer = (props) => {
    return(
        <>
            <div className="winCount">
                <div className="col-50">
                    <p>X win's</p>
                    <p>{props.count.x}</p>
                </div>
                <div className="col-50">
                    <p>Y win's</p>
                    <p>{props.count.o}</p>
                </div>
            </div>
        </>
    );
}

export default WinnerPlayer;