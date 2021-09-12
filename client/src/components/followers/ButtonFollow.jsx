const ButtonFollow = (props) => {
    
    return (        
        <button type="button"
            className={!!props.userSubscribed ? "btn btn-danger" : "btn btn-dark"}>
            {!!props.userSubscribed ? "Unfollow" : "Follow"}    
        </button>
    )
}

export default ButtonFollow