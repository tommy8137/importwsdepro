// Mixin like
export const formLabel = `
  // text-transform: uppercase;
  color: #333333;
  opacity: 0.5;
  font-size: 0.9rem;
`;


export const horizontalSeperatateLine = (borderColor, width = '100%') => `
  width: ${width};
  height: 0;
  border: 0;
  border-top: solid 1px ${borderColor};
  margin: auto;
`;

export default {
  formLabel,
  horizontalSeperatateLine
};

