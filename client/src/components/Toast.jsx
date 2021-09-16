const Toast = (props) => {

    return (
        <div className="position-fixed bottom-0 end-0 p-3" style={{zIndex: 11}}>
            <div id="liveToast" className={!!props.showToast ? "toast show" : "toast"} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <strong className="me-auto">{props.tostHeader}</strong>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => props.handleCloseToast()}></button>
                </div>
                <div className="toast-body">
                    {props.tostBody}
                </div>
            </div>
        </div>

    )
}

export default Toast