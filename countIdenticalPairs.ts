const factorial = (number: number): number => {
  let result = 1;
  for (let i = 1; i <= number; i++) {
    result *= i;
  }
  return result;
};

const combination = (k: number, n: number): number => {
  return factorial(n) / (factorial(k) * factorial(n - k));
};

const countIdenticalPairs_NguyenTrungNam = (nums: number[]): number => {
  if (!Array.isArray(nums)) return 0;

  const map = nums.reduce((acc, val) => {
    if (!acc[val]) acc[val] = 0;
    acc[val]++;
    return acc;
  }, {} as { [key: number]: number });

  return Object.values(map).reduce((acc, val) => {
    if (val === 1) return acc;
    return acc + combination(2, val);
  }, 0);
};
