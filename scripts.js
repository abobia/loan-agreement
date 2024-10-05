document.addEventListener("DOMContentLoaded", function () {
  const loanAgreementForm = document.getElementById("loanAgreementForm");
  const submitButton = document.getElementById("submitButton");
  const confirmSubmit = document.getElementById("confirmSubmit");
  const cancelSubmit = document.getElementById("cancelSubmit");
  const confirmationModal = document.getElementById("confirmationModal");

  const loanAmountInput = document.getElementById("loanAmount");
  const durationInput = document.getElementById("duration");
  const processingFeeInput = document.getElementById("processingFee");
  const commencementDateInput = document.getElementById("commencementDate");
  const maturityDateInput = document.getElementById("maturityDate");
  const monthlyInstallmentInput = document.getElementById("monthlyInstallment");
  const oneMonthLoanInstallmentInput = document.getElementById("oneMonthLoanInstallment");

  // Constants
  const PROCESSING_FEE_PERCENTAGE = 0.05;
  const MONTHLY_INTEREST_PERCENTAGE = 0.065;

  // Calculate Processing Fee
  loanAmountInput.addEventListener("input", function () {
    const loanAmount = parseFloat(loanAmountInput.value);
    const processingFee = loanAmount * PROCESSING_FEE_PERCENTAGE;
    processingFeeInput.value = processingFee.toFixed(2);
  });

  // Calculate Commencement Date and Maturity Date
  durationInput.addEventListener("input", function () {
    const duration = parseInt(durationInput.value);
    const currentDate = new Date();
    const commencementDate = new Date(currentDate.setDate(currentDate.getDate() + 22)); // 22 working days later
    commencementDateInput.value = commencementDate.toISOString().split("T")[0]; // Format to YYYY-MM-DD

    const maturityDate = new Date(commencementDate.setMonth(commencementDate.getMonth() + duration));
    maturityDateInput.value = maturityDate.toISOString().split("T")[0]; // Format to YYYY-MM-DD

    calculateInstallments();
  });

  // Calculate Monthly Installment and One Month Loan Installment
  function calculateInstallments() {
    const loanAmount = parseFloat(loanAmountInput.value);
    const duration = parseInt(durationInput.value);

    if (!isNaN(loanAmount) && !isNaN(duration)) {
      const totalInterest = loanAmount * MONTHLY_INTEREST_PERCENTAGE * duration;
      const monthlyInstallment = (loanAmount + totalInterest) / duration;
      const oneMonthLoanInstallment = loanAmount * 0.10 + loanAmount;

      monthlyInstallmentInput.value = monthlyInstallment.toFixed(2);
      oneMonthLoanInstallmentInput.value = oneMonthLoanInstallment.toFixed(2);
    }
  }

  // Handle Submit Button Click
  submitButton.addEventListener("click", function () {
    confirmationModal.style.display = "block";
  });

  // Handle Confirm Submit
  confirmSubmit.addEventListener("click", function () {
    // Submit the form
    loanAgreementForm.submit();
  });

  // Handle Cancel Submit
  cancelSubmit.addEventListener("click", function () {
    confirmationModal.style.display = "none";
  });

  // Hide the confirmation modal when clicking outside of it
  window.onclick = function (event) {
    if (event.target === confirmationModal) {
      confirmationModal.style.display = "none";
    }
  };
});
