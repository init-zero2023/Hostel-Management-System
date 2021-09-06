window.onload =  ()=>{
    // console.log()
    const studentIDdiv = document.querySelector('#ids')
    
    const roomDiv = document.querySelector('#rooms')
    console.log(studentIDdiv, roomDiv)
    let query = `/fetchQuery?sqlQuery=select distinct(id) from students`
    fetch(query)
        .then(response => response.json())
        .then(data => {
            for(const index in data){
                const child = document.createElement('option')
                child.innerText = data[index].id
                studentIDdiv.appendChild(child)
            }
        })

    query = `/fetchQuery?sqlQuery=select distinct(room_no) from rooms`
    fetch(query)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            for(const index in data){
                const child = document.createElement('option')
                child.innerText = data[index].room_no
                roomDiv.appendChild(child)
            }
        })
}


