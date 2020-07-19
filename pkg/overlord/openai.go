package overlord

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
)

const openai_key = "sk-Bzujd4h5zZqvLvzs5jH3YOseEfLIEJW6HR1AOGeO"

func createCompletion() {

	const url = "https://api.openai.com/v1/engines/davinci/completions"

	var bearer = "Bearer " + openai_key

	requestBody, err := json.Marshal(map[string]interface{}{
		"prompt":     "once upon a time",
		"max_tokens": 5,
	})

	if err != nil {
		log.Fatal(err)
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(requestBody))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Add("Authorization", bearer)

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
