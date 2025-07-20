document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("verifyForm");
  const uploadInput = document.getElementById("uploadInput");
  const nextBtn = document.getElementById("nextBtn");
  const stepLabel = document.getElementById("step-label");
  const successBox = document.getElementById("successMessage");

  let currentStep = 1;
  let uploadedFiles = [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!uploadInput.files.length) {
      alert("يرجى رفع صورة قبل المتابعة.");
      return;
    }

    const file = uploadInput.files[0];
    uploadedFiles.push(file);

    if (currentStep === 1) {
      // الانتقال للخطوة 2
      currentStep = 2;
      uploadInput.value = "";
      stepLabel.textContent = "الخطوة 2: رفع صورة لك وبجانبك بطاقة الهوية";
    } else {
      // إرسال الملفات (محاكاة)
      console.log("تم رفع:", uploadedFiles);
      form.classList.add("hidden");
      successBox.classList.remove("hidden");
    }
  });
});
