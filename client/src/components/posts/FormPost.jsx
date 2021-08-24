const FormPost = () => {
    return (
        <div className="form__wrapper col-md-7 offset-2">
            <form>
                <div className="col-md-12" style={{padding: '0'}}>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div className="col-12 form__control">
                    <button type="submit" className="btn btn-outline-dark">Post</button>
                </div>
            </form>
        </div>
    )
}

export default FormPost