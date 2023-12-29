export const getElementValueById = (id: string) => {
  const el = document.getElementById(id) as HTMLInputElement;

  return el ? el.value : null;
};

export const getElementById = (id: string) => {
  return document.getElementById(id);
};

export const getElementsByClass = (
  id: string,
  contx: Document | HTMLElement = document
) => {
  return contx.getElementsByClassName(id);
};
