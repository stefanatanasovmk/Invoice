export default function calculateTotal(invoice) {
     const totalVAT = invoice.map(e => e.total.totalVAT).reduce((pre, cur) => parseInt(pre) + parseInt(cur), 0)
     const totalWithoutVAT = invoice.map(e => e.total.totalWithoutVAT).reduce((pre, cur) => parseInt(pre) + parseInt(cur), 0)
     const totalUnpayed = invoice.filter(e => !e.payed).map(e => e.total.total).reduce((pre, cur) => parseInt(pre) + parseInt(cur), 0)
     const totalPayed = invoice.filter(e => e.payed === true).map(e => e.total.total).reduce((pre, cur) => parseInt(pre) + parseInt(cur), 0)
     const unpayed = invoice.filter(e => !e.payed).length
     return { totalVAT, totalUnpayed, unpayed, totalPayed, totalWithoutVAT }
}