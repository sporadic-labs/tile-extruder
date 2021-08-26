export default function measureElementContentBox(element: HTMLElement) {
  const widthWithPadding = element.clientWidth;
  const heightWithPadding = element.clientHeight;
  const { paddingLeft, paddingRight, paddingTop, paddingBottom } = window.getComputedStyle(element);
  const width = widthWithPadding - parseFloat(paddingLeft) - parseFloat(paddingRight);
  const height = heightWithPadding - parseFloat(paddingTop) - parseFloat(paddingBottom);
  return {
    width,
    height,
  };
}
