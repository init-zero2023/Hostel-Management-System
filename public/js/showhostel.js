window.onload =  ()=>{
    // console.log()
    const studenthosteltable = document.querySelector('#studenthostel')
    
    let query = `/fetchQuery?sqlQuery=select students.id, students.name, students.address, students.contact, hostel.room_no from students, hostel where students.id = hostel.id`
    fetch(query)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            for(const index in data){
                studenthosteltable.innerHTML+=`<tr>
                    <td>${data[index].id}</th>
                    <td>${data[index].name}</td>
                    <td>${data[index].address}</td>
                    <td>${data[index].contact}</td>
                    <td>${data[index].room_no}</td>
                </tr>`
            }
        })    
}
