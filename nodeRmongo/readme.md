test_rmongo
-----

### R 安裝設定  R environment settings

```R
#Rserve part
install.packages("Rserve")

#mongo part
install.packages("RJSONIO")
install.packages("jsonlite")
install.packages("plyr")
install.packages("rmongodb")

#plot graph
install.packages("digest")
install.packages("ggplot2")
```

### mongodb 準備資料 (prepare data)
user_amount
```bash
> cd "c:/Users/name/Desktop/nodeRmongo"
> mongo localhost:27017/test2 "./data/data.js"
```
iris
```bash
> mongoimport -d rmongodb -c iris --type csv --file "./data/iris.csv" --headerline
```
check exists
```bash
> mongod
> use test2
> show collections
c2
> use rmongodb
> show collections
iris
```

# 
# run 以下為執行區
### mongo @2.6.1

windows
```bash
> mongod
```

linux
```bash
> sudo service mongod start
```

### R @3.1

windows
note:`name` should replace to your username
```bash
> cd "C:/Users/name/Documents/R/win-library/3.1/Rserve/libs/i386"
> R CMD Rserve
```

linux
```bash
> R CMD Rserve
> sudo netstat -ntlp|grep Rserve
```

### node @0.10.28

```bash
> npm install
> node app
```


### browse

 [http://localhost:8000/rmongo/hist](http://localhost:8000/rmongo/hist)
 
 [http://localhost:8000/rmongo/showHist](http://localhost:8000/rmongo/showHist)
 
 [http://localhost:8000/Rmongo/plot?Rscript=/iris_mongo_plot.R&pngFilename=test2Plot.png](http://localhost:8000/Rmongo/plot?Rscript=/iris_mongo_plot.R&pngFilename=test2Plot.png)
 
 ```bash
 GET /Rmongo/plot?Rscript=/iris_mongo_plot.R&pngFilename=test2Plot.png 200 4ms
 save: C:\Users\name\Desktop\nodeRmongo\routestest2Plot.png
 ```
 
 [http://localhost:8000/Rmongo/showPlot?filename=test2Plot.png](http://localhost:8000/Rmongo/showPlot?filename=test2Plot.png)
 
 ```bash
load: test3Plot.png
GET /Rmongo/showPlot?filename=test2Plot.png 200 5ms
 ```
 
# function explanation 使用程式碼
### ./routes/Rmongo.js

```js
	var args = {
		db:'rmongodb',
		collection:'iris',
		xdata:'plen',
		ydata:'pwid',
		xlab:'Petal.length',
		ylab:'petal.width1'
	};
```
```js
    rio.sourceAndEval(__dirname + RscriptFilename, {
        entryPoint: RscriptEntryPnt,
		data: args,
        callback: function (err, res) {
			if (!err) {
				fs.writeFile(pngFilename, res, { encoding: "binary" }, function (err) {
					if (!err) 
						console.log("save: " + __dirname + pngFilename);
				});
			} else {
				console.log("Loading image failed");
			}
		}
    });
```
```js
exports.showPlot = function (req, res) {
	var pngFilename = req.query.filename;	//?filename=testPlot.png	//var pngFilename = "testPlot.png"; 
	fs.readFile(pngFilename, res, "binary", function (err, file) {
		if (!err) {
			console.log("load: "+pngFilename);
			res.writeHead(200, { "Content-Type" : "image/png" });
			res.write(file, "binary");
			res.end();
		} else {}
	})
};
```
