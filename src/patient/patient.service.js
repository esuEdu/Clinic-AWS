
async function getPatients(params) {
    await new Promise(resolve => setTimeout(resolve, 5)); 
    return "Go Serverless v4.0! Your function executed successfully!";
}


export default {
    getPatients,
}