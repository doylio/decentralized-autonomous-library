package api

import (
	"net/http"
	"watcher/pkg/listener"

	"github.com/gin-gonic/gin"
)

func getRequestCreated(s *listener.State) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		s.Lock.Lock()
		c.IndentedJSON(http.StatusOK, s.RequestsCreated)
		s.Lock.Unlock()
	}
	return fn

}

func getRentalCreated(s *listener.State) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		s.Lock.Lock()
		c.IndentedJSON(http.StatusOK, s.RentalsCreated)
		s.Lock.Unlock()
	}
	return fn
}

func getRentalAccepted(s *listener.State) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		s.Lock.Lock()
		c.IndentedJSON(http.StatusOK, s.RentalsAccepted)
		s.Lock.Unlock()
	}
	return fn
}

func StartAPI(state *listener.State, port string) {

	router := gin.Default()
	router.GET("/RequestCreated", getRequestCreated(state))
	router.GET("/RentalCreated", getRentalCreated(state))
	router.GET("/RentalAccepted", getRentalAccepted(state))

	router.Run("localhost:" + port)
}
