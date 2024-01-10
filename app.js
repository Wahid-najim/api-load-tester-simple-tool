const makeRequest = async () => {
  try {
    const requestUrl = document.getElementById("testingURl").value;
    const requestNumber = parseInt(
      document.getElementById("requestNumber").value
    );
    const delay =
      parseInt(document.getElementById("delayTime").value) * 1000 || 1000;
    document.getElementById("testButton").classList.add("hidden");
    console.log("Making request", requestUrl, requestNumber);

    for (let i = 0; i < requestNumber; i++) {
      const startTime = new Date().toLocaleTimeString();
      const requests = Array.from(
        { length: 5 },
        async (_) => await fetch(`${requestUrl}`)
      );

      const results = await Promise.all(requests);
      results.forEach((data, index) => {
        console.log(`Data from request ${index + 1}:`, data);
        document.getElementById("tableBody").insertRow(0).innerHTML = `
        <td>${i + 1}</td>
        <td>${startTime}</td>
        <td class="${
          data.status === 200 ? "success" : i === 429 ? "warning" : "error"
        }">${data?.status}</td>
        <td>${new Date().toLocaleTimeString()}</td>
    `;
      });

      if ((i + 1) % 5 === 0 && i !== requestNumber - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  } catch (error) {
    console.log(error);
    alert("Error making request");
    document.getElementById("testButton").classList.remove("hidden");
  }
};
