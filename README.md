# webcam 
Basic WebRTC to control local webcam

## example

tbc

## usage

1) Copy repository

	git clone https://github.com/kevindurley/webcam.git

2) Get all the required packages

	npm install

3) Run the application locally

	node app

4) Browse to see it 'in action'

	http://localhost:3200

5) 'take picture' will take a picture and show the stream value below the webcam stream. the image data is then posted to /photo and the image will be stored in the static/grabs folder. the stored image will then be displayed alongside the stream grab.

6) 'start|stop' will take a picture every second. 'sort' of' stop motion style. 
