package handlers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"errors"
	"fmt"
)

type Person struct {
    Name     string `json:"name"`
    Address  string `json:"address"`
}

type CreateUserReq struct {
    Name     string `json:"name" binding:"required,min=2,max=50"`
    Email    string `json:"email" binding:"required,email"`
    Age      int    `json:"age" binding:"gte=0,lte=150"`
    Password string `json:"password" binding:"required,min=8"`
}

type CreateUser struct {
  Username string `json:"username" binding:"required,alphanum,min=3,max=30"`
  Email    string `json:"email"    binding:"required,email"`
  Age      int    `json:"age"      binding:"required,gte=1,lte=130"`
}

func User(c *gin.Context) {
	res := make(map[string]string)
	res["msg"] = "i am user from handler"
	// id := c.Param("id") 
	// page := c.DefaultQuery("page", "1")     
	// token := c.GetHeader("Authorization")
	// if val, err := c.Cookie("session_id"); err == nil {
		
	// }
	// var p Person
    // if err := c.ShouldBind(&p); err != nil {
    //     c.JSON(400, gin.H{"error": err.Error()})
    //     return
    // }
	// c.String(200, "Hello, %s", "World")
	// c.File("./files/sample.pdf")
	// c.FileAttachment("./files/report.xlsx", "年度报告.xlsx")
	result := map[string]any{
		"code": 50000, 
		"message": "服务器内部错误",
	}
	c.Error(errors.New("服务器内部错误"))
	c.Error(fmt.Errorf("服务器内部错误v2"))
	c.JSON(http.StatusInternalServerError, result)
	// c.JSON(http.StatusOK, res)
}
