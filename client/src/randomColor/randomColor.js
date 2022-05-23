let RGBnumbers = function () {
     let res = `${Math.floor(Math.random() * (255 - 120)) + 120
          }`
     return res
}
export default function randomColor() {
     return `rgb(${RGBnumbers()},${RGBnumbers()},${RGBnumbers()})`
}