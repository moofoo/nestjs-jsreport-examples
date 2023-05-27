function addClassIfRowEven(index) {
  return (index + 1) % 2 === 0 ? 'row-even' : '';
}

function printSUMFormulaRange(cell, offset, total) {
  return `=SUM(${cell}${offset}:${cell}${total + offset - 1})`;
}
