import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SolarSearch = () => {
    let {searchTerm} = useParams();
    const [data,setdata] = useState([])
    useEffect(()=>{
        async function fetchdata()
        {
            try {
                console.log("yes entrn")
                console.log("passing searechterm ",searchTerm)
                let response = await fetch(`http://192.168.1.54:4000/search?q=${encodeURIComponent(searchTerm)}`)
                response = await response.json()
                console.log(response)
                setdata(response)
                
              } catch (error) {
                console.error('Error performing Solr search:', error);
              }
        }
        fetchdata();
    },[setdata,searchTerm])
  return (
    <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>CD_ID</th>
              <th>PD_ID</th>
              <th>PD_NAME</th>
              <th>CD</th>
              <th>BRAND</th>
              <th>MRP</th>
              <th>DISCOUNT</th>
              <th>STOCK</th>
            </tr>
          </thead>
          <tbody>
            {data.map((category) => (
              <tr key={category.id}>
                <td>{category.CD_ID}</td>
                <td>{category.PD_ID}</td>
                <td>{category.PD_NAME}</td>
                <td>{category.CD}</td>
                <td>{category.BRAND}</td>
                <td>{category.MRP}</td>
                <td>{category.DISCOUNT}</td>
                <td>{category.STOCK}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )
}
export default SolarSearch