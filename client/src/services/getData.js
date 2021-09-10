async function getData(url = '', token = false) {

    let headers = {
        'Content-Type': 'application/json',
    }

    if (!!token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(url, {
      method: 'GET', 
      headers: headers
    });
    return await response.json(); 
  }

export default getData
