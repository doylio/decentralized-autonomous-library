package ILS

import (
	"encoding/json"
	"fmt"
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

// var books = map[string]book{}

func loadBooks(fname string) (map[string]book, error) {
	books := make(map[string]book)
	jsonFile, e := os.Open(fname)
	if e != nil {
		return nil, e
	}
	defer jsonFile.Close()

	byteValue, e := ioutil.ReadAll(jsonFile)
	if e != nil {
		return nil, e
	}

	json.Unmarshal(byteValue, &books)

	return books, nil
}

// GetBooks responds with the list of all books as json
// func GetBooks(c *gin.Context) {
// 	c.Header("Access-Control-Allow-Origin", "*")
// 	c.IndentedJSON(http.StatusOK, books)
// }

func GetBooks(books map[string]book) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.IndentedJSON(http.StatusOK, books)
	}

	return gin.HandlerFunc(fn)
}

func getBookByID(books map[string]book) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		id := c.Param("id")

		// Loop over the list of books looking for
		// a book whose ID value matches the parameter
		for i, b := range books {
			if i == id {
				c.IndentedJSON(http.StatusOK, b)
				return
			}
		}
		c.Header("Access-Control-Allow-Origin", "*")
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "book not found"})
	}
	return fn
}

// postBook adds a book from JSON received in the request body
func postBook(books map[string]book) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var b = c.Param("book")
		fmt.Println(b)
		newBook := book{}
		x, _ := ioutil.ReadAll(c.Request.Body)
		fmt.Println("X: ", x)
		json.Unmarshal(x, &newBook)
		fmt.Println(newBook)
		// Call BindJSON to bind the recieved json to newBook

		// Add the new book to the slice
		books[newBook.ID] = newBook
		c.Header("Access-Control-Allow-Origin", "*")
		c.IndentedJSON(http.StatusCreated, newBook)
	}
	return fn
}

// func getBookByAuther(c *gin.Context) {
// 	author := c.Param("author")

// 	// Loop over the list of books looking for
// 	// a book whose ID value matches the parameter
// 	for _, b := range books {
// 		if b.Author == author {
// 			c.Header("Access-Control-Allow-Origin", "*")
// 			c.IndentedJSON(http.StatusOK, b)
// 			return
// 		}
// 	}
// 	c.Header("Access-Control-Allow-Origin", "*")
// 	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "book not found"})
// }

// func getBookByBarcode(c *gin.Context) {
// 	barcode := c.Param("barcode")

// 	// Loop over the list of books looking for
// 	// a book whose ID value matches the parameter
// 	for _, b := range books {
// 		if b.Barcode == barcode {
// 			c.Header("Access-Control-Allow-Origin", "*")
// 			c.IndentedJSON(http.StatusOK, b)
// 			return
// 		}
// 	}
// 	c.Header("Access-Control-Allow-Origin", "*")
// 	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "book not found"})
// }

func StartAPI(port string, fname string) {
	books, e := loadBooks(fname)
	if e != nil {
		log.Fatal(e)
	}

	router := gin.Default()
	router.GET("/books", GetBooks(books))
	router.GET("/bookByID/:id", getBookByID(books))
	// router.GET("/bookByAuthor/:author", getBookByAuther)
	// router.GET("/bookByBarcode/:barcode", getBookByBarcode)
	router.POST("/postBook", postBook(books))

	go router.Run("localhost:" + port)
}
