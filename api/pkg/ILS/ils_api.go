package ILS

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// album represents data about a record album.
type book struct {
	ID      string `json:"id"` // "id": "1000057"
	Barcode string `json:"barcode"`
	Title   string `json:"title"`
}

var books = []book{
	{ID: "1000000", Barcode: "11111111111111", Title: "Alice in Wonderland"},
	{ID: "2000000", Barcode: "22222222222222", Title: "Moby Dick"},
	{ID: "3000000", Barcode: "33333333333333", Title: "Frankenstein"},
}

// GetBooks responds with the list of all books as json
func GetBooks(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, books)
}

// postBook adds a book from JSON received in the request body
func PostBook(c *gin.Context) {
	var newBook book

	// Call BindJSON to bind the recieved json to newBook
	if err := c.BindJSON(&newBook); err != nil {
		return
	}

	// Add the new book to the slice
	books = append(books, newBook)
	c.IndentedJSON(http.StatusCreated, newBook)
}

func getBookByID(c *gin.Context) {
	id := c.Param("id")

	// Loop over the list of books looking for
	// a book whose ID value matches the parameter
	for _, b := range books {
		if b.ID == id {
			c.IndentedJSON(http.StatusOK, b)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "book not found"})
}

func StartAPI() {
	router := gin.Default()
	router.GET("/books", GetBooks)
	router.GET("/books/:id", getBookByID)
	router.POST("/books", PostBook)

	router.Run("localhost:420")
}
