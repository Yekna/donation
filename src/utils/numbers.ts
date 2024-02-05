export const addSpaceBetweenNumber = (num: number) => {
    return (num * 250000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }