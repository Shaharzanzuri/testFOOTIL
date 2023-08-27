
function fetchDataAndUpdateGraph() {
    return new Promise((resolve, reject) => {
        const url = 'http://localhost:3000/api/reservations';
        const token = JSON.parse(localStorage.getItem('token'));

        $.ajax({
            url,
            method: "GET",
            contentType: 'application/json',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            success: function (data) {
                myChart.data.labels = Object.keys(data);
                myChart.data.datasets[0].data = Object.values(data);
                myChart.update();
                resolve(data);
            },
            error: function (error) {
                console.error("Error fetching data", error);
                reject(error);
            }
        });
    });
}

export { fetchDataAndUpdateGraph };


