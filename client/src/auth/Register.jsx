

function Register(){
    return(
     <form>
        <div>
        <label>First Name</label>
        <input type="name" name="name" required />
        </div>
        <div>
        <label>Last Name</label>
        <input type="name" name="name" required />
        </div>
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