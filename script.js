const salary = document.querySelector("#salary");
const rent = document.querySelector("#rent");
const salaryOut = document.querySelector("#salaryOut");
const rentOut = document.querySelector("#rentOut");
const kyotoGross = document.querySelector("#kyotoGross");
const ibidenGross = document.querySelector("#ibidenGross");
const kyotoDeductions = document.querySelector("#kyotoDeductions");
const ibidenDeductions = document.querySelector("#ibidenDeductions");
const kyotoRent = document.querySelector("#kyotoRent");
const kyotoTake = document.querySelector("#kyotoTake");
const ibidenTake = document.querySelector("#ibidenTake");
const difference = document.querySelector("#difference");
const simDialog = document.querySelector("#simDialog");
const openSimulator = document.querySelector("#openSimulator");

const fmt = n => new Intl.NumberFormat("ja-JP").format(Math.round(n)) + "円";

function updateSimulator() {
  const gross = Number(salary.value);
  const kyotoRentValue = Number(rent.value);

  // 仮の計算式。正式版では最新の給与・税・社宅・通勤制度に差し替える。
  const deductions = Math.round(gross * 0.172);
  const kyotoLiving = 50000;
  const kyotoCommute = 10000;
  const ibidenHousing = 8000;
  const ibidenCommute = 10000;
  const ibidenLiving = 35000;

  const kyoto = gross - deductions - kyotoRentValue - kyotoLiving - kyotoCommute;
  const ibiden = gross - deductions - ibidenHousing - ibidenCommute - ibidenLiving;
  const diff = ibiden - kyoto;

  salaryOut.value = fmt(gross);
  rentOut.value = fmt(kyotoRentValue);
  salaryOut.textContent = fmt(gross);
  rentOut.textContent = fmt(kyotoRentValue);

  kyotoGross.textContent = fmt(gross);
  ibidenGross.textContent = fmt(gross);
  kyotoDeductions.textContent = "-" + fmt(deductions);
  ibidenDeductions.textContent = "-" + fmt(deductions);
  kyotoRent.textContent = "-" + fmt(kyotoRentValue);
  kyotoTake.textContent = fmt(kyoto);
  ibidenTake.textContent = fmt(ibiden);
  difference.textContent = (diff >= 0 ? "+" : "") + fmt(diff).replace("円", "円!");
}

salary.addEventListener("input", updateSimulator);
rent.addEventListener("input", updateSimulator);

openSimulator.addEventListener("click", () => {
  simDialog.showModal();
});

document.querySelector(".dialog-close").addEventListener("click", () => {
  simDialog.close();
});

updateSimulator();
