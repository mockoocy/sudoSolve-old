export const boxShadowOutline = (
  size_rem: number,
  blur: number,
  color: string
) => `
box-shadow: 
  ${size_rem}rem ${size_rem}rem ${blur}rem ${color},
  ${-size_rem}rem ${size_rem}rem ${blur}rem ${color},
  ${size_rem}rem ${-size_rem}rem ${blur}rem ${color},
  ${-size_rem}rem ${-size_rem}rem ${blur}rem ${color}
`;
export const textShadowOutline = (
  size_rem: number,
  blur: number,
  color: string
) => `
text-shadow: 
  ${size_rem}rem ${size_rem}rem ${blur}rem ${color},
  ${-size_rem}rem ${size_rem}rem ${blur}rem ${color},
  ${size_rem}rem ${-size_rem}rem ${blur}rem ${color},
  ${-size_rem}rem ${-size_rem}rem ${blur}rem ${color}
`;
