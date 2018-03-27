const path = require('path');
const express = require('express');
const app = express();
const Port = 3000;

const publicPath = path.join(__dirname, "../public");

console.log(path.join(__dirname + "/../public"));
console.log(publicPath);

app.use(express.static(publicPath));

// app.get("/", function(req, res){
// 	res.sendFile(publicPath + "/index.html");
// })	


app.listen(Port, () => {
	console.log("App listening on port " + Port);
});