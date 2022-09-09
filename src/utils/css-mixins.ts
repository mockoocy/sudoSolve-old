
export const boxShadowOutline = (size_rem: number, blur:number, color: string) => `
box-shadow: 
  ${size_rem}rem ${size_rem}rem ${blur}rem ${color},
  ${-size_rem}rem ${size_rem}rem ${blur}rem ${color},
  ${size_rem}rem ${-size_rem}rem ${blur}rem ${color},
  ${-size_rem}rem ${-size_rem}rem ${blur}rem ${color}
`