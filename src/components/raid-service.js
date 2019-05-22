export const sendInitInfo = ({size, number}) =>{
    console.log(size, number);
    return fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({size, number})
    })
    .then(value => value.json())
}

export const getMatriXData = () =>{
    return fetch("/")
        .then(value => value.json())
}