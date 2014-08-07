library(rmongodb);
mongo<-mongo.create();
pipe_a <- mongo.bson.from.JSON('
    {\"$group\":
        {\"_id\":\"$userID\", \"total\": {\"$sum\":\"$amount\"}}
    }');
cmd_lista <- list(pipe_a);
total <- mongo.aggregation(mongo, 'test2.c1', cmd_lista);
#total

ltotal <- mongo.bson.value(total, 'result');
mtotal <- sapply(ltotal, function(x) return( c(x$'_id',x$total)) );
dtotal <- as.data.frame(t(mtotal));
#rownames(dtotal) <- dtotal[1,]
colnames(dtotal) <- c('userID','amount');
#head(dtotal)
#print(class(dtotal));

library(ggplot2);
ggplot(dtotal, aes(userID, amount, fill = amount)) +
  guides(fill= FALSE) +
  geom_bar(stat = 'identity', colour = 'white') +
  xlab('userID') + ylab('total amount');