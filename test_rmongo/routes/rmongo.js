var rio = require("rio");
var test = require("rio");
exports.rio = function(req, res){
	options = {
		host : "127.0.0.1",
		port : 6311,
        callback: function (err, val) {
            if (!err) {
            	console.log("RETURN:"+val);
            	return res.send({'success':true,'res':val});
            } else {
            	console.log("ERROR:Rserve call failed")
            	return res.send({'success':false});
            }
        },
    }
    rio.enableDebug(true);//开启调试模式
    rio.evaluate("pi / 2 * 2 * 2",options);//运行R代码
};

exports.test = function(req, res){
	options = {
		host : "127.0.0.1",
		port : 6311,
        callback: function (err, val) {
            if (!err) {
            	console.log("RETURN:"+val);
            	return res.send({'success':true,'res':val});
            } else {
            	console.log("ERROR:Rserve call failed")
            	return res.send({'success':false});
            }
        },
    }
	var rcmd = "";
        rcmd = ""
        +"library(rmongodb);"
        +"mongo<-mongo.create();"
		+"pipe_a <- mongo.bson.from.JSON('{\"$group\":{\"_id\":\"$userID\", \"total\": {\"$sum\":\"$amount\"}}}');"
		+"cmd_lista <- list(pipe_a);"
		+"total <- mongo.aggregation(mongo, 'test2.c1', cmd_lista);"
		+"ltotal <- mongo.bson.value(total, \"result\")"
		+"mtotal <- sapply(ltotal, function(x) return( c(x$'_id',x$total)) )"
		+"dtotal <- as.data.frame(t(mtotal))"
		+"rownames(dtotal) <- dtotal[1,]"
		+"colnames(dtotal) <- c('userID','amount')"
		+"head(dtotal)";

	
    test.enableDebug(true);//开启调试模式
    test.evaluate(rcmd,options);//运行R代码
};