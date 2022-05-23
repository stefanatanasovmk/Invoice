import { useState } from "react";

export default function useInputControl(initialValue) {
     const [value, setItem] = useState(initialValue)
     const handleChange = (e) => {
          setItem(e.target.value)
     }
     return [value, handleChange]
}