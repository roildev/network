async function deleteData(url = '', data, token) {

    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    const response = await fetch(url, {
        method: 'DELETE', 
        body: JSON.stringify(data),
        headers: headers
    });
    return await response.ok; 
}

export default deleteData
