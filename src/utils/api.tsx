const url = 'https://norma.nomoreparties.space/api/';

const checkResponse = (res: Response) => {
    if (!res.ok) {
        throw new Error('Ответ сети был не ok.');
    }
}

const getOrder = async function(idAllIngredients: string[]) {
    const request = await fetch(`${url}orders`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "ingredients": idAllIngredients
            })
        })
        checkResponse(request)
    return await request.json();
}

const getAllIngredients = async function() {

    let response = await fetch(`${url}ingredients`);
    checkResponse(response);
    return await response.json();
}
const api = {
    getOrder,
    getAllIngredients
}
export default api;
