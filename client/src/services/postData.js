async function postData(url = '', data = {}, token = false) {

    let headers = {
        'Content-Type': 'application/json',
    }

    if (!!token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(url, {
      method: 'POST', 
      body: JSON.stringify(data),
      headers: headers
    });
    return await response.json(); 
  }

export default postData
