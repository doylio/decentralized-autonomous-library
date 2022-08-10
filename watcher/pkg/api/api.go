package api

import (
	"net/http"
	"watcher/pkg/listener"

	"github.com/gin-gonic/gin"
)

var s *listener.State

func getRequestCreated(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	s.Lock.Lock()
	c.IndentedJSON(http.StatusOK, s.RequestsCreated)
	s.Lock.Unlock()
}

func getRentalCreated(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	s.Lock.Lock()
	c.IndentedJSON(http.StatusOK, s.RentalsCreated)
	s.Lock.Unlock()
}

func getRentalAccepted(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	s.Lock.Lock()
	c.IndentedJSON(http.StatusOK, s.RentalsAccepted)
	s.Lock.Unlock()
}

func StartAPI(state *listener.State) {
	s = state

	router := gin.Default()
	router.GET("/RequestCreated", getRequestCreated)
	router.GET("/RentalCreated", getRentalCreated)
	router.GET("/RentalAccepted", getRentalAccepted)

	router.Run("localhost:9000")
}
