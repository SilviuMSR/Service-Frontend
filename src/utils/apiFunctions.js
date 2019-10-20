export const errorHandler = error => {
    console.log(error)
    return Promise.reject(error)
}