const {constant}  = require("../constant");

const errorHandler = (err, req, res, next) =>{
const statusCode = res.statusCode ?  res.statusCode : 500;

switch (statusCode) {
    case constant.VALIDATION_ERROR:
        res.json({title:"validation faild" ,message: err.message, stackTrace: err.stack});
        break;

        case constant.NOT_FOUND:
        res.json({title:" not Found" ,message: err.message, stackTrace: err.stack});
        case constant.UNAUTHORIZED:
            res.json({title:" not Found" ,message: err.message, stackTrace: err.stack});
            case constant.FORBIDDEN:
                res.json({title:" not Found" ,message: err.message, stackTrace: err.stack});
                case constant.SERVER_ERROE:
                    res.json({title:" not Found" ,message: err.message, stackTrace: err.stack});
    default:
        console.log("No Error, All Good")
        break;
}


}


module.exports=errorHandler;