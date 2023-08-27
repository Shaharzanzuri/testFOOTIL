import { fetchDataAndUpdateGraph } from './ajax/statistics.js';

$(document).ready(async function () {
    const data = await fetchDataAndUpdateGraph();

})
