

function Register(){
    return(
     <form>
        <div>
        <label>First Name</label>
        <input type="text" name="first_name" required />
        </div>
        <div>
        <label>Last Name</label>
        <input type="text" name="last_name" required />
        </div>
        <div>
        <label>Username</label>
        <input type="text" name="username" required />
        </div>
        <div>
            <label>Password</label>
            <input type="password" name="password" required />
            <button type="submit">Register</button>
        </div>
     </form>   
    )

}

export default Register;