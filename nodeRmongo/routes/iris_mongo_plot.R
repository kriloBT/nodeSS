#connect mongo
require('RJSONIO');
library(rmongodb);
mongo <- mongo.create();

#load data
#data(iris)
#head(iris)

#insert2mongo (fail due to num 2 string)
#colnames(iris)[1:4]<-list("slength","swidth","plength","pwidth")
#irislist<-list()
#irislist<-apply(iris,1,function(x) c(irislist,x))
#irisinput <-lapply(irislist,function(x) mongo.bson.from.list(x))
#irisout <- mongo.insert.batch(mongo,"rmongodb.iris",irisinput)

#load from mongo
cursor <-mongo.find(mongo,"rmongodb.iris",query='{}');
res<-NULL;
while(mongo.cursor.next(cursor)){
	value <-mongo.cursor.value(cursor)
#print(value)
	tmp <- mongo.bson.to.list(value)
#print(tmp)
	res <-rbind(res,tmp)
}
err <- mongo.cursor.destroy(cursor);

#head(res)
#class(res)

createDummyPlot <- function (obj) {
    filename <- tempfile('testPlot', fileext = '.png')
	
    png(filename)
	
	#####plot here
	src = fromJSON(obj)
    plot(res[,4],res[,5],xlab=src['xlab'],ylab=src['ylab'])
    dev.off()

    image <- readBin(filename, 'raw', 29999)
    unlink(filename)

    image
}
