export const errorHandler = error => {
    console.log(error)
    return Promise.reject(error)
}

export const mapToDropdownSelector = arr => {
    let mappedArray = [{ name: "", value: false }]
    mappedArray = mappedArray.concat(arr.map(el => ({ id: el._id || el.id, name: el.name, value: false })))

    return mappedArray
}

export const mapToRadioSelector = arr => {
    let mappedArray = []
    mappedArray = mappedArray.concat(arr.map(el => ({ id: el._id || el.id, label: el.name, value: false, price: el.price ? el.price : null })))

    return mappedArray
}

export const mapToMultipleSelector = arr => {
    let mappedArray = []
    mappedArray = mappedArray.concat(arr.map(el => ({ id: el._id || el.id, name: el.name, label: el.name, value: false, price: el.price ? el.price : null })))

    return mappedArray
}

export const findIdInArray = (arr, elementToFind) => {
    // Map array to have always name, in order to be easy to filter later
    let mappedArray = arr.map(el => {
        if (el.name) return ({ ...el })
        if (el.label) return ({ ...el, name: el.label })
    })
    let filterArray = mappedArray.filter(el => el.label === elementToFind)
    if (filterArray.length) {
        return filterArray[0]._id ? filterArray[0]._id : filterArray[0].id
    }

    return null
}

export const findElementByIdInArray = (arr, id) => {
    let filterArray = arr.filter(el => el.id ? el.id === id : el._id === id)

    return filterArray
}

export const findElementByNameInArray = (arr, name) => {
    let mappedArray = arr.map(el => {
        if (el.name) return ({ ...el })
        if (el.label) return ({ ...el, name: el.label })
    })
    let filterArray = mappedArray.filter(el => el.name.toLowerCase() === name.toLowerCase())

    return filterArray
}

export const findIndexInArray = (arr, elementName) => {
    let elementIndex = arr.findIndex(el => el.name === elementName)

    return elementIndex
}