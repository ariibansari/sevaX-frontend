export const thousandSeperator = (str) => {
    let value = parseInt(str)
    if(value < 0){
        return `-₹${(value * -1).toLocaleString('en-US')}`
    }else{
        return `₹${value.toLocaleString('en-US')}`
    }
}