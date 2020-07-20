package overlord

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
)

const apiKey = "veYBGGjmCc6nULMKnBBN8hz4HtqlgogP"

// get a gif through giphy translate secret sauce API

func GetGiphy() {

	const url = "https://api.giphy.com/v1/gifs/translate" + "?api_key=" + apiKey
	requestBody, err := json.Marshal(map[string]string{
		"s": "terminator",
	})
	if err != nil {
		log.Fatal(err)
	}

	req, err := http.NewRequest("GET", url, bytes.NewBuffer(requestBody))
	req.Header.Set("Content-Type", "application/json")
	if err != nil {
		log.Fatal(err)
	}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Println("Error on response \n[ERROR] -", err)
	}

	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		log.Fatal(err)
	}

	log.Println(string(body))

}
