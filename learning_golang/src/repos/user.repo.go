package repos

type User struct {
  Username string `json:"username" binding:"required,alphanum,min=3,max=30"`
  Email    string `json:"email"    binding:"required,email"`
  Age      int    `json:"age"      binding:"required,gte=1,lte=130"`
  ID      int    `json:"id"`
}

func (user *User) FindUserByID() *User{
	result, err := QueryOne[User]("select * from users where id=",user.ID)
	if err != nil {
		
	}
	return result
}