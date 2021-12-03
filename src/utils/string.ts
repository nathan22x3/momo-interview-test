export const ellipsisText = (text: string, limit: number = 20) => {
  return text?.length > limit ? text.substring(0, limit - 3) + '...' : text;
};
