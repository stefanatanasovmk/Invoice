export default function areRowsCalculated(rowsStatus) {
     const stillEditing = rowsStatus.filter(e => e.state === true)
     if (rowsStatus.length === 0 || stillEditing.length > 0) {
          return false
     } else {
          return true
     }
}