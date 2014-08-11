test_rmongo
-----


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
```bash
> cd C:\Users\name\Documents\R\win-library\3.1\Rserve\libs\i386>R
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
 
 [http://localhost:8000/Rmongo/showPlot?filename=test2Plot.png](http://localhost:8000/Rmongo/showPlot?filename=test2Plot.png)
 
 
## R 環境設定  R enviroment settings

```R
#Rserve part
install.packages("Rserve")

#mongo part
install.packages("jsonlite")
install.packages("plyr")
install.packages("rmongodb")

#plot graph
install.packages("digest")
install.packages("ggplot2")
```
 
