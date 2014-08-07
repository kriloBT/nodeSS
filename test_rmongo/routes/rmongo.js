//### start Rserve ###
//cd C:\Users\liyu\Documents\R\win-library\3.1\Rserve\libs\i386
//R CMD Rserve
var fs = require("fs");
var rio = require("rio");
var test = require("rio");

exports.rio = function (req, res) {
    options = {
        host : "127.0.0.1",
        port : 6311,
        callback: function (err, val) {
            if (!err) {
                console.log("RETURN:" + val);
                return res.send({ 'success': true, 'res': val });
            } else {
                console.log("ERROR:Rserve call failed")
                return res.send({ 'success': false });
            }
        },
    }
    rio.enableDebug(true);//开启调试模式
    rio.evaluate("pi / 2 * 2 * 2", options);//运行R代码
};

exports.formProcess = function () {
    return function (req, res) {
        res.render('formProcess', { title: 'process calc', Switch: 'no', layout: 'l2' });
    };
}

exports.test = function (req, res) {
    options = {
        host : "127.0.0.1",
        port : 6311,
        callback: function (err, val) {
            if (!err) {
                console.log("RETURN:" + val);
                //return
                //res.send({ success: true, res: val });//.toString()
                res.write("AAA</br>")
				
            } else {
                console.log("ERROR:Rserve call failed")
                return res.send({ 'success': false });
            }
        },
    }
    var rcmd = "";
    rcmd = "" 
        + "library(rmongodb);" 
        + "mongo<-mongo.create();" 
        //+ "mongo.is.connected(mongo);"	//res:TRUE
		+ "pipe_a <- mongo.bson.from.JSON('{\"$group\":{\"_id\":\"$userID\", \"total\": {\"$sum\":\"$amount\"}}}');" 
		+ "cmd_lista <- list(pipe_a);" 
        //+ "print(class(cmd_lista));";	//res:mongo.bson
		+ "total <- mongo.aggregation(mongo, 'test2.c1', cmd_lista);" 
        //+ "print(class(total));";	//res:mongo.bson
		+ "ltotal <- mongo.bson.value(total, \"result\");" 
        //+ "print(class(ltotal));";	//res:list
		+ "mtotal <- sapply(ltotal, function(x) return( c(x$'_id',x$total)) );" 
        //+ "print(mtotal);";	//res:matrix
		+ "dtotal <- as.data.frame(t(mtotal));" 
		+ "colnames(dtotal) <- c('userID','amount');" 
        //+ "print(class(dtotal));";
		+ "createDummyPlot <- function () { filename <- tempfile('plot', fileext = '.png'); png(filename);  plot(dtotal);  dev.off(); image <- readBin(filename, 'raw', 29999);  unlink(filename);  image;}";
    
    test.enableDebug(true);//开启调试模式
    test.evaluate(rcmd, options);//运行R代码
};

exports.plot = function (req, res) {
	
	//var RscriptFilename = req.body.;
	//var RscriptEntrypnt = "createDummyPlot";
	var RscriptFilename = "/user_amountPlotColor.R";
	var RscriptEntrypnt = "createDummyPlot";
	
    rio.sourceAndEval(__dirname + RscriptFilename, {
        entryPoint: RscriptEntrypnt,
        callback: getPlot
    });
	res.end();
}

var getPlot = function (err, res) {
    if (!err) {
		//var pngFilename = param;
		var pngFilename = "test4.png";
        fs.writeFile(pngFilename, res, { encoding: "binary" }, function (err) {
            if (!err) {
                console.log(pngFilename + " saved in " + __dirname);
            }
        });
    } else {
        console.log("Loading image failed");
    }
}

exports.showpng = function (req, res) {
	//var pngFilename = req.body.filename;
	var pngFilename = "test4.png";
    fs.readFile(pngFilename, res, "binary", function (err, file) {
        if (!err) {
            console.log("load file");
            res.writeHead(200, { "Content-Type": "image/png" });
            res.write(file, "binary");
            res.end();
        }else { }
})
};

exports.showtxt = function (req, res) {
    fs.readFile("test.txt", res, "binary", function (err, file) {
        if (!err) {
            console.log("load file");
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.write(file, "binary");
            res.end();
        }else { }
    })
};