const asyncHandler = (requestHandler) => {                     // it accepts as function and return a function
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).
        catch((err)=> next(err))
    }
}

export { asyncHandler };


// This code is typically used to wrap asynchronous route handlers in Express.js so you don’t have to write repetitive try/catch blocks for handling errors

// suppose 
// app.get('/data', asyncHandler(async (req, res) => {
//     const data = await getDataFromDB(); // if this fails, the error will be caught
//     res.send(data);
// })); 
// from above example of if getDataFromDB() fails, the error will be automatically passed to error-handling middleware due to the asyncHandler.


// Inside the returned function, Promise.resolve ensures that the requestHandler is wrapped in a promise. If requestHandler succeeds, it will resolve normally.
// If requestHandler throws an error or fails, the catch block will catch the error and pass it to the next function. Passing an error to next(err) is how errors are forwarded to Express.js’s error-handling middleware.