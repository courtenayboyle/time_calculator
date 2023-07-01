const submitBtn = document.getElementById('submit');

submitBtn.addEventListener('click', async function () {
    event.preventDefault();
    const startHrs = document.getElementById('startHrs').value;
    const startMins = document.getElementById('startMins').value;
    const durationHrs = document.getElementById('durationHrs').value;
    const durationMins = document.getElementById('durationMins').value;
    const amPm = document.getElementById('amPm').value;
    const day = document.getElementById('dayInput').value;
    const alert = document.getElementById('alert');

    const postData = async () => {
        let data = {
            time1: startHrs + ':' + startMins + ' ' + amPm,
            time2: durationHrs + ':' + durationMins,
            day: day
        };
        let response = await fetch("/calc", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        return response.json();
    };
    
    let returnData = await postData();
    console.log("Response = " + returnData);
    alert.innerText = "The time will be " + returnData;
    alert.classList.remove('hide');
});