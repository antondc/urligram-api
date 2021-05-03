export const getExtension = (fileName: string): string => {
  return fileName.split('.').pop();
};
