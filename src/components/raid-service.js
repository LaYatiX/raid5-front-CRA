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

export const sendFile = (file) =>{
    console.log(file)
    var data = new FormData();
    data.append('file', file)
    return fetch('/load', {
        method: 'POST',
        headers: {
            credentials: 'include'
        },
        body: data
    })
    .then(value => {
        if(value.status=== 200) return value.json();
        else return Promise.reject("Wysłana macierz jest niespójna");
    })
    .catch(reason => Promise.reject(reason))
};

export const getMatrixData = () =>{
    // window.open("/api/save");
    return fetch(`/save`, {
        credentials: "include"
    })
};

export const destroyMatrix = (id) =>{
    return fetch(`/destroy?id=${id}`, {
        credentials: "include"
    })
    .then(value => {
        if(value.status=== 200) return Promise.resolve("ok");
        else return Promise.reject("Błąd usuwania");
    })
};

export const recoverMatrix = () =>{
    return fetch(`/recover`, {
        credentials: "include"
    })
        .then(value => {
            if(value.status=== 200) return value.json();
            else return Promise.reject(value.status);
        })
};