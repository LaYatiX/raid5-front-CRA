export const sendInitInfo = ({size, number}) =>{
    return fetch('/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            credentials: 'include'
        },
        body: JSON.stringify({size, number})
    })
    .then(value => {
       if(value.status=== 200) return value.json();
       else return Promise.reject(value.status)
    })
    .catch(reason => Promise.reject(reason))
};

export const getMatrixData = () =>{
    // window.open("/api/save");
    return fetch(`/save`, {
        credentials: "include"
    })
};

export const getRegenerateMatrixs = (id) =>{
    return fetch(`/destroy?id=${id}`, {
        credentials: "include"
    })
    .then(value => {
        if(value.status=== 200) return value.json();
        else return Promise.reject(value.status);
    })
};