export const sendInitInfo = ({size, number}) =>{
    return fetch('/api/generate', {
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

export const getMatriXData = () =>{
    return fetch("/")
        .then(value => value.json())
};

export const getMatrixErrors = (id) =>{
    return fetch(`/api/destroy?id=${id}`, {
        credentials: "include"
    })
    .then(value => {
        if(value.status=== 200) return value.json();
        else return Promise.reject(value.status);
    })
};