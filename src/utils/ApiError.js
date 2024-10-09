// code for production

class ApiError extends Error {                       // class ApiError extents properties from built in JS class Error
    constructor(
        statusCode,                                  
        message = "Something wents wrong",
        errors = [],
        stack = ""
    ){
        super(message)                              // used to override 
        this.statusCode = statusCode
        this.message = message
        this.success = false;    
        this.errors = errors


        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.
                constructor
            )
        }

    }
}

export { ApiError }


// The code defines a custom error class called ApiError that extends (inherits) from the built-in JavaScript Error class. This custom class allows you to throw errors with more specific information, like a statusCode, message, and additional errors

//line no. 4: The constructor is a special method that runs when you create an instance of ApiError. It takes these arguments "statuscode, message, errors, stack"

//line no. 10: super(message): This calls the constructor of the Error class (the parent class). It ensures that the error message is set correctly in the built-in Error class. This is important because we want to use both the features of ApiError and Error.

// this.statusCode = statusCode stores the value of the statusCode parameter as a property on the object so it can be accessed later.

// like 
// const error = new ApiError(404, "Not Found");

// console.log(error.statusCode);  // Output: 404
// console.log(error.message);     // Output: Not Found
