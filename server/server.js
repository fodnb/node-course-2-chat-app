const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, "../public");

console.log(path.join(__dirname + "/../public"));
console.log(publicPath);

app.use(express.static(publicPath));

// app.get("/", function(req, res){
// 	res.sendFile(publicPath + "/index.html");
// })	


app.listen(port, () => {
	console.log("App listening on port " + port);
});