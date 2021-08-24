async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST', 
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await response.json(); 
  }

export default postData
