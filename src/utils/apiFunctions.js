export const errorHandler = error => {
    console.log(error)
    return Promise.reject(error)
}

export const mapToDropdownSelector = arr => {
    let mappedArray = [{ name: "", value: false }]
    mappedArray = mappedArray.concat(arr.map(el => ({ id: el._id || el.id, name: el.name, value: false })))

    return mappedArray
}

export const findIndexInArray = (arr, elementName) => {
    let elementIndex = arr.findIndex(el => el.name === elementName)

    return elementIndex
}