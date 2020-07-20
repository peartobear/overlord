package overlord

const (
	//messagehello is used to first connect and request auth
	msgHello = iota

	//messagetext is used for normal user text messages
	msgText

	//messageAuth represents an attempt to authenticate with a token

	msgAuth

	// msgAuthAck is sent by the server to approve authentication attempt

	msgAuthAck

	// msgAuthRst is sent by the server to reject authentication attemp

	msgAuthRst

	// msgMayNotEnter is sent by the server to reject entry attempt, usually
	// means the username is taken

	msgMayNotEnter
)

// Message represents any atomic communication between overlord client and server

type Message struct {
	Type int `json:"type"`
	// User User `json:"user"`
	// Text String `json:"text"`
}
