

function Register(){
    return(
     <form>
        <div>
        <label>Username</label>
        <input type="username" name="username" required />
        </div>
        <div>
            <label>Password</label>
            <input type="password" name="password" required />
        </div>
     </form>   
    )

}

export default Register;