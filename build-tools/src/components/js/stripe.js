const stripe = Stripe("pk_test_XXXX"); // твой публичный ключ нужно поставить!!!!!
  const elements = stripe.elements();

  const card = elements.create("card");
  card.mount("#card-element");

  const form = document.getElementById("payment-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const {paymentMethod, error} = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });

    if (error) {
      document.getElementById("card-errors").textContent = error.message;
    } else {
      // Отправляем paymentMethod.id на твой backend
      const response = await fetch("/pay", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({payment_method_id: paymentMethod.id}),
      });

      const result = await response.json();
      if (result.success) {
        window.location.href = "/success";
      } else {
        document.getElementById("card-errors").textContent = "Payment error.";
      }
    }
  });