// 숫자를 한글로 포맷팅 해주는 함수
export const formatNumberToKorean = (value: number): string => {
  if (value === 0) return '0원';

  const unitWords = ['', '만', '억', '조', '경'];
  const splitUnit = 10000;
  const splitCount = unitWords.length;

  const resultArray: string[] = [];
  let resultString = '';

  // 단위별로 나눠서 배열에 저장
  for (let i = 0; i < splitCount; i += 1) {
    let unitResult = (value % splitUnit ** (i + 1)) / splitUnit ** i;
    unitResult = Math.floor(unitResult);

    if (unitResult > 0) {
      resultArray[i] = unitResult.toString();
    }
  }

  // 배열을 순회하며 각 단위별로 변환
  for (let i = 0; i < resultArray.length; i += 1) {
    const unitValue = resultArray[i];

    if (unitValue) {
      // 현재 청크를 변환
      const currentNum = parseInt(unitValue, 10);
      const innerUnits = ['', '십', '백', '천'];
      let innerResult = '';

      const strNum = currentNum.toString();
      for (let j = 0; j < strNum.length; j += 1) {
        const digit = strNum[j] as string; // 현재 청크의 각 자리수를 가져옴
        const revIdx = strNum.length - 1 - j;

        if (digit !== '0') {
          innerResult += `${digit}${innerUnits[revIdx]} `;
        }
      }

      resultString = `${innerResult.trim()}${unitWords[i]} ${resultString}`;
    }
  }

  return `${resultString.trim()} 원`;
};
