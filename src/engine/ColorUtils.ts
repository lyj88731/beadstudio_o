export function colorDistance(
  a: number,
  b: number
) {

  const ar =
    (a >> 16) & 255;

  const ag =
    (a >> 8) & 255;

  const ab =
    a & 255;



  const br =
    (b >> 16) & 255;

  const bg =
    (b >> 8) & 255;

  const bb =
    b & 255;



  return (
    Math.pow(ar - br, 2) +
    Math.pow(ag - bg, 2) +
    Math.pow(ab - bb, 2)
  );

}