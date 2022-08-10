package ILS

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

// album represents data about a record album.
type book struct {
	ID           string `json:"id"`
	Location     string `json:"location"`
	Status_codes string `json:"status_codes"`
	Barcode      string `json:"barcode"`
	Title        string `json:"title"`
	Author       string `json:"author"`
}

var books = map[string]book{}

func loadBooks() error {
	jsonFile, e := os.Open("books.json")
	if e != nil {
		return e
	}
	defer jsonFile.Close()

	byteValue, e := ioutil.ReadAll(jsonFile)
	if e != nil {
		return e
	}

	json.Unmarshal(byteValue, &books)

	return nil
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
	books[newBook.ID] = newBook
	c.IndentedJSON(http.StatusCreated, newBook)
}

func getBookByID(c *gin.Context) {
	id := c.Param("id")

	// Loop over the list of books looking for
	// a book whose ID value matches the parameter
	for i, b := range books {
		if i == id {
			c.IndentedJSON(http.StatusOK, b)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "book not found"})
}

func getBookByAuther(c *gin.Context) {
	author := c.Param("author")

	// Loop over the list of books looking for
	// a book whose ID value matches the parameter
	for _, b := range books {
		if b.Author == author {
			c.IndentedJSON(http.StatusOK, b)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "book not found"})
}

func getBookByBarcode(c *gin.Context) {
	barcode := c.Param("barcode")

	// Loop over the list of books looking for
	// a book whose ID value matches the parameter
	for _, b := range books {
		if b.Barcode == barcode {
			c.IndentedJSON(http.StatusOK, b)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "book not found"})
}

func StartAPI() {
	e := loadBooks()
	if e != nil {
		log.Fatal(e)
	}

	router := gin.Default()
	router.GET("/books", GetBooks)
	router.GET("/bookByID/:id", getBookByID)
	router.GET("/bookByAuthor/:author", getBookByAuther)
	router.GET("/bookByBarcode/:barcode", getBookByBarcode)
	router.POST("/books", PostBook)

	router.Run("localhost:8080")
}
