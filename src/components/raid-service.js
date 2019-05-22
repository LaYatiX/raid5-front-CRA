export const sendInitInfo = ({size, number}) =>{
    console.log(size, number);
    return fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({size, number})
    })
    // .then(value => value.json())
    .then(value => {
        console.log(value);
    })
}

export const getMatriXData = () =>{
    return fetch("https://jsonplaceholder.typicode.com/todos")
        .then(value => value.json())
}