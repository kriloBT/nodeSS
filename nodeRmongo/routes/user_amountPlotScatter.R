library(rmongodb);
mongo<-mongo.create();
pipe_a <- mongo.bson.from.JSON('
    {\"$group\":
        {\"_id\":\"$userID\", \"total\": {\"$sum\":\"$amount\"}}
    }');
cmd_lista <- list(pipe_a);
total <- mongo.aggregation(mongo, 'test2.c1', cmd_lista);
#total
#dtotal <- list(0);
ltotal <- mongo.bson.value(total, 'result');
mtotal <- sapply(ltotal, function(x) return( c(x$'_id',x$total)) );
dtotal <- as.data.frame(t(mtotal));
#rownames(dtotal) <- dtotal[1,]
colnames(dtotal) <- c('userID','amount');
#head(dtotal)
#print(class(dtotal));

createDummyPlot <- function () {
    filename <- tempfile('ggplot', fileext = '.png')
	
    #png(filename)
	library(ggplot2);
	ggsave(filename)
	qplot(dtotal$userID,dtotal$amount)
	
	#ggsave(showhist,filename)
    dev.off()

    image <- readBin(filename, 'raw', 150000) #29999
    unlink(filename)

    image
}