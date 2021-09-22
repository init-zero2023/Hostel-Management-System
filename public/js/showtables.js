window.onload =  ()=>{
    // console.log()
    const studenttable = document.querySelector('#studenttable')
    const hosteltable = document.querySelector('#hosteltable')
    const roomstable = document.querySelector('#roomstable')


    let query = `/fetchQuery?sqlQuery=select * from students `
    fetch(query)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            for(const index in data){
                studenttable.innerHTML+=`<tr>
                    <td>${data[index].id}</th>
                    <td>${data[index].name}</td>
                    <td>${data[index].address}</td>
                    <td>${data[index].contact}</td>
                </tr>`
            }
        })
    
    query = `/fetchQuery?sqlQuery=select * from hostel`
    fetch(query)
        .then(response => response.json())
        .then(data => {
                console.log(data)
                for(const index in data){
                hosteltable.innerHTML+=`<tr>
                    <td>${data[index].id}</th>
                    <td>${data[index].room_no}</td>
                    <td>${data[index].in_date.substr(0,10)}</td>
                </tr>`
            }
        })

    query = `/fetchQuery?sqlQuery=select * from rooms`
    fetch(query)
        .then(response => response.json())
        .then(data => {
                console.log(data)
                for(const index in data){
                roomstable.innerHTML+=`<tr>
                    <td>${data[index].room_no}</th>
                    <td>${data[index].max_capacity}</td>
                    <td>${data[index].current_status}</td>
                </tr>`
            }
        })

    
}


